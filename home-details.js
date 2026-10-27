(() => {
  const section = document.querySelector('.home-details');
  const answer = document.getElementById('details-answer');
  const details = {
    title: ["“Home” doesn't say much.", 'A descriptive page title tells visitors and search engines what the page is about. I review titles and make them specific to the business and page.'],
    link: ["A click shouldn't lead to a dead end.", 'Broken links interrupt a visitor’s next step. I identify them and repair or update the destination where appropriate.'],
    image: ['The image has a job beyond looking good.', 'Useful images need appropriate descriptions for people who cannot see them. I review alt text in context, while keeping purely decorative images out of the way.']
  };
  const buttons = section.querySelectorAll('[data-detail]');
  buttons.forEach(button => button.addEventListener('click', () => {
    buttons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    const [title, copy] = details[button.dataset.detail];
    answer.querySelector('h3').textContent = title;
    answer.querySelector('p').textContent = copy;
  }));
})();

(() => {
  const track = document.querySelector('.repair-track');
  const slides = [...track.children];
  const previous = document.querySelector('.repair-prev');
  const next = document.querySelector('.repair-next');
  const position = document.querySelector('.repair-position');
  const current = () => Math.round(track.scrollLeft / track.clientWidth);
  const update = () => {
    const index = current();
    previous.disabled = index === 0;
    next.disabled = index === slides.length - 1;
    const text = `${String(index + 1).padStart(2, '0')} / 03`;
    if (position.textContent !== text) position.textContent = text;
    slides.forEach((slide, number) => { slide.inert = number !== index; });
  };
  const move = direction => track.scrollTo({left: Math.max(0, Math.min(slides.length - 1, current() + direction)) * track.clientWidth, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('keydown', event => {
    if (event.target === track && ['ArrowLeft', 'ArrowRight'].includes(event.key)) { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); }
  });
  track.addEventListener('scroll', update, {passive: true});
  let width = 0;
  new ResizeObserver(() => {
    if (!track.clientWidth) return;
    const index = width ? Math.round(track.scrollLeft / width) : 0;
    width = track.clientWidth;
    track.scrollLeft = Math.min(index, slides.length - 1) * width;
    update();
  }).observe(track);
})();
