/* Shared public-site behavior. Client-report demos have separate assets. */
(() => {
  const site = document.getElementById('business-site');
  const intro = document.getElementById('crawlmetric-intro');
  const showSite = () => {
    site.hidden = false;
    document.body.classList.add('site-ready');
  };
  if (intro) {
  intro.addEventListener('animationend', event => {
    if (event.target === intro && event.animationName === 'introExit') showSite();
  });
  setTimeout(showSite, 7500);

  // Reuse the exact original SVG artwork, statically, without altering the intro.
  const artwork = intro.querySelector('svg').cloneNode(true);
  artwork.removeAttribute('aria-label');
  artwork.setAttribute('aria-hidden', 'true');
  artwork.querySelectorAll('[id]').forEach(element => {
    const original = element.id;
    element.id = `homepage-${original}`;
  });
  // Original track styles reference original SVG definitions. Override only the clone.
  const strokes = { 'outer-path': 'outerBlue', 'track-1': 'deepBlue', 'track-2': 'deepBlue', 'track-3': 'blueCyan', 'track-4': 'blueCyan', 'track-5': 'cyanMint', 'track-6': 'mintGreen', 'track-7': 'mintGreen' };
  Object.entries(strokes).forEach(([className, gradient]) => artwork.querySelectorAll(`.${className}`).forEach(element => {
    element.style.stroke = `url(#homepage-${gradient})`;
    element.style.filter = 'url(#homepage-ringGlow)';
  }));
  document.getElementById('site-brand-art').append(artwork);
  }

  const menu = document.querySelector('.site-menu-toggle');
  const nav = document.getElementById('site-navigation');
  const closeMenu = () => { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); };
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); }
  });
  const replay = document.getElementById('site-replay');
  replay.hidden = !['localhost', '127.0.0.1', ''].includes(location.hostname);
  // A real URL works from every page; returning home replays the original intro.
})();
