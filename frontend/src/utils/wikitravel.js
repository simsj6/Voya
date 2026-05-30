const RANDOM = "https://en.wikivoyage.org/api/rest_v1/page/random/summary/"; // for getDestinations
const CITY_BASE = "https://en.wikivoyage.org/api/rest_v1/page/summary/"; // for getDestinations
const COUNTRY_BASE = "https://en.wikivoyage.org/w/api.php"; // for getCountry
const BASE_URL = "https://en.wikivoyage.org/w/api.php"; // for getCity

export default async function getDestinations(cityName, requestedCities) {
    if (cityName == null) { // Give requestedCities number of random cities
        const cities = [];
        for (let i = 0; i < requestedCities; i++) {
            const search_path = RANDOM;
            const res = await fetch(search_path);
            const data = await res.json();
            cities[i] = {
                description: data.description,
                extract: data.extract,
                thumbnail: data.thumbnail.source,
                title: data.title,
                pageId: data.wikibase_item,
            };
            cities[i] = await getCountry(cities[i]);
        }
        return cities;
    } else { // Only give info on the specific city
        const search_path = CITY_BASE + cityName;
        const res = await fetch(search_path);
        const data = await res.json();
        const city = {
            description: data.description,
            extract: data.extract,
            thumbnail: data.thumbnail.source,
            title: data.title,
            pageId: data.wikibase_item,
        };
        return getCountry(city);
    }
}

async function getCountry(city) {
    // Lookup the country and add it to the city object, for now do nothing
    let props = "claims";
    let url = new URL("https://www.wikidata.org/w/api.php");
    url.search = new URLSearchParams({
        action: "wbgetentities",
        ids: city.pageId,
        props: props,
        format: "json",
        origin: "*",
    });
    let res = await fetch(url);
    let data = await res.json();

    const cityId = Object.keys(data.entities)[0];
    const countryList = data.entities[Object.keys(data.entities)[0]].claims.P17;
    let countryId = null
    if (countryList?.length == 1) {
        countryId = countryList[0].mainsnak.datavalue.value.id;
    } else {
        countryId = countryList.find(country => country.rank === "preferred")?.mainsnak.datavalue.value.id;
    }

    if (countryId == null) {
        return {
            description: city.description,
            extract: city.extract,
            thumbnail: city.thumbnail,
            title: city.title,
            pageId: city.wikibase_item,
            country: null,
        };
    }

    props = "sitelinks";
    url = new URL("https://www.wikidata.org/w/api.php");
    url.search = new URLSearchParams({
        action: "wbgetentities",
        ids: countryId,
        props: props,
        format: "json",
        origin: "*",
    });
    res = await fetch(url);
    data = await res.json();
    const countryName = data.entities[Object.keys(data.entities)[0]].sitelinks.enwiki.title;
    
    return {
        description: city.description,
        extract: city.extract,
        thumbnail: city.thumbnail,
        title: city.title,
        pageId: city.wikibase_item,
        country: countryName,
    };
}

// | prop          | What it returns                 |
// | ------------- | ------------------------------- |
// | `extracts`    | Intro/plain text summary        | KEEP
// | `info`        | Basic page metadata             | WORKING?
// | `pageprops`   | Extra metadata like Wikidata ID | KEEP
// | `images`      | Images used on page             | KEEP?
// | `imageinfo`   | Actual image URLs/details       | WORKING?
// | `links`       | Internal wiki links             | KEEP?
// | `extlinks`    | External URLs                   | REMOVE
// | `categories`  | Categories page belongs to      | REMOVE
// | `langlinks`   | Versions in other languages     | REMOVE
// | `revisions`   | Raw page content/history        | REMOVE
// | `templates`   | Templates used                  | REMOVE
// | `coordinates` | Geo coordinates (if available)  | REMOVE

// async function getCity(city) {
//     if (city == null) {
//         // pick random city from list, for now defualt to paris
//         city = "Paris";
//     }
//     const props = "extracts|info|pageprops|images|imageinfo|links";
//     const url = new URL(BASE_URL);
//     url.search = new URLSearchParams({
//         action: "query",
//         titles: city,
//         prop: props,
//         exintro: "1",
//         explaintext: "1",
//         format: "json",
//         origin: "*"
//     });
//     const res = await fetch(url);
//     const data = await res.json();
//     const cityData = {
//         description: data.description,
//         extract: data.extract,
//         thumbnail: data.thumbnail,
//         title: data.title,
//     }
//     console.log(data);
//     console.log(cityData);
//     return cityData;
// }