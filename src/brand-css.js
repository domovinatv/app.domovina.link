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
`;
