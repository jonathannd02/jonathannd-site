# Jonathan ND · De Atlas

Een persoonlijke atlas voor software, beveiliging, systemen en de vragen waar ik op blijf terugkomen.

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

## Bestanden

De hero gebruikt `public/media/atlas.mp4` en `public/media/atlas-poster.jpg`.
De video is 1280×720, duurt ongeveer vier seconden en gebruikt H.264. De poster is het laatste beeld van de video en wordt gebruikt bij minder beweging, op mobiele schermen en wanneer het afspelen mislukt.

Voor de site online gaat:

- vervang de tijdelijke GitHub-link in `src/pages/index.astro` door het contactkanaal dat je wilt gebruiken;
- voeg alleen gecontroleerde projectlinks en statussen toe;
- voeg het productiedomein en de canonical URL toe aan de layout;
- maak een echte social preview als de SVG-preview niet volstaat;
- test de uitsnede van de video op de apparaten waarop de site moet werken.
