import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import gallery from "../gallery-locales.json" with { type: "json" };
const root = fileURLToPath(new URL("../docs/", import.meta.url)),
  languages = Object.keys(gallery);
const read = (l, p = "index.html") => readFile(resolve(root, l, p), "utf8");
test("one localized introduction contains features, screenshots and real browser downloads", async () => {
  for (const l of languages) {
    const html = await read(l);
    assert.ok(html.includes(`<html lang="${l}"`));
    assert.ok(html.includes('id="features"'));
    assert.ok(html.includes('id="screenshots"'));
    assert.ok(html.includes('id="download"'));
    assert.equal((html.match(/class="slide"/g) || []).length, 4);
    assert.equal((html.match(/ download aria-label=/g) || []).length, 6);
    assert.equal((html.match(/class="browser-card"/g) || []).length, 7);
    assert.ok(html.includes('id="install-safari"'));
    assert.equal((html.match(/data-url=/g) || []).length, languages.length);
    assert.ok(
      !/class="status"|class="brand-story"|class="pack"|<figcaption|NOT FOR STORE/i.test(
        html,
      ),
    );
    assert.ok(
      !/다음 선택|개발 미리보기|개발 중|Development preview|Your next choice/.test(
        html,
      ),
    );
    assert.ok(!/chromewebstore\.google\.com|apps\.apple\.com/.test(html));
  }
});
test("legacy gallery URLs resolve to the canonical introduction instead of a second product page", async () => {
  for (const l of languages) {
    const html = await readFile(
      resolve(root, "store-assets", l === "en" ? "index.html" : l + ".html"),
      "utf8",
    );
    assert.ok(html.includes('http-equiv="refresh"'));
    assert.ok(html.includes("/" + l + "/#screenshots"));
    assert.ok(!html.includes('class="carousel"'));
    assert.ok(html.includes('rel="canonical"'));
  }
});
test("all generated local links and assets exist", async () => {
  const walk = async (dir) =>
    (
      await Promise.all(
        (await readdir(dir, { withFileTypes: true })).map((f) =>
          f.isDirectory() ? walk(resolve(dir, f.name)) : resolve(dir, f.name),
        ),
      )
    ).flat();
  for (const file of (await walk(root)).filter((f) => f.endsWith(".html"))) {
    const html = await readFile(file, "utf8");
    for (const [, raw] of html.matchAll(
      /(?:href|src|data-url|data-en|data-ko)="([^"]+)"/g,
    )) {
      if (/^(https?:|mailto:|#)/.test(raw)) continue;
      const target = resolve(dirname(file), raw.split(/[?#]/)[0]);
      assert.ok(target.startsWith(root.replace(/\/$/, "")), file + " " + raw);
      const result = await stat(target).catch(() => null);
      assert.ok(result, file + " → " + raw);
      if (result.isDirectory())
        assert.ok(await stat(resolve(target, "index.html")));
    }
  }
});
test("download checksums match the actual extension packages and Safari has no false ZIP install", async () => {
  const manifest = JSON.parse(
    await readFile(resolve(root, "assets/downloads/manifest.json"), "utf8"),
  );
  assert.equal(manifest.downloads.length, 6);
  assert.equal(manifest.safari.download, null);
  for (const item of manifest.downloads) {
    const bytes = await readFile(resolve(root, "assets/downloads", item.file));
    assert.equal(createHash("sha256").update(bytes).digest("hex"), item.sha256);
    assert.equal(bytes.length, item.bytes);
    assert.equal(item.signedStorePackage, false);
  }
});
test("privacy, referral disclosure, ownership verification, sitemap and RTL survive consolidation", async () => {
  for (const l of languages) {
    const html = await read(l);
    assert.ok(html.includes('name="fo-verify"'));
    assert.ok(html.includes('class="disclosure"'));
    assert.ok(html.includes("june1012june@gmail.com"));
    const privacy = await read(l, "privacy.html");
    assert.ok(privacy.includes("662-28-01965"));
    assert.ok(privacy.includes("workers.dev/privacy"));
    assert.ok(privacy.includes("github-general-privacy-statement"));
    assert.equal(
      (html.match(/rel="alternate" hreflang=/g) || []).length,
      languages.length + 1,
    );
  }
  assert.ok((await read("ar")).includes('dir="rtl"'));
  assert.ok((await read("he")).includes('dir="rtl"'));
  const xml = await readFile(resolve(root, "sitemap.xml"), "utf8");
  assert.equal((xml.match(/<loc>/g) || []).length, languages.length * 3);
  assert.ok(!xml.includes("store-assets/"));
});
