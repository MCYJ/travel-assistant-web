# pikvia — partner introduction

Public website for the RushLabs browser extension. English-first partner overview, 12 complete website locales, referral disclosures, development status, privacy summaries, review-build contact and print layout.

- Site: https://mcyj.github.io/travel-assistant-web/
- English submission URL: https://mcyj.github.io/travel-assistant-web/en/#partners
- Korean: https://mcyj.github.io/travel-assistant-web/ko/
- Publisher: RushLabs, South Korea

## Build and validation

No runtime dependencies or external assets.

```sh
npm run build
npm test
npm run serve
```

Source copy is in `locales.mjs`; `scripts/build.mjs` generates `docs/` including static HTML, canonical/hreflang tags, sitemap, English root and a custom 404. GitHub Pages publishes `main:/docs`. Rebuild and commit generated files after changes.

Website locales: en, ko, ja, zh-CN, zh-TW, de, fr, es, pt-BR, it, ar, id. All website sections are translated without fallback. Linguistic review by native speakers remains pending. The extension's 87-language selector and its translation coverage are a separate contract.

## Public content boundary

This repository contains only introduction-site code, the product icon, and a development popup capture. The extension source repository remains private. No affiliate IDs, tokens, credentials, private account records, fabricated discounts, audience metrics or approval claims are included. Public email is a contact link, not an email submission system. The linked full extension privacy policy is provided in English and Korean.

`project-context.md` is the single project log. Store publication, affiliate approval, verified benefits and operational revenue are not established by this site deployment.
