/* Shared public-site behavior. Client-report demos have separate assets. */
(() => {
  const site = document.getElementById('business-site');
  const intro = document.getElementById('crawlmetric-intro');
  const introSessionKey = 'crawlmetric-intro-seen';
  const showSite = () => {
    if (intro) intro.style.display = 'none';
    site.hidden = false;
    document.body.classList.add('site-ready');
    try { sessionStorage.setItem(introSessionKey, 'true'); } catch (_) {}
  };
  if (intro) {
  let introSeen = false;
  try { introSeen = sessionStorage.getItem(introSessionKey) === 'true'; } catch (_) {}
  if (introSeen) {
    showSite();
  } else {
  intro.addEventListener('animationend', event => {
    if (event.target === intro && event.animationName === 'introExit') showSite();
  });
  setTimeout(showSite, 7500);
  }

  // Reuse the original SVG artwork in both hero positions; each clone gets unique definitions.
  const strokes = { 'outer-path': 'outerBlue', 'track-1': 'deepBlue', 'track-2': 'deepBlue', 'track-3': 'blueCyan', 'track-4': 'blueCyan', 'track-5': 'cyanMint', 'track-6': 'mintGreen', 'track-7': 'mintGreen' };
  document.querySelectorAll('.site-hero .site-signal-art').forEach((target, index) => {
    const artwork = intro.querySelector('svg').cloneNode(true);
    const prefix = `homepage-${index}`;
    artwork.removeAttribute('aria-label');
    artwork.setAttribute('aria-hidden', 'true');
    artwork.querySelectorAll('[id]').forEach(element => {
      const original = element.id;
      element.id = `${prefix}-${original}`;
    });
    Object.entries(strokes).forEach(([className, gradient]) => artwork.querySelectorAll(`.${className}`).forEach(element => {
      element.style.stroke = `url(#${prefix}-${gradient})`;
      element.style.filter = `url(#${prefix}-ringGlow)`;
    }));
    target.append(artwork);
  });

  // Type the homepage statement once the intro hands off to the site.
  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) {
    heroTitle.setAttribute('aria-label', heroTitle.textContent.trim());
    const letters = [];
    const walker = document.createTreeWalker(heroTitle, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach(node => {
      const fragment = document.createDocumentFragment();
      for (const character of node.textContent) {
        const letter = document.createElement('span');
        letter.className = 'hero-type-letter';
        letter.setAttribute('aria-hidden', 'true');
        letter.textContent = character;
        fragment.append(letter);
        letters.push(letter);
      }
      node.replaceWith(fragment);
    });

    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    let typingStarted = false;
    const startTyping = () => {
      if (typingStarted) return;
      typingStarted = true;
      if (reducedMotion.matches) {
        letters.forEach(letter => letter.classList.add('is-typed'));
        return;
      }
      const startedAt = performance.now();
      const tick = now => {
        const elapsed = now - startedAt;
        letters.forEach((letter, index) => letter.classList.toggle('is-typed', elapsed >= index * 58));
        if (elapsed < letters.length * 58) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if (!site.hidden) startTyping();
    else {
      const siteObserver = new MutationObserver(() => {
        if (!site.hidden) { siteObserver.disconnect(); startTyping(); }
      });
      siteObserver.observe(site, { attributes: true, attributeFilter: ['hidden'] });
    }
  }
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
  replay.addEventListener('click', () => {
    try { sessionStorage.removeItem(introSessionKey); } catch (_) {}
  });
})();
