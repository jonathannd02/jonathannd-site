# Jonathan ND / Notities

Een blogachtige persoonlijke site voor notities over software, beveiliging, agents en systemen.

## Lokaal ontwikkelen

```bash
npm install
npm run dev
```

De productieversie bouwen en lokaal serveren:

```bash
npm run check
npm run build
npm run preview
```

## Structuur

De homepage begint met `public/media/atlas.mp4` als schermvullende intro en `public/media/atlas-poster.jpg` als fallback. De video speelt één keer volledig af en blijft daarna op het laatste beeld staan. Alleen een klik op de intro of `Intro overslaan` toont de blogindex.

De blogindex in `src/pages/index.astro` toont gepubliceerde notities uit `src/content/notities/` en lokale ideeën die expliciet als `in opbouw` of `werkprincipe` zijn gemarkeerd. Alleen gepubliceerde notities krijgen een link.

Gepubliceerde artikelen worden statisch opgebouwd onder `/notities/[slug]/` met `src/layouts/NoteLayout.astro`. De inhoudsschema's staan in `src/content.config.ts`. Grenze en IBM Plex Mono worden self-hosted vanuit `public/fonts/`.

## Een nieuwe notitie maken

Maak alleen een Markdown-bestand in `src/content/notities/`. De bestandsnaam wordt de URL-slug. Kopieer dit vaste frontmatter-formaat:

```md
---
title: Een duidelijke titel
description: Eén zin die de notitie samenvat.
number: '02'
category: Beveiliging
published: 2026-08-05
---

De eerste alinea wordt de inleiding.

## Een tussenkop

De rest van de notitie.
```

Wil je een eigen coverafbeelding, zet dan één afbeelding naast het Markdown-bestand met exact dezelfde bestandsnaam:

```text
src/content/notities/
├── mijn-notitie.md
└── mijn-notitie.webp
```

Voeg in dat geval ook `coverAlt: Een korte, feitelijke beschrijving.` toe aan de frontmatter. Zonder afbeelding gebruikt de site automatisch de bestaande poster als fallback. De build faalt wanneer er meerdere afbeeldingen met dezelfde naam zijn of wanneer `coverAlt` ontbreekt.

Voor de site online gaat:

- vervang de GitHub-link in `src/pages/index.astro` door het contactkanaal dat je wilt gebruiken;
- voeg alleen echte notities en gecontroleerde links toe;
- voeg het productiedomein en de canonical URL toe aan de layout;
- controleer de video-uitsnede op de apparaten waarop de site moet werken;
- controleer zowel de homepage als minstens één `/notities/[slug]/`-pagina in de production preview.