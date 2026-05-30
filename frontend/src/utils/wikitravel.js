const RANDOM = "https://en.wikivoyage.org/api/rest_v1/page/random/summary/"; // for getDestinations
const CITY_BASE = "https://en.wikivoyage.org/api/rest_v1/page/summary/"; // for getDestinations
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
                thumbnail: data?.thumbnail?.source,
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

// Add the country name to the city object
async function getCountry(city) {
    // Look up the cities associated pages
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
    // Pull the countryId number from the associated pages
    const cityId = Object.keys(data.entities)[0];
    const countryList = data.entities[Object.keys(data.entities)[0]].claims.P17;
    let countryId = null
    if (countryList?.length == 1) {
        countryId = countryList[0].mainsnak.datavalue.value.id;
    } else {
        countryId = countryList?.find(country => country.rank === "preferred")?.mainsnak.datavalue.value.id;
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

    // Get the country page from the countryId
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
    
    // Return a city object with country name added
    return {
        description: city.description,
        extract: city.extract,
        thumbnail: city.thumbnail,
        title: city.title,
        pageId: city.wikibase_item,
        country: countryName,
    };
}