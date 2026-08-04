# JND / Notities · ontwerp- en implementatiebrief

## Richting

Maak van Jonathan Núñez Dhondt zijn persoonlijke site een eenvoudige blogachtige homepage. De video opent de site en houdt zijn laatste beeld vast; daarna volgt één sobere index met technische gedachten, veldnotities en onaf werk wanneer de bezoeker verdergaat.

De visuele richting leunt op twee inspiratiepunten:

- **Troof:** een eenvoudige index met onderwerpclusters en weinig presentatie eromheen;
- **Sean Goedecke:** een smalle redactionele feed met sterke titels, compacte metadata en een directe route naar recente posts.

De site moet rustig, precies en persoonlijk zijn. De filmische opening mag aandacht vragen, maar de blogindex moet daarna bijna verdwijnen.

## Inhoudelijke hiërarchie

De eerste viewport toont alleen de video, de poster en een lokale pointergloed die de originele videokleur vrijmaakt. De identiteit en de inhoud verschijnen pas daarna.

De homepage bestaat uit:

1. **Videoopening:** de video speelt één keer volledig af, houdt het laatste beeld vast en kan met elke klik worden overgeslagen;
2. **Schrijfindex:** een smalle lijst met echte publicaties en duidelijk gemarkeerde werknotities;
3. **Artikelen:** gepubliceerde veldnotities leven in de Astro-contentcollectie en hebben een echte route onder `/notities/[slug]/`.

Er zijn bewust geen aparte onderwerp-, portret-, contact- of over-secties op de homepage. Voeg pas nieuwe navigatie toe wanneer er echte inhoud en een echte route voor bestaat.

## Contentstatus

- Gepubliceerde veldnotities komen uit `src/content/notities/` en worden automatisch op de homepage getoond.
- De route en artikelpagina gebruiken dezelfde contentdata; titels en metadata worden niet dubbel bijgehouden.
- De twee huidige ideeën zonder volledige tekst blijven gewone tekst en krijgen geen nep-link.
- Gebruik `gepubliceerd`, `in opbouw` en `werkprincipe` alleen wanneer die status klopt.

## Nieuwe notities

Een nieuwe publicatie bestaat uit één Markdown-bestand in `src/content/notities/`. De bestandsnaam wordt de slug. Een optionele coverafbeelding staat naast dat bestand met exact dezelfde bestandsnaam en één van de ondersteunde extensies (`avif`, `jpeg`, `jpg`, `png`, `webp`). `coverAlt` is verplicht wanneer zo'n afbeelding bestaat. De layout ontdekt de afbeelding tijdens de build; een nieuwe notitie vraagt geen wijziging aan Astro-, CSS- of TypeScript-code.

## Visuele richting

- donker houtskool voor de video-opening;
- warm papier voor de schrijfindex;
- Grenze als redactionele serif voor titels en artikeltekst;
- IBM Plex Mono voor metadata en labels;
- oude goud- en bloedrode accenten uit de remote Atlas-richting;
- dunne lijnen, brede marges en één inhoudskolom;
- geen neon, glassmorphism, nepstatistieken, generieke kaarten, custom cursor, typewriter-effect of scroll-hijacking.

## Media en beweging

De video in `public/media/atlas.mp4` is ongeveer vier seconden lang. Toon hem bij binnenkomst schermvullend met `autoplay muted playsinline`, laat hem één keer afspelen en houd daarna het laatste beeld vast. Gebruik één originele videolaag met een begrensde Canvas-kleurlaag die uit hetzelfde videoframe wordt getekend en alleen rond de pointer zichtbaar is. Buiten de pointer blijft de native video monochroom. Toon de blogindex pas na een klik of via `Intro overslaan`. Gebruik `public/media/atlas-poster.jpg` als fallback en zet `loop` niet aan.

De volledige intro is klikbaar. Elke klik op de intro:

- pauzeert de video;
- stopt eventuele Canvas-animatie;
- verwijdert de tijdelijke scroll-lock;
- laat de intro uitfaden;
- brengt de bezoeker naar de notitie-index.

De kleine link `Intro overslaan` blijft beschikbaar voor toetsenbordgebruik. Bij `prefers-reduced-motion` wordt de intro direct overgeslagen. Zonder JavaScript blijft de blogindex bereikbaar onder de video.

## Technische vereisten

Gebruik Astro voor de statische basis. Houd de inhoud semantisch en licht. Gebruik native CSS en een kleine hoeveelheid browser-JavaScript. De actieve intro gebruikt geen Bayer-matrix; de pointergloed en originele-kleur-reveal blijven lokale lagen en mogen nooit de H1, navigatie, CTA, notitietekst of artikelinhoud bevatten.

Behoud:

- self-hosted Grenze- en IBM Plex Mono-fonts;
- de `notes`-contentcollectie en statische artikelroute;
- metadata voor website- en artikelpagina's;
- echte hash- en externe links;
- zichtbare focus states;
- poster fallback;
- reduced-motion gedrag;
- een productiepreview zonder consolefouten.

## Controle

Voer voor elke wijziging uit:

```bash
npm run check
npm run build
```

Controleer daarna in de productiepreview:

- intro vóór het einde van de video;
- klikken op de intro en op `Intro overslaan`;
- video-eindstatus, laatste frame en originele-kleur-reveal;
- de blogindex en de gepubliceerde notitielink;
- een echte `/notities/[slug]/`-pagina;
- desktop- en mobiele breedte;
- toetsenbordfocus, één H1 en reduced-motion gedrag;
- een lege browserconsole.

Stop niet bij een visuele mockup. Noteer alleen wat in de gebouwde site werkelijk gecontroleerd is.