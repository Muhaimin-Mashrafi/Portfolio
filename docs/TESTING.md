# Verification performed

Run against a production build (`pnpm build && pnpm start`) in Chromium (Google Chrome) via Playwright, with axe-core for accessibility.

- All routes return 200; hidden, excluded and unknown project URLs return 404.
- axe-core (WCAG 2.0/2.1/2.2 A and AA plus best practices): 0 violations on all 8 routes.
- No console errors or warnings on valid routes; no horizontal overflow at 1440, 1024, 768 and 390 px.
- Boot animation: frame captures, skip button, Escape, click-to-skip, reduced motion, once per tab, CLS 0.
- Reduced motion: content visible, boot overlay not rendered.
- Mobile menu: opens, Escape closes, closes on navigation, 6 links.
- Keyboard: Tab order works and every focused control has a visible focus style.
- CV: "coming soon" state without the PDF; download + open-in-browser with the PDF.

Not run: Firefox and Safari (WebKit) engines (cannot be installed in the build sandbox), Lighthouse, and a live GitHub API sync (the sandbox cannot reach the API; the sync is tested against a mocked API).
