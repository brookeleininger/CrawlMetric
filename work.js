(() => {
  const cases = {
    walton: { id: 'walton-case', title: 'Walton College / Web SEO Intern — CrawlMetric' },
    ozarks: { id: 'ozarks-case', title: 'Animal Clinic of the Ozarks / Concept — CrawlMetric' }
  };
  const selectedCase = cases[new URLSearchParams(location.search).get('case')];
  if (selectedCase) {
    document.getElementById('experience-list').hidden = true;
    document.getElementById(selectedCase.id).hidden = false;
    document.title = selectedCase.title;
  }
  const carousel = document.getElementById('work-carousel');
  const previous = document.getElementById('work-prev');
  const next = document.getElementById('work-next');
  const updateControls = () => {
    previous.disabled = carousel.scrollLeft <= 1;
    next.disabled = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1;
  };
  const move = direction => carousel.scrollBy({ left: direction * (carousel.firstElementChild.getBoundingClientRect().width + 24), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); }
  });
  carousel.addEventListener('scroll', updateControls, { passive: true });
  new ResizeObserver(updateControls).observe(carousel);
  updateControls();

})();
