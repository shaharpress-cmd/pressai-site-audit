# Press AI · Landing Page (אבחון אתר)

Hebrew RTL marketing landing page for **Press AI** (`https://pressai.co.il`).

סוכנות דיגיטלית לקידום עסקים ושיפור ביצועים באינטרנט — אבחון מקצועי + חבילות יישום.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Self-contained static build (no backend required for the demo)

## Run locally

```bash
cd pressai-landing
npm install
npm run dev
```

Open the URL Vite prints (default `http://localhost:5173`).

Preview production build:

```bash
npm run build
npm run preview
```

## Form / leads (current behavior)

On successful submit the form:

1. Validates URL, phone, email, and marketing/contact consent
2. Saves the lead into `localStorage` under the key **`pressai_leads`** (JSON array)
3. Shows a success UI with the message:  
   **«הדוח יישלח למייל לאחר הכנה מקצועית»**

The page does **not** auto-email a PDF. Wire a real endpoint before production use.

### Wiring Formspree / email / webhook later

Replace the `saveLead(...)` call in `src/components/LeadForm.tsx` (or add a fetch after it) with something like:

```ts
await fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  body: JSON.stringify({
    url, businessName, contactName, phone, email, consent,
    _subject: 'Press AI — בקשת אבחון אתר',
  }),
})
```

Or POST to your own webhook / CRM / Zapier / Make. Keep `localStorage` as a local backup if useful.

Inspect stored leads in DevTools:

```js
JSON.parse(localStorage.getItem('pressai_leads') || '[]')
```

## Deploy static to Hostinger

1. Build:

   ```bash
   npm run build
   ```

2. Upload the contents of **`dist/`** to the public web root of the domain/subdomain (e.g. `public_html` or a subdomain folder).

3. Ensure the host serves `index.html` for the site root. With `base: './'` in `vite.config.ts`, relative asset paths work in a subdirectory as well.

4. Optional: enable HTTPS and point DNS to Hostinger.

WhatsApp CTA: `https://wa.me/972538401100` · Phone: `053-8401100`

## Brand notes

- Palette: deep navy, teal accents, soft gold highlights
- No DIY how-to copy — diagnosis + agency implementation only
- No ranking / lead-count guarantees (see footer disclaimer)

## Screenshots

- `preview-desktop.png` — desktop capture of the live page
- `preview-mobile.png` — ~390px mobile capture
