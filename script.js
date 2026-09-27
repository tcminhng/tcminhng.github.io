document.documentElement.classList.add('js');
const themeButton = document.querySelector('.theme-toggle');
function syncThemeButton() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} mode`);
}
syncThemeButton();
themeButton.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('portfolio-theme', next); } catch {}
  syncThemeButton();
});

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(returnFocus = false) {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
matchMedia('(min-width: 601px)').addEventListener('change', () => closeMenu());
document.querySelector('#current-year').textContent = new Date().getFullYear();

// The full sentence stays accessible and readable without JavaScript.
const typewriter = document.querySelector('#typewriter');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const sentences = ['I turn ideas into useful software.', 'I build. I learn. I keep exploring.', 'From code to connected devices.'];
let timer;
function startTypewriter() {
  clearTimeout(timer);
  if (!typewriter) return;
  typewriter.textContent = sentences[0];
  if (reducedMotion.matches) return;
  let sentence = 0;
  let letters = sentences[0].length;
  let deleting = true;
  function tick() {
    if (document.hidden) { timer = setTimeout(tick, 500); return; }
    letters += deleting ? -1 : 1;
    typewriter.textContent = sentences[sentence].slice(0, letters);
    let delay = deleting ? 25 : 58;
    if (letters === 0) { deleting = false; sentence = (sentence + 1) % sentences.length; delay = 300; }
    else if (letters === sentences[sentence].length) { deleting = true; delay = 3500; }
    timer = setTimeout(tick, delay);
  }
  timer = setTimeout(tick, 4500);
}
reducedMotion.addEventListener('change', startTypewriter);
startTypewriter();
