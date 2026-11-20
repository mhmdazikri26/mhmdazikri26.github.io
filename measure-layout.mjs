import puppeteer from 'puppeteer-core';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();

const measure = async (url, viewportW) => {
  await page.setViewport({ width: viewportW, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle0' });
  return page.evaluate(() => {
    const box = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { top: Math.round(r.top + scrollY), bottom: Math.round(r.bottom + scrollY), h: Math.round(r.height) };
    };
    const secs = [...document.querySelectorAll('main > section')].map((s) => {
      const r = s.getBoundingClientRect();
      return {
        id: s.id || s.getAttribute('aria-labelledby') || '(hero)',
        top: Math.round(r.top + scrollY),
        bottom: Math.round(r.bottom + scrollY),
        h: Math.round(r.height),
      };
    });
    const gaps = [];
    for (let i = 0; i < secs.length - 1; i++) gaps.push(secs[i + 1].top - secs[i].bottom);
    return {
      vh: innerHeight,
      h1: box('h1'),
      cta: box('.hero .btn, .page-head .btn'),
      lastContent: box('main > section:last-of-type'),
      secs,
      gaps,
      deadBandInsideHero: (() => {
        const hero = document.querySelector('main > section');
        const hr = hero.getBoundingClientRect();
        const next = hero.nextElementSibling;
        return next ? Math.round(next.getBoundingClientRect().top - hr.bottom) : null;
      })(),
    };
  });
};

for (const [label, url, w] of [
  ['index 1440', 'http://127.0.0.1:8811/index.html', 1440],
  ['index 1280', 'http://127.0.0.1:8811/index.html', 1280],
  ['catatan 1440', 'http://127.0.0.1:8811/catatan.html', 1440],
  ['catatan 375', 'http://127.0.0.1:8811/catatan.html', 375],
]) {
  const m = await measure(url, w);
  console.log(`\n=== ${label} (vh ${m.vh}) ===`);
  console.log('h1      :', JSON.stringify(m.h1));
  console.log('CTA     :', JSON.stringify(m.cta));
  console.log('hero->next gap:', m.deadBandInsideHero, 'px');
  console.log('section gaps  :', m.gaps.join(', '));
  console.log('sections      :', m.secs.map((s) => `${s.id.replace('title', '')}:${s.h}px`).join(' | '));
}
await browser.close();
