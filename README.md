# Svrčuge — Od svjetla do života

Pre-campaign landing page za razvoj sela **Svrčuge** (zaleđe Herceg Novog).
Glavni cilj v1: **prikupljanje e-mail adresa** prije crowdfunding kampanje.

Stack: **Next.js 16 (App Router) · TypeScript · Tailwind CSS** · statički generisan, mobile-first, 5 jezika.

---

## Pokretanje

```bash
npm install
npm run dev      # http://localhost:3000  (preusmjerava na /me)
```

Produkcija:

```bash
npm run build
npm start
```

Deploy: spremno za **Vercel** (samo poveži repo). Postavi env varijable iz `.env.example`.

---

## Jezici

Pet jezika, primarni je crnogorski:

| URL    | Jezik              |
| ------ | ------------------ |
| `/me`  | Crnogorski (primarni) |
| `/en`  | Engleski           |
| `/fr`  | Francuski          |
| `/ru`  | Ruski              |
| `/de`  | Njemački           |

`/` automatski vodi na `/me`. Language switcher je u headeru.

---

## Gdje se šta mijenja

### ✏️ Tekstovi i prevodi

Sav tekst je odvojen od koda, u **`src/locales/<jezik>.json`**:

```
src/locales/me.json   ← izvor istine (crnogorski)
src/locales/en.json
src/locales/fr.json
src/locales/ru.json
src/locales/de.json
```

- Da promijeniš tekst → uredi vrijednost u JSON-u (ne diraj ključeve).
- Svi fajlovi imaju **istu strukturu** — kad dodaš/promijeniš ključ u `me.json`,
  dodaj ga i u ostale.
- Da dodaš novi jezik → dodaj kod u `LOCALES` u `src/lib/i18n.ts` i napravi novi `<kod>.json`.

### 🧩 Sekcije i izgled

Komponente su u `src/components/`. Homepage ih sastavlja u
`src/app/[locale]/page.tsx` (lako mijenjaš redoslijed sekcija).

Boje, fontovi i stil: `tailwind.config.ts` + `src/app/globals.css`.

### 🖼️ Ilustracije

Full-width ilustracije (crtani, topli stil — generisane preko Nano Banana 2)
žive u `public/illustrations/`:

| Fajl | Gdje se koristi |
| --- | --- |
| `hero.webp` | Hero — ilustrovana mapa sela (puna širina) |
| `story.webp` | „Kako je sve počelo" — svjetlo Pariz → selo |
| `vision.webp` | „Novo malo izletište" — živo selo |
| `community.webp` | „Zid prijatelja" — krug prijatelja |

Da zamijeniš sliku → ubaci novi `.webp` istog imena (ili promijeni `src` u
[Hero.tsx](src/components/Hero.tsx) / [Sections.tsx](src/components/Sections.tsx)).
Slike su namjerno common `<img>` (već optimizovan webp), ne `next/image`, radi
brzine i jednostavnosti. Tekst preko slika čita se zahvaljujući gradijent-scrim sloju.

### 📧 E-mail integracija (MailerLite / Brevo / Mailchimp)

Forma **već radi** bez ikakvog ključa — lead-ovi se loguju u server konzolu.
Pravo povezivanje se dodaje na **jednom mjestu**: `src/lib/mailing.ts`
(otkomentariši blok za platformu koju koristiš i dodaj ključ u `.env.local`).

API rute:
- `POST /api/subscribe` — glavna forma + prvi krug (validira e-mail i GDPR saglasnost)
- `POST /api/partner` — partneri / sponzori / volonteri

Tagovi za segmentaciju (jezik, država, `first-circle`, `prelaunch`, `can-share`)
grade se u `buildTags()` u istom fajlu.

### 🚀 Crowdfunding link (Faza 2)

Kada kampanja krene, popuni `NEXT_PUBLIC_CAMPAIGN_URL` u `.env.local`.
Helper `CAMPAIGN_LIVE` u `src/lib/config.ts` je spreman da prebaci sajt iz
"pre-launch" u "live" režim (npr. "Doniraj sada" dugmad).

---

## Struktura

```
src/
  app/
    layout.tsx              # root (fontovi, <html>)
    page.tsx                # / → /me redirect
    [locale]/
      layout.tsx            # SEO metadata + hreflang po jeziku
      page.tsx              # homepage (sastavlja sve sekcije)
      hvala/page.tsx        # thank-you stranica (nakon prijave)
      privatnost/page.tsx   # Politika privatnosti
      uslovi/page.tsx       # Uslovi / Disclaimer
    api/
      subscribe/route.ts    # e-mail capture
      partner/route.ts      # partner forma
    opengraph-image.tsx     # dinamička OG slika (1200×630)
    sitemap.ts · robots.ts
  components/               # Header, Hero, Sections, forme, Footer...
  lib/
    i18n.ts                 # jezici + učitavanje rječnika
    mailing.ts              # ★ ovdje se povezuje e-mail servis
    config.ts               # SITE_URL, CAMPAIGN_URL, social/kontakt
  locales/                  # ★ svi tekstovi (me/en/fr/ru/de)
```

---

## SEO

- `title` / `description` / Open Graph po jeziku (`[locale]/layout.tsx`)
- `hreflang` alternate za svih 5 jezika
- dinamička OG slika (`opengraph-image.tsx`)
- `sitemap.xml` i `robots.txt` automatski

Prije produkcije postavi pravi `NEXT_PUBLIC_SITE_URL` (npr. `https://www.svrcuge.me`)
i provjeri kontakt/social linkove u `src/lib/config.ts`.

## Napomena

Pravne stranice (privatnost, uslovi) su za v1 na crnogorskom. Lako se prevode
po istom obrascu kao homepage kad zatreba.
