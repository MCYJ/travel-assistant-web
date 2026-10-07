const select = document.getElementById('language');
select?.addEventListener('change', () => {
  const option = select.selectedOptions[0];
  try { localStorage.setItem('travel-assistant-site-language', select.value); } catch { /* storage can be disabled */ }
  if (option?.dataset.url) window.location.assign(option.dataset.url);
});
document.querySelector('[data-print]')?.addEventListener('click', () => window.print());
// Root stays in English for partner submissions; explicit selection determines navigation.
