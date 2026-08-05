---
title: Wat de buitenkant je niet vertelt
description: Over zichtbare interfaces, onzichtbare vertrouwensgrenzen en de vraag waar een systeem werkelijk beslist.
number: '01'
category: Beveiliging
published: 2026-08-04
---

Een interface kan rustig, beperkt en logisch aanvoelen terwijl het onderliggende systeem veel meer accepteert. Wie alleen naar de buitenkant kijkt, ziet het ontwerp. Wie de grens onderzoekt, ziet de beslissingen.

## 01 / De zichtbare grens

Een formulier toont welke velden iemand mag invullen. Een knop suggereert welke handeling beschikbaar is. Een verborgen menu lijkt te zeggen dat een functie buiten bereik ligt. Dat is nuttige communicatie, maar geen bewijs van een beveiligingsgrens.

De browser bezit uiteindelijk verzoeken, parameters en lokale toestand. Alles wat daar wordt beperkt, kan opnieuw worden samengesteld. Niet noodzakelijk met ingewikkelde gereedschappen: vaak volstaat het om één bestaand verzoek te bekijken en één waarde te veranderen.

Daarom begin ik niet met de vraag _wat toont de interface?_, maar met drie andere vragen:

1. Welke identiteit doet het verzoek?
2. Over welke resource wordt beslist?
3. Waar controleert de server of die combinatie is toegestaan?

### Bewijsfragment / 01

Onderstaand verzoek is bewust fictief. Het interessante deel is niet de precieze route, maar het verschil tussen een veld valideren en een handeling autoriseren.

```http
PATCH /api/projects/184/members/27
Content-Type: application/json

{
  "role": "owner"
}
```

Een server kan correct vaststellen dat `owner` een geldige rol is en het verzoek toch verkeerd behandelen. De ontbrekende vraag is dan niet of de invoer geldig is, maar of de huidige gebruiker binnen project `184` de rol van lid `27` mag veranderen.

Dat is een andere beslissing. Ze vereist identiteit, context en beleid—niet alleen een geldig JSON-object.

## 02 / De echte grens

Een vertrouwensgrens ligt op de plek waar onbetrouwbare informatie wordt omgezet in een beslissing met gevolgen. Bij een webapplicatie gebeurt dat meestal wanneer de server een resource leest, wijzigt of vrijgeeft.

De route, controller of functie hoeft zelf niet alle regels te bevatten. Maar er moet wel één betrouwbare keten bestaan:

```text
verzoek → identiteit → resource → autorisatie → wijziging → audit
```

Wanneer één stap impliciet wordt, ontstaat ruimte voor aannames. Een resource-id uit de URL wordt vertrouwd omdat hij door de eigen interface is gegenereerd. Een rol uit de body wordt geaccepteerd omdat de dropdown alleen bekende waarden toont. Een beheerroute wordt verborgen, maar blijft technisch bereikbaar.

> DE CLIENT IS GEEN BEVEILIGINGSGRENS. HIJ IS EEN VERZOEK.

Dat betekent niet dat clientvalidatie nutteloos is. Ze maakt fouten sneller zichtbaar en de ervaring begrijpelijker. Ze mag alleen nooit de enige plaats zijn waar een belangrijke regel bestaat.

## 03 / Kijk naar overgangen

Losse componenten vertellen zelden het volledige verhaal. De interessantste fouten verschijnen in de overgang tussen twee onderdelen: van interface naar API, van identiteit naar resource, van geldige invoer naar toegestane actie.

Ik zou zo’n grens in deze volgorde onderzoeken:

1. **Leg het normale pad vast.** Voer de handeling uit zoals de interface ze bedoelt en noteer route, methode, identiteit en resource.
2. **Verander één aanname.** Wissel bijvoorbeeld alleen de resource-id of alleen de gevraagde rol. Meerdere wijzigingen tegelijk maken de uitkomst moeilijker te verklaren.
3. **Vergelijk de beslissing.** Kijk niet alleen naar de statuscode, maar ook naar de uiteindelijke toestand van de resource.
4. **Controleer mislukking.** Een geweigerd verzoek moet niets gedeeltelijk wijzigen en mag geen gevoelige context lekken.
5. **Herhaal naast de grens.** Test een eigen resource, een vreemde resource en een resource die niet bestaat. Die drie gevallen horen bewust van elkaar te verschillen.

Het doel is niet zoveel mogelijk afwijkende verzoeken produceren. Het doel is het beslismodel reconstrueren: welke informatie vertrouwt het systeem, waar wordt beleid toegepast en wat gebeurt er wanneer een aanname niet klopt?

## 04 / Maak mislukking zichtbaar

Een goede grens weigert niet alleen correct; ze maakt ook duidelijk genoeg _waarom_ iets intern werd geweigerd. Voor de gebruiker kan een compacte foutmelding volstaan. Voor de bouwer zijn consistente logs, een herkenbare beslisroute en tests rond autorisatie belangrijker.

Dat voorkomt twee tegengestelde problemen. Zonder observatie blijft een fout maanden onzichtbaar. Met te veel detail in de publieke response krijgt een aanvaller informatie die daar niet hoort. De buitenkant en de binnenkant hebben dus elk een andere taak:

- buiten: voorspelbaar, beperkt en zonder gevoelige details;
- binnen: traceerbaar, specifiek en gekoppeld aan identiteit en resource;
- in de data: geen gedeeltelijke wijziging na een geweigerde actie.

---

## Naschrift / Wat ik meeneem

- Een verborgen knop is een ontwerpbeslissing, geen autorisatiecontrole.
- Geldige invoer en toegestane acties zijn twee verschillende vragen.
- Test de overgang tussen identiteit, resource en beleid.
- Controleer niet alleen de response, maar ook de toestand na mislukking.
- Bouw interne zichtbaarheid zonder publieke foutmeldingen informatie te laten lekken.

De buitenkant blijft belangrijk. Ze helpt mensen begrijpen wat een systeem van hen verwacht. Maar pas achter die buitenkant wordt beslist wat het systeem werkelijk toelaat.
