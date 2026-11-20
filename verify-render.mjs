#!/usr/bin/env node
/* Verifikasi render: 9 lebar x 2 halaman, overflow + font + console + tangkapan layar.
 * Butuh: puppeteer-core (devDependency) dan server lokal.
 * Pakai: node verify-render.mjs [baseUrl]
 */
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = process.argv[2] || 'http://127.0.0.1:8811/';
const WIDTHS = [320, 375, 414, 768, 860, 1024, 1280, 1440, 1920];
const PAGES = ['index.html', 'catatan.html', '404.html'];
const SHOTS = process.env.SHOT_DIR || '.shots';

fs.mkdirSync(SHOTS, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--hide-scrollbars'],
});

const out = { pages: {}, consoleErrors: [] };

for (const name of PAGES) {
  const page = await browser.newPage();
  page.on('console', (m) => m.type() === 'error' && out.consoleErrors.push(`${name}: ${m.text()}`));
  page.on('pageerror', (e) => out.consoleErrors.push(`${name}: ${e.message}`));
  page.on('response', (r) => r.status() >= 400 && out.consoleErrors.push(`${name}: ${r.status()} ${r.url()}`));

  const rows = {};
  for (const w of WIDTHS) {
    await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
    await page.goto(BASE + name, { waitUntil: 'networkidle0' });
    rows[w] = await page.evaluate(() => {
      const de = document.documentElement;
      // the widest offender, not just the scrollWidth symptom
      let worst = null;
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect();
        if (!r.width) continue;
        const over = Math.round(Math.max(r.right - de.clientWidth, -r.left));
        if (over > 1 && (!worst || over > worst.over)) {
          worst = { over, tag: el.tagName, cls: String(el.className).slice(0, 40) };
        }
      }
      return {
        overflow: de.scrollWidth - de.clientWidth,
        worst,
        height: de.scrollHeight,
        fonts: [...new Set([...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family))],
      };
    });
  }

  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(BASE + name, { waitUntil: 'networkidle0' });
  const stem = `${SHOTS}/final-${name.replace('.html', '')}`;
  await page.screenshot({ path: `${stem}-fold.png` });
  await page.screenshot({ path: `${stem}-full.png`, fullPage: true });

  out.pages[name] = rows;
  await page.close();
}

await browser.close();

const bad = Object.entries(out.pages).flatMap(([pg, rows]) =>
  Object.entries(rows)
    // scrollWidth alone is blind: an ancestor with overflow-x:clip keeps it at the viewport
    // width while content is actually cut off. Gate on the widest offending box instead.
    .filter(([, r]) => r.overflow !== 0 || r.worst)
    .map(([w, r]) => `${pg}@${w}: ${r.worst ? `${r.worst.over}px ${r.worst.tag}.${r.worst.cls}` : `scrollWidth +${r.overflow}`}`));
console.log(JSON.stringify(out, null, 1));
console.log(`\noverflow: ${bad.length ? bad.join('; ') : 'none at any width'}`);
console.log(`console : ${out.consoleErrors.length ? out.consoleErrors.join('; ') : 'clean'}`);
process.exit(bad.length || out.consoleErrors.length ? 1 : 0);
