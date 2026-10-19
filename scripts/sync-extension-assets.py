"""Copy reviewed artwork and browser ZIPs from the private extension checkout."""
import hashlib
import json
import shutil
import sys
from pathlib import Path
from zipfile import ZipFile

root = Path(__file__).resolve().parents[1]
source = Path(sys.argv[1]).resolve()
art = source / "outputs/store-assets-0.5.0"
manifest = json.loads((art / "manifest.json").read_text())
destination = root / "assets/store/0.5.0"
destination.mkdir(parents=True, exist_ok=True)
previous = destination / "manifest.json"
if previous.exists():
    kept = {e["path"] for e in manifest["files"]}
    for entry in json.loads(previous.read_text())["files"]:
        old = destination / entry["path"]
        if entry["path"] not in kept and old.is_relative_to(destination) and old.is_file():
            old.unlink()
for entry in manifest["files"]:
    file = art / entry["path"]
    assert file.is_relative_to(art)
    assert hashlib.sha256(file.read_bytes()).hexdigest() == entry["sha256"]
    target = destination / entry["path"]
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(file, target)
for name in ["manifest.json", "README.md", *[f"pikvia-0.5.0-{p}-assets.zip" for p in ["all", "chrome", "edge", "firefox", "opera", "whale", "safari-macos"]]]:
    shutil.copyfile(art / name, destination / name)

downloads = root / "assets/downloads"
downloads.mkdir(exist_ok=True)
receipt = json.loads((source / "docs/development-package-0.5.0.json").read_text())
published = []
for target in ["chrome", "edge", "brave", "opera", "firefox", "whale"]:
    entry = next(e for e in receipt["assets"] if e["target"] == target)
    file = source / "artifacts/releases/0.5.0" / entry["name"]
    assert hashlib.sha256(file.read_bytes()).hexdigest() == entry["sha256"]
    with ZipFile(file) as archive:
        assert archive.testzip() is None
        assert all(not any(p in Path(n).parts for p in ["..", ".git", ".private", "node_modules", "xcuserdata"]) for n in archive.namelist())
        assert all(not n.endswith((".map", ".pem", ".p8", ".env")) for n in archive.namelist())
        assert not any("ui-qa" in n for n in archive.namelist())
        extension = json.loads(archive.read("manifest.json"))
        assert extension["version"] == "0.5.0"
        assert not any("localhost" in p or "127.0.0.1" in p for p in extension["host_permissions"])
    name = f"pikvia-0.5.0-{target}.zip"
    shutil.copyfile(file, downloads / name)
    published.append({"browser": target, "file": name, "version": "0.5.0", "format": "unpacked-extension-zip", "signedStorePackage": False, "bytes": entry["bytes"], "sha256": entry["sha256"]})
(downloads / "manifest.json").write_text(json.dumps({"version": "0.5.0", "downloads": published, "safari": {"download": None, "reason": "A signed native application is required"}}, indent=2) + "\n")

gallery = json.loads((root / "gallery-locales.json").read_text())
keys = ["benefitCoupon", "benefitDiscount", "codes", "codesIntro", "copyCode", "copyOfferLink", "checkOffers", "currentOffers", "offerConditions", "appearance", "chooseService", "applyOffer", "manualCopyHint", "allOffers", "disclosure", "privacyText", "visitPrivacy", "settings", "safariInstallDesktop", "safariInstallMobile", "comparisonCoverage", "privacy"]
product = {}
catalog = json.loads((source / "extension/src/i18n/catalog.json").read_text())
master = json.loads((source / "extension/src/i18n/master-locales.json").read_text())
for base in ["en", "ko"]:
    catalog[base] = json.loads((source / f"extension/src/i18n/locales/{base}.json").read_text())
for lang, copy in gallery.items():
    chain, current = [], lang
    while current not in chain:
        chain.append(current)
        current = master.get("parents", {}).get(current)
        if not current:
            break
    ui = dict(catalog["en"])
    for current in reversed(chain):
        ui.update(catalog.get(current, {}))
    product[lang] = {key: ui[key] for key in keys}
(root / "product-locales.json").write_text(json.dumps(product, ensure_ascii=False, indent=2) + "\n")
print(json.dumps({"artwork": len(manifest["files"]), "browserDownloads": len(published), "productLocales": len(product)}))
