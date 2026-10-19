# pikvia

Public introduction and browser downloads for pikvia by RushLabs.

- [English](https://mcyj.github.io/travel-assistant-web/en/)
- [한국어](https://mcyj.github.io/travel-assistant-web/ko/)
- [Screenshots](https://mcyj.github.io/travel-assistant-web/en/#screenshots)
- [Browser downloads](https://mcyj.github.io/travel-assistant-web/en/#download)

The introduction combines coupon-code instructions, available-offer links, product screenshots and browser-specific ZIP downloads. Existing `/store-assets/` URLs redirect to the introduction's screenshot section. No store listing or guaranteed discount is implied by a ZIP download. Safari has installation information because these ZIPs are not signed native Safari apps. Firefox ZIP installation is temporary.

## Build

```sh
npm run build
npm test
npm run serve
```

`scripts/build.mjs` is the only page generator. It produces 87 localized introductions, help pages and privacy summaries from `product-locales.json`, `gallery-locales.json`, `website-copy.mjs` and `website-privacy.json`. English and Korean installation instructions are available; other locales identify the English installation text explicitly. Translations require linguistic review. GitHub Pages publishes `main:/docs`.

`scripts/sync-extension-assets.py /path/to/extension-checkout` copies only manifest-verified artwork, validated browser archives and selected public UI messages. It does not copy credentials, account records or the private source checkout. Published archive checksums are in `assets/downloads/manifest.json`. Original screenshot provenance remains in the artwork manifest.

The site has no analytics SDK or contact form. The privacy pages describe local preferences, request metadata, affiliate links and external destinations. `project-context.md` is the single project log. Site deployment, store publication, affiliate permissions and actual installed-browser attribution are separate results.
