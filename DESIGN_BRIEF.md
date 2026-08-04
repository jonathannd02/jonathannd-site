# De Atlas · ontwerp- en implementatiebrief

### Persoon en toon

Jonathan is een pragmatische bouwer die ook op de vorm let. Hij houdt van systemen die verwarring verminderen, diepgang zonder theater en mooi werk dat ergens voor dient. Hij is technisch ingesteld, denkt graag na voor hij begint en heeft weinig geduld voor complexiteit die niets oplost.

De site moet:

- rustig zijn zonder leeg aan te voelen;
- persoonlijk zijn zonder een toneelstuk te worden;
- filmisch zijn zonder onbruikbaar te worden;
- zichtbaar in opbouw zijn, omdat het werk nog verandert.

### Visuele hiërarchie

- De stadsvideo geeft de wereld en de sfeer, in de hero teruggebracht tot zwart en donker bloedrood.
- Bayer-dither overlays (Canvas 2D) geven de hero een volledige tweekleurige behandeling en het about-portret een beperkte, pointer-gevoelige textuur.

### Visuele richting

- zwart en donker bloedrood in de hero met warme, botkleurige tekst;
- oud goud als accentkleur voor typografie en interactie;
- ossenbloedzwart voor de notities en de contactsectie, geen koud blauw;
- Grenze (variabel, zelf gehost) als redactionele semi-serif voor koppen en lopende tekst; gewicht 600 voor koppen, 400 voor tekst;
- Grenze Gotisch alleen als embleem: het woordmerk en het grote dossiernummer, nooit voor lopende koppen, omdat de gotische hoofdletter I als D leest;
- IBM Plex Mono voor metadata, labels, code en paginering;
- tekstkleuren komen uit vaste tokens (bone, bone-muted, bone-quiet, bone-dim, ink-muted, ink-dim, gold, bloedreeks) en halen minimaal WCAG AA op hun eigen ondergrond;
- optionele Canvas 2D dither als filmische beeldbehandeling, niet als speeltje;
- geen neon, regenboogvloeistof, glassmorphism, nepstatistieken, generieke kaarten, custom cursor, typewriter-effect, scroll-hijacking of dashboardrommel.

### Veldnotities

- Gepubliceerde veldnotities zijn statisch gegenereerde artikelen onder `/notities/[slug]/`, gevoed door de Astro-contentcollectie in `src/content/notities/`.
- De artikelcover gebruikt zwart, donker bloedrood, een rastertoon en een groot dossiernummer; de hoofdtekst blijft op botkleurig papier voor langdurige leesbaarheid.
- Manga-invloed komt uit ritme: genummerde scènes, brede bewijsfragmenten, één donkere page-turn en een naschrift. De semantische leesvolgorde blijft lineair en bruikbaar zonder JavaScript.
- De notitielijst op de startpagina toont alleen werkelijk gepubliceerde content en linkt naar dezelfde collectie; titels en metadata worden niet dubbel bijgehouden.

### Technische vereisten

Gebruik Astro voor de statische basis. Houd alle pagina's semantisch en licht. Begin met native CSS en een kleine hoeveelheid TypeScript in de browser. Canvas 2D dither is optionele aankleding en mag nooit de H1, navigatie, CTA of projectinformatie bevatten. Vermijd WebGL of zwaardere effectlagen tenzij ze dezelfde progressive-enhancement-regel respecteren.

De site moet bevatten:

- een poster die meteen als fallback beschikbaar is;
- ondersteuning voor `prefers-reduced-motion` (video pauzeren/verbergen, dither uitschakelen, reveals direct tonen);
- zichtbare focus states voor toetsenbordgebruik;
- echte links en semantische landmarks;
- een responsieve uitsnede van de video;
- hero- en portret-dither overlays die zonder JavaScript gewoon verdwijnen;
- geen overname van het scrollgedrag;
- geen verzonnen cijfers over prestaties;
- een gecontroleerde productiebuild en browsercontrole.

Stop niet bij een visuele mockup. Start de site, bekijk desktop en mobiel, controleer de browserconsole, test minder beweging en noteer alleen wat ook echt gecontroleerd is.
