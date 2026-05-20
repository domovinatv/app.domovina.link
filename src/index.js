import { brandCss } from './brand-css.js';

// Cloudflare Worker koji sjedi ispred app.domovina.link (Coolify dashboard)
// i u letu prilagođava HTML odgovor DOMOVINA brand-u:
//   1. Seeda localStorage.theme = 'light' jednokratno (DOMOVINA brand je light).
//   2. Postavlja data-theme="light" na <html> da spriječi FOUC dark stiliranja.
//   3. Injecta <style id="domovina-brand"> u <head> za color override.
//
// User koji u Coolify UI eksplicitno prebaci theme → poštujemo njegov izbor
// (vidi `domovina_theme_seeded` flag u seedu).
//
// Pass-through za sve non-HTML (CSS, JS, WebSocket, SSE, JSON, images).

const themeSeedScript = `
<script>
(function () {
  try {
    if (!localStorage.getItem('domovina_theme_seeded')) {
      localStorage.theme = 'light';
      localStorage.setItem('domovina_theme_seeded', '1');
    }
  } catch (e) { /* localStorage može biti onemogućen */ }
})();
</script>`;

export default {
  async fetch(request) {
    const response = await fetch(request);
    const contentType = response.headers.get('content-type') || '';

    if (!contentType.includes('text/html')) {
      return response;
    }

    return new HTMLRewriter()
      .on('html', {
        element(el) {
          // Naš seed script mora ići PRIJE Coolify-ovog inline theme skripta,
          // koji je first child od <html>. prepend() na <html> stavlja nas
          // ispred njega → naš seedani localStorage.theme se čita kod njegove provjere.
          el.prepend(themeSeedScript, { html: true });
        },
      })
      .on('head', {
        element(el) {
          el.append(
            `<style id="domovina-brand">${brandCss}</style>`,
            { html: true }
          );
        },
      })
      .on('body', {
        element(el) {
          // DOMOVINA brand stripe — fixed na vrhu, vidi .domovina-brand-stripe u brand-css.js
          el.prepend(
            '<div class="domovina-brand-stripe" aria-hidden="true"><span></span><span></span><span></span></div>',
            { html: true }
          );
        },
      })
      .transform(response);
  },
};
