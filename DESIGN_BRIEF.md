# De Atlas · ontwerp- en implementatiebrief

## De verbeterde prompt

Maak een productieklare persoonlijke website voor Jonathan Núñez Dhondt met de naam **De Atlas**.

De site is een rustige, precieze plek voor het werk dat ik bouw, de dingen die ik uitzoek en de vragen waar ik op blijf terugkomen. Mijn persoonlijkheid moet zichtbaar worden in de keuzes van de site, niet in een hoop symbolen, grote claims of tijdelijke projecten.

### Persoon en toon

Jonathan is een pragmatische bouwer die ook op de vorm let. Hij houdt van systemen die verwarring verminderen, diepgang zonder theater en mooi werk dat ergens voor dient. Hij is technisch ingesteld, denkt graag na voor hij begint en heeft weinig geduld voor complexiteit die niets oplost.

De site moet:

- rustig zijn zonder leeg aan te voelen;
- precies zijn zonder klinisch te worden;
- persoonlijk zijn zonder een toneelstuk te worden;
- filmisch zijn zonder onbruikbaar te worden;
- zichtbaar in opbouw zijn, omdat het werk nog verandert.

### Visuele hiërarchie

Gebruik één hoofdmetafoor: **het in kaart brengen van complexe systemen**.

- De video geeft de wereld en de sfeer.
- De SVG-route is de kaart en verbindt de onderdelen van de site.
- Beweging reageert beperkt op de bezoeker.
- Semantische HTML bevat de identiteit, inhoud en links.

De aangeleverde stadsvideo bevat een gouden netwerk. Gebruik die als opening, niet als een achtergrond die eindeloos blijft loopen. Laat de video één keer afspelen, houd het laatste beeld vast en laat daarna een echte route naar het werk zichtbaar worden.

### Visuele richting

- donker houtskool in de hero met warme, botkleurige tekst;
- oud goud als enige opvallende accentkleur;
- diep blauwzwart voor de notities;
- een sterke redactionele serif voor grote tekst;
- een eenvoudige sans-serif en compacte monospace voor metadata;
- dunne lijnen, veel ruimte en een asymmetrische maar gecontroleerde opbouw;
- geen neon, regenboogvloeistof, glassmorphism, nepstatistieken, generieke kaarten, custom cursor, typewriter-effect of dashboardrommel.

### Inhoudelijke hiërarchie

De eerste viewport moet snel antwoord geven op drie vragen:

1. Wie is dit?
2. Waar werkt hij aan?
3. Waar kan ik het werk bekijken?

Eerste copy:

```text
JND / DE ATLAS / DEEL 01

Ik breng complexe systemen in kaart
en bouw dingen die werken.

Technische student en bouwer uit Gent. Ik werk aan
agentsystemen, applicatiebeveiliging en praktische webproducten.

BEKIJK HET WERK ↓
```

Ga daarna van sfeer naar werk:

- waar ik nu aan werk;
- veldnotities;
- wie ik ben en hoe ik werk;
- een directe contactmogelijkheid.

Gebruik alleen projectnamen, links, resultaten en statussen die gecontroleerd zijn. Zet onderzoek dat nog loopt op `IN OPBOUW`. Maak van gepland werk geen afgewerkte casestudy.

### Technische vereisten

Gebruik Astro voor de statische basis. Houd de pagina semantisch en licht. Begin met native CSS, SVG en een kleine hoeveelheid JavaScript in de browser. Een eventuele WebGL- of Liquid-laag is extra aankleding en mag nooit de H1, navigatie, CTA of projectinformatie bevatten.

De site moet bevatten:

- een poster die meteen als fallback beschikbaar is;
- ondersteuning voor `prefers-reduced-motion`;
- zichtbare focus states voor toetsenbordgebruik;
- echte links en semantische landmarks;
- een responsieve uitsnede van de video;
- een responsieve SVG-route die op mobiel terugvalt op een verticale lijn;
- geen overname van het scrollgedrag;
- geen verzonnen cijfers over prestaties;
- een gecontroleerde productiebuild en browsercontrole.

Stop niet bij een visuele mockup. Start de site, bekijk desktop en mobiel, controleer de browserconsole, test minder beweging en noteer alleen wat ook echt gecontroleerd is.
