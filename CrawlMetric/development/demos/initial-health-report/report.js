/* Presentation-only demo content. No crawl processing or score calculation. */
(() => {
  const categories = [
    { title: 'Search visibility & indexability', score: 64, status: 'Needs attention', description: 'Help search engines discover the pages that explain your care.', tone: 'attention' },
    { title: 'Website navigation & structure', score: 78, status: 'Room to improve', description: 'Give pet owners a clear, dependable route to their next step.', tone: 'moderate' },
    { title: 'Accessibility & images', score: 68, status: 'Needs attention', description: 'Make your content easier to experience across different needs.', tone: 'attention' },
    { title: 'Technical website health', score: 82, status: 'Strong foundation', description: 'Support a reliable experience with sound technical essentials.', tone: 'good' }
  ];
  const findings = [
    { title: 'Key service pages may be missing from search', category: 'Search visibility & indexability', priority: 'High priority', count: '3 sample pages', problem: 'In this fictional scenario, three service pages carry a noindex directive, which asks search engines to exclude them from search results.', impact: 'Pet owners looking for those services could miss relevant information about the hospital, even when the service is a good fit.', fix: 'Confirm that these pages should be public. If so, remove the unintended noindex directive, check their indexability, and request a fresh review through the site’s search tools.', evidence: '/services/dental-care/ · /services/wellness/ · /services/senior-pets/' },
    { title: 'Appointment links lead to a dead end', category: 'Website navigation & structure', priority: 'High priority', count: '4 sample links', problem: 'Four example internal links point to a retired appointment page rather than the current booking destination.', impact: 'A visitor who is ready to book could encounter an error and need to search for another way to contact the hospital.', fix: 'Update the affected links to the correct appointment page. Redirect the retired address where appropriate, then test the complete booking journey on mobile and desktop.', evidence: 'Example retired destination: /book-a-visit/ → /appointments/' },
    { title: 'Large photographs add unnecessary page weight', category: 'Technical website health', priority: 'Medium priority', count: '8 sample images', problem: 'Eight illustrative photos are larger than needed for their display size. A real assessment would measure their effect on page loading separately.', impact: 'Oversized images can make browsing less comfortable on slower connections, especially for pet owners using a phone.', fix: 'Resize and compress the original images, serve suitable formats and responsive sizes, and defer images below the first screen. Verify visual quality and measured loading performance afterward.', evidence: 'Example asset: /images/hospital-exterior.jpg · illustrative size: 2.4 MB' },
    { title: 'Meaningful images need useful descriptions', category: 'Accessibility & images', priority: 'Medium priority', count: '12 sample images', problem: 'Twelve example content images have no useful alternative text. Whether an image needs a description depends on its purpose and surrounding content.', impact: 'Visitors using a screen reader may miss context about the team, facility, or services when meaningful images are not described.', fix: 'Review each image in context. Add concise alternative text to informative images and use empty alternative text for purely decorative images. Check linked images for a clear accessible purpose.', evidence: 'Example content: team portraits, facility photographs, service illustrations' },
    { title: 'Different services share the same page title', category: 'Search visibility & indexability', priority: 'Medium priority', count: '6 sample pages', problem: 'Six illustrative service pages use the same generic title instead of identifying the specific service on each page.', impact: 'Repeated titles can make search results and browser tabs harder to distinguish, giving pet owners less context about what each page offers.', fix: 'Write a concise, distinct title for each service page that accurately describes its content and includes the hospital name where useful. Review the titles for clarity rather than repeating keywords.', evidence: 'Example: “Dental Care for Pets | Fayetteville Animal Hospital”' }
  ];
  const app = document.getElementById('crawlmetric-app');
  document.getElementById('report-categories').innerHTML = categories.map((item, i) => `
    <section class="report-category ${item.tone}"><span class="report-category-index">0${i + 1}</span><h3>${item.title}</h3><p>${item.description}</p><div class="report-category-score"><strong>${item.score}<small>/100</small></strong><span>${item.status}</span></div><div class="report-meter" role="img" aria-label="Demo score: ${item.score} out of 100"><span style="width:${item.score}%"></span></div></section>`).join('');
  document.getElementById('report-findings').innerHTML = findings.map((item, i) => `
    <details class="report-finding" id="finding-${i + 1}"><summary><span class="report-finding-number">0${i + 1}</span><span class="report-finding-heading"><span class="report-finding-category">${item.category}</span><strong>${item.title}</strong><span class="report-finding-count">DEMO DATA · ${item.count}</span></span><span class="report-priority ${i < 2 ? 'high' : ''}">${item.priority}</span><span class="report-disclosure" aria-hidden="true">+</span></summary><div class="report-finding-details"><div><h4>The problem</h4><p>${item.problem}</p></div><div><h4>Why it matters</h4><p>${item.impact}</p></div><div><h4>Recommended next step</h4><p>${item.fix}</p></div><p class="report-evidence"><strong>Illustrative example</strong>${item.evidence}</p></div></details>`).join('');
  const showReport = () => {
    app.hidden = false;
    document.body.classList.add('report-ready');
  };
  const intro = document.getElementById('crawlmetric-intro');
  intro.addEventListener('animationend', event => {
    if (event.target === intro && event.animationName === 'introExit') showReport();
  });
  // Resilience if the browser suppresses animation events; original exit ends at 7.3s.
  setTimeout(showReport, 7500);
  const expand = document.getElementById('report-expand');
  const details = [...document.querySelectorAll('.report-finding')];
  const syncExpand = () => { expand.textContent = details.every(item => item.open) ? 'Collapse all details' : 'Expand all details'; };
  expand.addEventListener('click', () => {
    const open = !details.every(item => item.open);
    details.forEach(item => { item.open = open; });
    syncExpand();
  });
  details.forEach(item => item.addEventListener('toggle', syncExpand));
  document.querySelectorAll('.report-plan a').forEach(link => link.addEventListener('click', () => {
    const detail = document.querySelector(link.getAttribute('href'));
    detail.open = true;
  }));
  document.getElementById('report-print').addEventListener('click', () => {
    const previous = details.map(item => item.open);
    details.forEach(item => { item.open = true; });
    window.addEventListener('afterprint', () => details.forEach((item, i) => { item.open = previous[i]; }), { once: true });
    window.print();
  });
  document.getElementById('report-replay').addEventListener('click', () => {
    history.replaceState(null, '', location.pathname + location.search);
    window.scrollTo(0, 0);
    location.reload();
  });
})();
