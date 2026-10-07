import { mkdir, writeFile, cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { locales } from '../locales.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const out = root + 'docs';
const base = 'https://mcyj.github.io/travel-assistant-web/';
const email = 'june1012june@gmail.com';
const esc = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const icons = [
'<path d="M3 21V7h18v14M3 14h18M7 10h3m4 0h3M6 21v-3m12 3v-3"/>',
'<path d="m3 12 7 2 5 7 2-1-2-7 6-6c2-2-1-4-3-2l-6 6-7-2-2 3Z"/>',
'<path d="M4 5h16v5a2 2 0 0 0 0 4v5H4v-5a2 2 0 0 0 0-4V5Zm11 0v3m0 3v2m0 3v3"/>',
'<rect x="6" y="3" width="12" height="18" rx="2"/><path d="M9 7h6m-6 4h6m-5 6h4"/>',
'<path d="M5 18H3v-7l3-6h12l3 6v7h-2M3 12h18M7 15h1m8 0h1M5 18h14M5 18v3m14-3v3"/>',
'<path d="M4 7h16l1 14H3L4 7Zm4 0V5a4 4 0 0 1 8 0v2"/>'
];
function head(lang,t,page,prefix) {
 const url = base + lang + '/' + (page==='privacy'?'privacy.html':'');
 const title = `Travel Assistant — ${page==='privacy'?t.privacy:t.overview+' · '+t.partners}`;
 return `<!doctype html><html lang="${lang}" dir="${lang==='ar'?'rtl':'ltr'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(title)}</title><meta name="description" content="${esc(page==='privacy'?t.privacyIntro:t.intro)}"><link rel="canonical" href="${url}">${Object.keys(locales).map(l=>`<link rel="alternate" hreflang="${l}" href="${base}${l}/${page==='privacy'?'privacy.html':''}">`).join('')}<link rel="alternate" hreflang="x-default" href="${base}en/${page==='privacy'?'privacy.html':''}"><meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(t.intro)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${base}assets/icon.png"><meta name="twitter:card" content="summary"><link rel="icon" href="${prefix}assets/icon.png"><link rel="stylesheet" href="${prefix}assets/style.css"><script src="${prefix}assets/site.js" defer></script><script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'SoftwareApplication',name:'Travel Assistant',applicationCategory:'TravelApplication',operatingSystem:'Chrome',softwareVersion:'0.4.2',url:base,description:t.intro,publisher:{'@type':'Organization',name:'RushLabs',email}}).replaceAll('<','\\u003c')}</script></head><body>`;
}
function languageLinks(lang,page,prefix) {
 return `<div class="translation-links">${Object.entries(locales).map(([l,t])=>`<a href="${prefix}${l}/${page==='privacy'?'privacy.html':''}" lang="${l}" hreflang="${l}"${l===lang?' aria-current="page"':''}>${esc(t.name)}</a>`).join('')}</div>`;
}
function header(lang,t,page,prefix) {
 const home=prefix+lang+'/';
 return `<a class="skip" href="#main">${esc(t.skip)}</a><header><div class="wrap header-inner"><a class="brand" href="${home}"><img src="${prefix}assets/icon.png" width="34" height="34" alt=""><span dir="ltr">Travel Assistant<small>RUSHLABS</small></span></a><nav aria-label="${esc(t.overview)}"><a href="${home}#product">${esc(t.overview)}</a><a href="${home}#partners">${esc(t.partners)}</a><a href="${home}privacy.html">${esc(t.privacy)}</a></nav><label class="language" for="language"><span class="language-label">${esc(t.language)}</span><select id="language" aria-label="${esc(t.language)}">${Object.entries(locales).map(([l,copy])=>`<option lang="${l}" value="${l}" data-url="${prefix}${l}/${page==='privacy'?'privacy.html':''}"${l===lang?' selected':''}>${esc(copy.name)}</option>`).join('')}</select></label></div></header>`;
}
function footer(lang,t,page,prefix){return `<footer><div class="wrap"><div class="footer-top"><span>© 2026 RushLabs · Travel Assistant</span><div class="footer-links"><a href="${prefix}${lang}/privacy.html">${esc(t.privacy)}</a><a href="mailto:${email}" dir="ltr">${email}</a></div></div><p class="footer-copy">${esc(t.footer)}</p>${languageLinks(lang,page,prefix)}</div></footer></body></html>`;}
function homepage(lang,t,prefix) {
 const mail=`mailto:${email}?subject=${encodeURIComponent('Travel Assistant — affiliate partnership review')}`;
 return head(lang,t,'index',prefix)+header(lang,t,'index',prefix)+`<main id="main" class="wrap"><section class="hero"><div><p class="eyebrow" dir="ltr">${esc(t.eyebrow)}</p><h1>${esc(t.headline)}</h1><p class="intro">${esc(t.intro)}</p><div class="actions"><a class="button primary" href="${mail}">${esc(t.review)} <span aria-hidden="true">↗</span></a><a class="button" href="#product">${esc(t.explore)} <span aria-hidden="true">↓</span></a></div><div class="status"><i aria-hidden="true"></i><div><strong>${esc(t.status)}</strong><span>${esc(t.statusBody)}</span></div></div></div><div class="visual"><div class="visual-top"><b dir="ltr">TRAVEL ASSISTANT</b><span dir="ltr">${esc(t.overview)}</span></div><img src="${prefix}assets/popup.jpg" width="440" height="600" alt="${esc(t.screenCaption)}" fetchpriority="high"></div></section><div class="stats"><div class="stat"><b>62</b><span>${esc(t.recognized)}</span></div><div class="stat"><b>3</b><span>${esc(t.suggestions)}</span></div><div class="stat"><b>12</b><span>${esc(t.languages)}</span></div></div><section class="section" id="product"><div class="section-head"><div><span class="section-number">01 / ${esc(t.overview)}</span><h2>${esc(t.howTitle)}</h2></div></div><div class="steps">${t.steps.map(([a,b],i)=>`<article class="step"><b>0${i+1}</b><h3>${esc(a)}</h3><p>${esc(b)}</p></article>`).join('')}</div><div class="product-note"><h3>${esc(t.screenTitle)}</h3><p class="caption">${esc(t.screenCaption)}</p></div></section><section class="section"><div class="section-head"><div><span class="section-number">02 / Travel Assistant</span><h2>${esc(t.coverageTitle)}</h2></div><p>${esc(t.coverageBody)}</p></div><div class="category-list">${t.categories.map((c,i)=>`<div class="category"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[i]}</svg><span>${esc(c)}</span></div>`).join('')}</div></section><section class="section" id="partners"><div class="partner-section"><div class="section-head"><div><span class="section-number">03 / ${esc(t.partners)}</span><h2>${esc(t.partnerTitle)}</h2></div><p>${esc(t.partnerBody)}</p></div><div class="principles">${t.principles.map(([a,b])=>`<article class="principle"><span class="check" aria-hidden="true">✓</span><div><h3>${esc(a)}</h3><p>${esc(b)}</p></div></article>`).join('')}</div><aside class="ready"><h3>${esc(t.readyTitle)}</h3><p>${esc(t.readyBody)}</p></aside></div></section><section class="contact" id="contact"><div><span class="section-number">04 / RushLabs</span><h2>${esc(t.contactTitle)}</h2><p>${esc(t.contactBody)}</p></div><div class="contact-card"><small>${esc(t.emailLabel)}</small><a class="email" href="${mail}" dir="ltr">${email}</a><div class="contact-meta" dir="ltr">RushLabs · ${esc(t.country)}<br>${esc(t.business)}: 662-28-01965</div><button class="button print-button" type="button" data-print>${esc(t.print)} <span aria-hidden="true">↗</span></button></div></section></main>`+footer(lang,t,'index',prefix);
}
function privacy(lang,t,prefix) {
 return head(lang,t,'privacy',prefix)+header(lang,t,'privacy',prefix)+`<main id="main" class="wrap privacy-main"><a class="button" href="${prefix}${lang}/">← ${esc(t.back)}</a><p class="eyebrow" style="margin-top:30px" dir="ltr">RUSHLABS · TRAVEL ASSISTANT</p><h1>${esc(t.privacy)}</h1><p class="privacy-intro">${esc(t.privacyIntro)}</p><p class="caption">${esc(t.updated)}</p>${t.privacySections.map(([a,b])=>`<section><h2>${esc(a)}</h2><p>${esc(b)}</p></section>`).join('')}<div class="full-policy"><a class="button" href="https://travel-assistant-links.june1012june.workers.dev/privacy${lang==='ko'?'':'#english'}">Travel Assistant · ${esc(t.fullPolicy)} ↗</a></div><section><h2>RushLabs</h2><p dir="ltr"><a href="mailto:${email}">${email}</a><br>${esc(t.country)} · ${esc(t.business)}: 662-28-01965</p></section></main>`+footer(lang,t,'privacy',prefix);
}
await rm(out,{recursive:true,force:true});
await mkdir(out,{recursive:true});
await cp(root+'assets',out+'/assets',{recursive:true});
for(const [lang,t] of Object.entries(locales)) {
 await mkdir(out+'/'+lang,{recursive:true});
 await writeFile(`${out}/${lang}/index.html`,homepage(lang,t,'../'));
 await writeFile(`${out}/${lang}/privacy.html`,privacy(lang,t,'../'));
}
await writeFile(out+'/index.html',homepage('en',locales.en,''));
await writeFile(out+'/404.html',head('en',locales.en,'index',base)+header('en',locales.en,'index',base)+`<main class="wrap privacy-main" id="main"><h1>404</h1><p>This page could not be found.</p><div class="actions"><a class="button primary" href="${base}en/">Back to Travel Assistant</a></div></main>`+footer('en',locales.en,'index',base));
await writeFile(out+'/.nojekyll','');
await writeFile(out+'/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${base}sitemap.xml\n`);
await writeFile(out+'/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(locales).flatMap(l=>[`${base}${l}/`,`${base}${l}/privacy.html`]).map(url=>`<url><loc>${url}</loc><lastmod>2026-10-08</lastmod></url>`).join('')}</urlset>`);
await writeFile(out+'/deploy-info.json',JSON.stringify({serviceId:'travel-assistant-web',productVersion:'0.4.2',contentDate:'2026-10-08',locales:Object.keys(locales),translations:'complete website copy; human linguistic review pending',pages:24,source:'Public introduction only; extension source is private'},null,2)+'\n');
console.log(`Built 12 locales / 24 localized pages + English root and 404 → ${out}`);
