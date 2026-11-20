// Render preview.png (1200x630) dari hero halaman asli, bukan gambar buatan.
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = process.argv[2] || 'http://127.0.0.1:8811/';

const b = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--font-render-hinting=none'],
});

const fails = [];
const check = (ok, label, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? ' — ' + detail : ''}`);
  if (!ok) fails.push(label);
};

for (const [page, out] of [['index.html', 'preview.png']]) {
  const p = await b.newPage();
  // deviceScaleFactor 1: meta og:image menyatakan 1200x630, jadi berkasnya harus 1200x630 persis
  await p.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await p.goto(BASE + page, { waitUntil: 'networkidle0' });
  await p.evaluate(() => document.fonts.ready);

  const box = await p.evaluate(() => {
    const h = document.querySelector('header');
    const hero = document.querySelector('.hero') || document.querySelector('h1');
    const r = (hero || h).getBoundingClientRect();
    return {
      h1: document.querySelector('h1')?.textContent.trim(),
      heroTop: Math.round(r.top + window.scrollY),
      docH: document.documentElement.scrollHeight,
      fonts: [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family),
    };
  });
  console.log(`\n[${page}] h1="${box.h1}" docH=${box.docH}`);

  // pastikan font benar-benar ter-load sebelum capture, kalau tidak preview jadi fallback
  const families = [...new Set(box.fonts.map((f) => f.split(',')[0].replace(/['"]/g, '')))];
  check(families.includes('Literata'), 'Literata termuat', families.join(', '));

  await p.screenshot({ path: out, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  console.log(`  -> ${out}`);

  // dimensi berkas harus persis sama dengan yang dideklarasikan di meta og:image
  const png = fs.readFileSync(out);
  const w = png.readUInt32BE(16);
  const h = png.readUInt32BE(20);
  check(w === 1200 && h === 630, 'PNG 1200x630 persis', `${w}x${h}`);

  // verifikasi dimensi hasil
  const dim = await p.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }));
  check(dim.overflow <= 0, 'tidak ada overflow di 1200px', `overflow=${dim.overflow}`);
  await p.close();
}

await b.close();
console.log(`\n${fails.length === 0 ? 'SEMUA PASS' : 'GAGAL: ' + fails.join(', ')}`);
process.exit(fails.length === 0 ? 0 : 1);
