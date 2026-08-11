# CrashReport

**Safety-first vehicle accident claim assistant (Beta)**

사고 직후 안전 확인 → 사진 → 국가·보험사 서식 참고용 PDF.

> **Beta notice:** This app is a **claim support tool**, not an official insurer filing system. Final claims follow your insurer’s process. Not medical advice. Location/photos depend on device permissions. Data is stored mainly on-device and may be lost if the browser cache is cleared.

## Domain

- Target: **https://crashreport.uk** (register if available, ~$6/year class domains vary by registrar)

## Brand

- Name: **CrashReport**
- Colors: Navy `#0B1F3A` · Blue `#2563EB` · Amber `#F59E0B`

## Features

- Profile auto-fill (country template)
- Safety-first UX + emergency numbers
- OSM map pin → address
- Photo capture
- KR / US / UK / AU / JP reference templates
- Premium gate for PDF (demo unlock in beta)

## Local run

```bash
npx serve -l 3000
```

## Deploy to crashreport.uk (static hosting)

1. Register **crashreport.uk** at your registrar (Namecheap, Cloudflare, Google Domains successor, etc.).
2. Host static files (any one):
   - **Cloudflare Pages** (recommended with .uk): connect repo or upload `accident-report-app` folder
   - **Netlify** drag-and-drop the folder
   - **GitHub Pages** / **Vercel** static
3. Point DNS:
   - Cloudflare: nameservers as instructed, or CNAME `www` → pages host, A/AAAA root as required
4. Enable **HTTPS** (automatic on Pages/Netlify).
5. Open `https://crashreport.uk` — geolocation works best on HTTPS.

### Upload contents

Upload everything inside `accident-report-app/`:

- index.html, app.js, styles.css, manifest.json, sw.js
- icons, logo

### Beta checklist before public link

- [ ] Disclaimer visible on home
- [ ] HTTPS on
- [ ] Test emergency `tel:` on a real phone
- [ ] Test map pin + address on phone
- [ ] Privacy note: on-device storage

## Legal positioning (do not change in marketing)

- Claim **assistant / support tool**
- Not official insurer submission
- Not emergency or medical service
