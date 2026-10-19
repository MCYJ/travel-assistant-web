import { mkdir, writeFile, cp, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import gallery from "../gallery-locales.json" with { type: "json" };
import product from "../product-locales.json" with { type: "json" };
import { headlines, installation } from "../website-copy.mjs";
import websitePrivacy from "../website-privacy.json" with { type: "json" };
const root = fileURLToPath(new URL("../", import.meta.url)),
  out = root + "docs";
const base = "https://mcyj.github.io/travel-assistant-web/",
  email = "june1012june@gmail.com";
const languages = Object.keys(gallery),
  rtl = ["ar", "he", "fa", "ur", "ug", "skr"];
const esc = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const name = (l) =>
  new Intl.DisplayNames([l, "en"], { type: "language" }).of(l) ?? l;
const browsers = [
  ["chrome", "Google Chrome"],
  ["edge", "Microsoft Edge"],
  ["whale", "Naver Whale"],
  ["opera", "Opera"],
  ["brave", "Brave"],
  ["firefox", "Firefox"],
  ["safari", "Safari"],
];
const symbol = (s) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${{ coupon: '<path d="M4 5h16v5a2 2 0 0 0 0 4v5H4v-5a2 2 0 0 0 0-4V5Z"/><path d="M15 5v3m0 3v2m0 3v3"/>', link: '<path d="m10 13 4-4m-6 7-1 1a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m0 12a4 4 0 0 0 6 0l5-5a4 4 0 0 0-6-6l-1 1" transform="translate(1 1) scale(.9)"/>', settings: '<path d="M4 7h16M4 17h16"/><circle cx="8" cy="7" r="3"/><circle cx="16" cy="17" r="3"/>', download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>', image: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="m3 16 5-5 5 5 3-3 5 5"/>', help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 8.5a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4M12 16h.01"/>', globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a17 17 0 0 0 0 18 17 17 0 0 0 0-18"/>' }[s]}</svg>`;
function shell(l, page, body, prefix = "../") {
  const t = gallery[l],
    u = product[l],
    home = prefix + l + "/",
    path = l + "/" + (page === "index" ? "" : page + ".html");
  const headline =
    headlines[l]?.[0] ?? `${u.benefitCoupon} · ${u.benefitDiscount}`;
  const title =
    (page === "index" ? headline : page === "privacy" ? t.privacy : t.support) +
    " · pikvia";
  const intro = headlines[l]?.[1] ?? u.codesIntro + " " + u.manualCopyHint;
  return `<!doctype html><html lang="${l}" dir="${rtl.includes(l.split("-")[0]) ? "rtl" : "ltr"}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(title)}</title><meta name="description" content="${esc(intro)}"><link rel="canonical" href="${base + path}">${languages.map((code) => `<link rel="alternate" hreflang="${code}" href="${base + code + "/" + (page === "index" ? "" : page + ".html")}">`).join("")}<link rel="alternate" hreflang="x-default" href="${base + "en/" + (page === "index" ? "" : page + ".html")}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(intro)}"><meta property="og:image" content="${base}assets/store/0.5.0/chrome/${l === "ko" ? "ko" : "en"}/01-popup.png"><meta property="og:url" content="${base + path}"><link rel="icon" href="${prefix}assets/icon-pikvia.png"><link rel="stylesheet" href="${prefix}assets/style.css?v=20261020"><script src="${prefix}assets/site.js?v=20261020" defer></script>${page === "index" ? '<meta name="fo-verify" content="270a4b4a-f10c-41ab-af27-ba55c99af405">' : ""}<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", name: "pikvia", applicationCategory: "BrowserApplication", operatingSystem: "Chrome, Edge, Brave, Opera, Whale, Firefox", softwareVersion: "0.5.0", description: intro, url: base + path, publisher: { "@type": "Organization", name: "RushLabs", email } }).replaceAll("<", "\\u003c")}</script></head><body><a class="skip" href="#main">${esc(t.skip)}</a><header><div class="wrap header-inner"><a class="brand" href="${home}" aria-label="pikvia"><img src="${prefix}assets/icon-pikvia.png" width="36" height="36" alt=""><span>pikvia</span></a><nav aria-label="pikvia">${[
    ["coupon", u.codes, home + "#features"],
    ["image", t.gallery, home + "#screenshots"],
    [
      "download",
      l === "ko" ? "다운로드" : l === "en" ? "Downloads" : t.packs,
      home + "#download",
    ],
    ["help", t.support, home + "support.html"],
  ]
    .map(
      ([i, label, url]) =>
        `<a class="nav-link" href="${url}"${page === "support" && i === "help" ? ' aria-current="page"' : ""}>${symbol(i)}<span>${esc(label)}</span></a>`,
    )
    .join(
      "",
    )}</nav><label class="language">${symbol("globe")}<select data-language aria-label="${esc(t.language)}">${languages.map((code) => `<option lang="${code}" value="${code}" data-url="${prefix + code + "/" + (page === "index" ? "" : page + ".html")}"${code === l ? " selected" : ""}>${esc(name(code))}</option>`).join("")}</select></label></div></header><main id="main" class="wrap">${body}</main><footer class="wrap" id="contact"><div class="footer-top"><span>© 2026 RushLabs · pikvia</span><div><a href="${home}privacy.html">${esc(t.privacy)}</a><a href="${home}support.html">${esc(t.support)}</a><a href="mailto:${email}">${esc(t.contact)}</a></div></div><p class="disclosure" id="partners">${esc(u.disclosure)}</p></footer></body></html>`;
}
function carousel(l, prefix) {
  const t = gallery[l],
    imageLocale = l === "ko" ? "ko" : "en",
    u = product[l];
  return `<div class="carousel"><div class="carousel-track" tabindex="0" aria-label="${esc(t.gallery)}">${["01-popup", "02-services", "03-compare", "04-settings"].map((file, i) => `<figure class="slide"><img src="${prefix}assets/store/0.5.0/chrome/${imageLocale}/${file}.png?v=20261020" data-en="${prefix}assets/store/0.5.0/chrome/en/${file}.png?v=20261020" data-ko="${prefix}assets/store/0.5.0/chrome/ko/${file}.png?v=20261020" width="1280" height="800" alt="${esc([u.codes, u.chooseService, u.comparisonCoverage, u.settings][i])}" loading="lazy"></figure>`).join("")}</div><div class="carousel-toolbar"><div class="image-language"><button data-image-language="en" aria-pressed="${l !== "ko"}" lang="en">English</button><button data-image-language="ko" aria-pressed="${l === "ko"}" lang="ko">한국어</button></div><div class="carousel-controls"><button class="arrow" data-previous aria-label="${esc(t.previous)}">‹</button><div class="dots">${[0, 1, 2, 3].map((i) => `<button class="dot" data-slide="${i}" aria-current="${i === 0}" aria-label="${esc(t.slide.replace("{number}", new Intl.NumberFormat(l).format(i + 1)).replace("{total}", new Intl.NumberFormat(l).format(4)))}"></button>`).join("")}</div><button class="arrow" data-next aria-label="${esc(t.next)}">›</button></div></div></div>`;
}
function downloads(l, prefix) {
  const t = gallery[l],
    ins = installation[l] ?? installation.en;
  return `<section class="section download-section" id="download"><div class="section-head"><span class="eyebrow">pikvia</span><h2>${esc(l === "ko" ? "브라우저별 다운로드" : t.packs)}</h2></div><div class="browser-grid">${browsers.map(([id, label]) => `<article class="browser-card"><img src="${prefix}assets/browser-icons/${id}.png" width="42" height="42" alt=""><h3>${label}</h3>${id === "safari" ? `<a class="button browser-download secondary" href="#install-safari">${esc(ins.guide)} ↗</a>` : `<a class="button browser-download" href="${prefix}assets/downloads/pikvia-0.5.0-${id}.zip" download aria-label="${esc(label + " · " + ins.zip)}">${symbol("download")}${esc(ins.zip)}</a>`}</article>`).join("")}</div><div class="installation"><h3 lang="${installation[l] ? l : "en"}">${esc(ins.title)}</h3>${[
    ["chromium", "Chrome · Edge · Brave · Opera · Whale"],
    ["firefox", "Firefox"],
    ["safari", "Safari"],
  ]
    .map(
      ([id, label]) =>
        `<details id="install-${id}" lang="${installation[l] ? l : "en"}"><summary>${label}</summary><p>${esc(ins[id])}</p>${id === "safari" ? `<a href="mailto:${email}?subject=pikvia%20Safari">${esc(ins.safariAction)} ↗</a>` : ""}</details>`,
    )
    .join("")}</div></section>`;
}
function home(l, prefix = "../") {
  const t = gallery[l],
    u = product[l],
    headline = headlines[l]?.[0] ?? `${u.benefitCoupon} · ${u.benefitDiscount}`,
    intro = headlines[l]?.[1] ?? u.codesIntro + " " + u.manualCopyHint;
  return shell(
    l,
    "index",
    `<section class="hero"><div class="hero-copy"><div class="eyebrow">${esc(u.codes)}</div><h1>${esc(headline)}</h1><p class="intro">${esc(intro)}</p><div class="actions"><a class="button primary" href="#download">${symbol("download")}${esc(l === "ko" ? "다운로드" : l === "en" ? "Download pikvia" : t.packs)}</a><a class="button secondary" href="#screenshots">${esc(t.gallery)} ↓</a></div><div class="hero-tags"><span>${symbol("coupon")}${esc(u.benefitCoupon)}</span><span>${symbol("link")}${esc(u.benefitDiscount)}</span></div></div><div class="hero-visual"><div class="visual-top"><span>pikvia</span><span>${esc(u.codes)}</span></div><img src="${prefix}assets/popup-pikvia-${l === "ko" ? "ko" : "en"}.png?v=20261020" width="440" height="600" fetchpriority="high" alt="${esc(u.codes)}"></div></section><section class="section" id="features"><span id="product" aria-hidden="true"></span><div class="section-head"><span class="eyebrow">pikvia</span><h2>${esc(u.allOffers)}</h2><p>${esc(u.offerConditions)}</p></div><div class="feature-grid">${[
      ["coupon", u.copyCode, u.manualCopyHint],
      ["link", u.applyOffer, u.codesIntro],
      ["settings", t.helpSettings, t.helpSettingsBody],
    ]
      .map(
        ([i, a, b]) =>
          `<article class="feature"><div class="feature-icon">${symbol(i)}</div><h3>${esc(a)}</h3><p>${esc(b)}</p></article>`,
      )
      .join(
        "",
      )}</div></section><section class="section" id="screenshots"><div class="section-head"><span class="eyebrow">pikvia</span><h2>${esc(t.gallery)}</h2></div>${carousel(l, prefix)}</section>${downloads(l, prefix)}`,
    prefix,
  );
}
function support(l) {
  const t = gallery[l];
  return shell(
    l,
    "support",
    `<section class="page-heading"><span class="eyebrow">pikvia</span><h1>${esc(t.support)}</h1><p>${esc(t.helpIntro)}</p></section>${[
      [t.helpOffers, t.helpOffersBody],
      [t.helpSettings, t.helpSettingsBody],
      [t.helpPrivacy, t.helpPrivacyBody],
      [t.helpTrouble, t.helpTroubleBody],
    ]
      .map(
        ([a, b]) =>
          `<section class="text-card"><h2>${esc(a)}</h2><p>${esc(b)}</p></section>`,
      )
      .join(
        "",
      )}<p class="page-action"><a class="button primary" href="./#download">${symbol("download")}${esc(l === "ko" ? "다운로드" : l === "en" ? "Download pikvia" : t.packs)}</a></p>`,
  );
}
function privacy(l) {
  const t = gallery[l],
    u = product[l],
    web = websitePrivacy[l] ?? websitePrivacy.en;
  return shell(
    l,
    "privacy",
    `<section class="page-heading"><span class="eyebrow">pikvia · RushLabs</span><h1>${esc(t.privacy)}</h1></section>${[
      [t.helpPrivacy, u.privacyText],
      [u.settings, u.visitPrivacy],
      [t.helpLinks, u.disclosure],
    ]
      .map(
        ([a, b]) =>
          `<section class="text-card"><h2>${esc(a)}</h2><p>${esc(b)}</p></section>`,
      )
      .join(
        "",
      )}<section class="text-card"><h2>GitHub Pages</h2><p lang="${websitePrivacy[l] ? l : "en"}">${esc(web)}</p><p><a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub · Privacy ↗</a></p><p><a href="https://travel-assistant-links.june1012june.workers.dev/privacy${l === "ko" ? "" : "#english"}">pikvia · ${esc(t.privacy)} ↗</a></p></section><section class="text-card"><h2>RushLabs</h2><p>662-28-01965 · <a href="mailto:${email}">${email}</a></p></section>`,
  );
}
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(root + "assets", out + "/assets", { recursive: true });
await mkdir(out + "/store-assets", { recursive: true });
const urls = [];
for (const l of languages) {
  await mkdir(out + "/" + l, { recursive: true });
  await writeFile(out + "/" + l + "/index.html", home(l));
  await writeFile(out + "/" + l + "/support.html", support(l));
  await writeFile(out + "/" + l + "/privacy.html", privacy(l));
  for (const page of ["", "support.html", "privacy.html"])
    urls.push(base + l + "/" + page);
  const target = base + l + "/#screenshots";
  await writeFile(
    out + "/store-assets/" + (l === "en" ? "index.html" : l + ".html"),
    `<!doctype html><html lang="${l}"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${target}"><link rel="canonical" href="${base + l + "/"}"><title>pikvia</title></head><body><a href="${target}">${esc(gallery[l].gallery)}</a></body></html>`,
  );
}
await writeFile(out + "/index.html", home("en", ""));
await writeFile(
  out + "/404.html",
  shell(
    "en",
    "support",
    '<section class="page-heading"><h1>404</h1><p>This page could not be found.</p><a class="button primary" href="' +
      base +
      'en/">pikvia</a></section>',
    base,
  ),
);
await writeFile(out + "/.nojekyll", "");
await writeFile(
  out + "/robots.txt",
  `User-agent: *\nAllow: /\nSitemap: ${base}sitemap.xml\n`,
);
await writeFile(
  out + "/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${url}</loc><lastmod>2026-10-20</lastmod></url>`).join("")}</urlset>`,
);
await writeFile(
  out + "/deploy-info.json",
  JSON.stringify(
    {
      product: "pikvia",
      productVersion: "0.5.0",
      contentDate: "2026-10-20",
      locales: languages,
      canonicalHome: base + "en/",
      pages: languages.length * 3,
      browserZipDownloads: 6,
      safari: "installation-information-only",
    },
    null,
    2,
  ) + "\n",
);
console.log(
  JSON.stringify({
    locales: languages.length,
    pages: languages.length * 3,
    legacyGalleryRedirects: languages.length,
    browserZipDownloads: 6,
  }),
);
