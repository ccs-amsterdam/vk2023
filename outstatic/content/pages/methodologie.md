---
title: 'Methodologie'
status: 'published'
author:
  name: 'Kasper Welbers'
  picture: ''
slug: 'methodologie'
description: 'Beschrijving van methodologie'
coverImage: ''
publishedAt: '2023-09-21T04:35:07.000Z'
---

## Opinie-onderzoek

Om in kaart te brengen hoe Nederlanders hun standpunten over politiek vormen, ondervragen wij een groep respondenten vanaf midden januari tot aan de verkiezingen van 17 maart. Hiervoor werken wij samen met Kieskompas. In deze eerste *wave* hebben wij een steekproef getrokken van 2.400 respondenten, representatief op de variabelen geslacht, leeftijd, opleidingsniveau, en Nielsen regio’s (Noord, Oost, Zuid, West en 3 grote steden). In de opvolgende waves van het vragenlijstonderzoek worden alle respondenten uit de eerste *wave* benaderd. Het aantal respondenten in de opvolgende waves varieert. In de eerste opvolgende wave waren dit 1.600 respondenten.

In het codeboek staan alle vragen die in de verschillende waves gesteld worden. In iedere wave worden de respondenten ondervraagd naar hun stemkeuze, welke politieke partijen en politici hen opgevallen zijn in de media, alsmede hun media gebruik. Daarnaast worden in iedere wave enkele vragen over verschillende politieke onderwerpen gevraagd.

**Representativiteit:** Om de resultaten generaliseerbaar te maken voor stemgerechtigde inwoners van Nederland, voert Kieskompas in opdracht van de VU een weging uit op de resultaten van het onderzoek. Hierbij wordt gebruikt gemaakt van een iteratieve poststratificatiemethode op basis van verschillende populatie-eigenschappen. Er wordt gewogen met zogenaamde joint distributions. De eerste komt uit de Gouden Standaard van CBS (leeftijd, geslacht, opleiding, migratie-achtergrond).

De tweede verdeling betreft de gemeentelijke verkiezingsresultaten van de Tweede Kamerverkiezingen in maart 2021 (bron: verkiezingsuitslagen.nl van de Kiesraad), die omgevormd worden tot de verkiezingsresultaten per Nielsen-regio. Hierbij wordt elke zetelende partij afzonderlijk gewogen, net als alle andere partijen samen, blanco-stemmers, niet-stemmers en mensen die niet mochten stemmen.

Vervolgens worden de toegekende gewichten getrimd op het 99,5e percentiel, waarbij de maximale foutenmarge op de volledige dataset 3.5% bedraagt.

## Verkiezingsprogramma's

De verkiezingsprogramma's van de verschillende partijen hebben wij (als tekstbestanden) in de computer geladen en verrijkt met twee extra gegevens:

- Het **onderwerp** van elke alinea (op basis van een [BERT model ](https://huggingface.co/manifesto-project/manifestoberta-xlm-roberta-56policy-topics-context-2023-1-1)gepubliceerd door het [Comparative Manifesto Project](https://manifesto-project.wzb.eu/), met toevegoegd een [model voor het bepalen van relevantie](https://huggingface.co/joris/manifesto-dutch-binary-relevance) van de Data School in samenwerking met de Groene Amsterdammer)

- Het noemen van bepaalde \*\*maatschappelijke groepen \*\*in de tekst, op basis van een trefwoordenlijst (dictionary) oorspronkelijk samengesteld door Alona Dolinsky (samen met Lena Maria Huber en Will Horne)

Alle broncode hiervan staat op [github](https://github.com/vanatteveldt/2023-manifestos-nl)

## Media-analyse

Naast het opinie-onderzoek werken we aan een automatische en handmatige analyse van de (geschreven) pers.

