// DOMOVINA brand override za Coolify v4 UI.
// Coolify koristi Tailwind v4 s CSS varijablama definiranim u :root,:host.
// Override-amo coollabs ljubičastu primarnu paletu DOMOVINA navy paletom.
// Semantičke boje (warning/success/error) ostavljamo netaknute.
//
// Brand tokeni izvori istine: donate.domovina.ai/public/styles.css

export const brandCss = `
:root, :host {
  /* DOMOVINA navy paleta zamjenjuje coollabs purple */
  --color-coollabs:     #002F6C;
  --color-coollabs-50:  #E6EDF6;
  --color-coollabs-100: #003580;
  --color-coollabs-200: #002A60;
  --color-coollabs-300: #001F48;
}

/* Login stranica — body je white, ali Coolify v4 default ima blago tinted background.
   Centriramo na cisti DOMOVINA white surface kada nije dark mode. */
html:not(.dark) body {
  background-color: #FFFFFF;
}

/* Hover state za primary linkove (DOMOVINA pattern: navy -> red on hover).
   Coolify nema ovaj pattern by default, dodajemo ga selektivno samo na anchor-ima
   koji koriste coollabs boju. */
a:hover {
  --color-coollabs: #FF0000;
}

/* DOMOVINA brand stripe — fixed na vrhu cijelog UI-a, iznad svega.
   Tri jednake trake red -> white -> navy, 6px visine.
   Pattern preuzet iz donate.domovina.ai/public/styles.css. */
.domovina-brand-stripe {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  display: flex;
  z-index: 999999;
  pointer-events: none;
}
.domovina-brand-stripe span {
  flex: 1;
  display: block;
}
.domovina-brand-stripe span:nth-child(1) { background: #FF0000; }
.domovina-brand-stripe span:nth-child(2) { background: #FFFFFF; }
.domovina-brand-stripe span:nth-child(3) { background: #002F6C; }

/* Pomak za sadržaj da se ne skriva ispod stripe-a. Coolify-ev top toolbar
   će biti pomaknut 6px niže — neprimjetno. */
body { margin-top: 6px; }
`;
