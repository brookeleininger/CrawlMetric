# CrawlMetric development area

This directory contains design experiments, not public business pages or private client records.

## Initial Website Health Report

Open `/development/demos/initial-health-report/` on the local development server. The existing fictional Fayetteville Animal Hospital report, styles, interactions, and introduction replay are preserved there. It has a noindex directive and no link from the business homepage.

This is an accessible static demo URL, **not an authenticated private area**. Exclude `development/` from the production deployment. Real client reports must eventually live behind authentication in a separately designed reporting area; never store confidential client data here.

## Public site

The root `index.html` is the CrawlMetric business homepage prototype. `homepage.css` and `homepage.js` handle the business experience. The original introduction markup remains in `index.html`; `style.css` and `script.js` remain unchanged.

The seven navigation items lead to separate public pages: `index.html`, `about.html`, `services.html`, `process.html`, `work.html`, `resources.html`, and `contact.html`. They share `homepage.css` and `homepage.js`, with consistent static header/footer markup. The introduction runs on Home only. Its typed wordmark inherits the navigation typography through an isolated override in `homepage.css`; the original animation files and report demo remain untouched. Service copy is proposed, and portfolio, resource, and contact content is explicitly labeled as placeholder content. Confirm business details before publication.

Preview with VS Code Live Server (port 5501), or run `python3 -m http.server 5501 --bind 127.0.0.1` from the project root. The local homepage footer includes Replay introduction.
