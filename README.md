# Sivasankari Makeup Artist: website

Bilingual (English / Tamil) website for **sivasankarimakeupartist.in**, with a private admin page for managing the gallery.

## Run locally

```bash
npm install
npm start
```

- Website: http://localhost:3000
- Admin: http://localhost:3000/admin (not linked anywhere on the site; share the link only with the admin)

Admin login is read from `.env` (see `.env.example`):

```
ADMIN_USERNAME=sivasankari
ADMIN_PASSWORD=...
```

To change the password, edit `.env` and restart the server. Signing in sets a secure HttpOnly cookie that lasts 7 days; a server restart signs everyone out. After 8 wrong attempts in 15 minutes, login is blocked temporarily.

## Pages

| URL | Page |
|---|---|
| `/` | Home: hero, service highlights, latest 6 gallery photos, short about, booking call-to-action |
| `/services` | All services, makeup finishes, festival offers, how booking works |
| `/gallery` | Full gallery with category filters and a full-screen viewer (swipe on mobile) |
| `/about` | About Sivasankari, brands used, key numbers |
| `/faq` | Frequently asked questions |
| `/contact` | Booking form (opens WhatsApp and saves a copy to the admin page), contact details, map |
| `/admin` | Private gallery and booking manager (see below) |

Every page has an EN / தமிழ் switch in the header, and the chosen language is remembered across pages.

### Editing pages

- Page content lives in `pages/*.html` (`home.html`, `services.html`, …).
- The header, footer, booking call-to-action and photo viewer are shared, in `pages/partials/`. Pages pull them in with `<!--#include header-->` and similar markers, so edit those files once to change every page.
- Tamil text is in `public/app.js` (the `TA` object), keyed by each element's `data-i18n` attribute.
- Styles: `public/styles.css`.

### Admin (`/admin`)

Username and password login. Add photos (up to 20 at a time), change a photo's type or caption, and remove photos. View booking enquiries and set a status for each. The page is not linked from the site and is hidden from search engines (`noindex`).

## Before going live

1. **Logo**: replace `public/img/logo.svg` (currently a placeholder monogram) with the real logo.
2. **Portrait**: add Sivasankari's photo as `public/img/portrait.jpg` and update the `<img>` in the About section of `public/index.html`.
3. **Gallery**: sign in at `/admin` and upload the first set of photos (Instagram photos may be reused; the questionnaire answered "Yes").
4. **Email**: `sivasankari.makeupartist@gmail.com` is used on the site. Create that Gmail account first (questionnaire Q46).
5. Keep `.env` private. Never commit it or send it in a public channel.
6. Serve the site over HTTPS so the login cookie is sent securely.

## Hosting

The site needs a host that runs Node and keeps files on disk, because uploads are stored in `uploads/` and data in `data/*.json`. Good options:
- Any small VPS (Hostinger, DigitalOcean, Lightsail): `npm install && npm start` (copy `.env` to the server) behind Nginx, with HTTPS from Let's Encrypt.
- Render or Railway **with a persistent disk** attached for `uploads/` and `data/`.

Back up `uploads/` and `data/` regularly.
