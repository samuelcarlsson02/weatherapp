## Weatherapp
Detta är ett projekt i kursen Flerplattformsapplikationer DA395A. Projektet är ett väderspel inspirerat av “Higher or Lower” där man ska gissa om temperaturen är högre eller lägre i olika städer. Spelet är byggt i React med Next.js, TypeScript, Tailwind och använder Geolocation samt Localstorage. Det använder två APIer, WeatherAPI för väderrelaterad information om städerna och Pexels för bilder på städerna.

## Hur du kör Weatherapp
1. Ladda ner projektet
2. Skapa en fil som heter .env i kärnmappen (watherapp om du inte har döpt om den)
3. Skapa en variable i .env som heter NEXT_PUBLIC_WEATHERAPI_KEY
4. Hämta en API-nyckel från [WeatherAPI](https://www.weatherapi.com/signup.aspx)
5. Sätt NEXT_PUBLIC_WEATHERAPI_KEY = din WeatherAPI-nyckel
6. Skapa en variable i .env som heter NEXT_PUBLIC_PEXELS_API_KEY
7. Hämta en API-nyckel från [Pexels](https://www.pexels.com/join-contributor/?redirect_to=%2F)
8. Sätt NEXT_PUBLIC_PEXELS_API_KEY = din Pexels-nyckel
9. Se till att du har senaste versionen av [Node.js] (https://nodejs.org/en/download)
10. Kör "npm install" i konsolen för kärnmappen
11. Kör sedan "npm run dev" i konsolen för kärnmappen
12. Öppna den localhost som konsolen visar
13. Sedan är det bara att leka runt!

## Redan bekanta med React
Vi har redan en praktisk erfarenhet av React, vilket gör att vi kan sätta igång direkt utan att behöva lära oss grunderna. Detta passade oss väldigt bra då vi har ett ganska pressat schema med skrivandet av kandidatuppsatsen parallellt och därmed sparar vi mycket tid.  


## Störst på arbetsmarknaden, större än både Angular och Vue
En genomgång av Devjobsscanner.com visade att av 250 000 front-end jobbannonser visar att React dominerar jobbmarknaden 126 000 annonser (cirka 52%), medan Angular landar på 87 000 och Vue på 24 000 [1].

## Varför React över Angular?
Enligt Index.dev har React en mycket snabbare inlärningskurva och är mer anpassningsbar än Angular. React komponent-modell påminner lite om objektorienterad programmering vilket vi har goda kunskaper i redan, medan Angular är ett mer omfattande ramverk som kräver en betydligt längre upplärning. Dessutom är React modulärt. Vi kan plocka de verktyg som passar oss bäst, medan Angular levererar ett mer “allt i ett paket” som då är mer anpassat för stora projekt [2].


## Varför React över Vue?
Vi valde React över Vue därför att det ger oss en mer långsiktig trygghet än Vue. React har ett välfinansierat ekosystem tack vare att Meta driver ramverket. Vue, däremot, är huvudsakligen ett community-drivet projekt utan en större företagsbackning. Framtida finansiering och utveckling vilar därför på donationer/sponsorer och frivilliga insatser, vilket gör den långsiktiga underhållssäkerheten mer osäker [3].

[1] https://www.devjobsscanner.com/blog/the-most-demanded-frontend-frameworks/ 

[2] https://www.index.dev/blog/react-vs-angular-which-frontend-framework-is-right-for-your-project 

[3] https://strapi.io/blog/vue-vs-react
