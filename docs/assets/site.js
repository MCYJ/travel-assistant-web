document.querySelector("[data-language]")?.addEventListener("change", (e) => {
  const option = e.target.selectedOptions[0];
  try {
    localStorage.setItem("travel-assistant-site-language", e.target.value);
  } catch {}
  if (option?.dataset.url) location.assign(option.dataset.url);
});
const track = document.querySelector(".carousel-track");
if (track) {
  let index = 0;
  const items = [...track.children],
    dots = [...document.querySelectorAll("[data-slide]")],
    previous = document.querySelector("[data-previous]"),
    next = document.querySelector("[data-next]"),
    reduced = matchMedia("(prefers-reduced-motion: reduce)");
  function update() {
    const box = track.getBoundingClientRect();
    index = items.reduce(
      (best, item, i) =>
        Math.abs(item.getBoundingClientRect().left - box.left) <
        Math.abs(items[best].getBoundingClientRect().left - box.left)
          ? i
          : best,
      0,
    );
    dots.forEach((d, i) => d.setAttribute("aria-current", String(i === index)));
    previous.disabled = index === 0;
    next.disabled = index === items.length - 1;
  }
  function go(i) {
    index = Math.max(0, Math.min(items.length - 1, i));
    items[index].scrollIntoView({
      behavior: reduced.matches ? "instant" : "smooth",
      block: "nearest",
      inline: "start",
    });
  }
  previous.onclick = () => go(index - 1);
  next.onclick = () => go(index + 1);
  dots.forEach((d, i) => (d.onclick = () => go(i)));
  track.addEventListener("scroll", update, { passive: true });
  track.addEventListener("keydown", (e) => {
    if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
      e.preventDefault();
      go(
        index +
          (e.key === "ArrowRight" ? 1 : -1) * (document.dir === "rtl" ? -1 : 1),
      );
    }
  });
  document.querySelectorAll("[data-image-language]").forEach(
    (b) =>
      (b.onclick = () => {
        items.forEach((item) => {
          const img = item.querySelector("img");
          img.src = img.dataset[b.dataset.imageLanguage];
        });
        document
          .querySelectorAll("[data-image-language]")
          .forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      }),
  );
  update();
}
function showInstallation() {
  const id = location.hash.slice(1);
  if (id.startsWith("install-")) {
    const details = document.getElementById(id);
    if (details instanceof HTMLDetailsElement) details.open = true;
  }
}
addEventListener("hashchange", showInstallation);
showInstallation();
