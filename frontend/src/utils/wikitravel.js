const randomCities = [
    "Linlithgow", "Palisades", "Port au Port Peninsula", "Padua", "Biella", "Armstrong Redwoods State Natural Reserve", "Solingen", "Hartz Mountains National Park",
    "Wigan", "Radal Siete Tazas National Park", "Stein bei Nürnberg", "San Juan del Sur", "Wells Gray Provincial Park", "Pembroke (Wales)", "Bobigny", "Oberursel",
    "Ballarat", "Pula", "Eidfjord", "Lich", "Torotoro National Park", "Mannheim", "Canon del Sumidero", "Sanremo", "Heppenheim", "Fuzhou", "Huashan National Park",
    "Jaú", "Aigues-Mortes", "Bad Wildbad", "Tay Ninh", "Crisana", "Bydgoszcz", "Costa Teguise", "Fréjus", "Bihar", "Troyes", "Luray", "Tepic", "Hradec Kralove",
    "Rocky Mountaineer", "Bicester", "Sakura", "Saltaire", "Coolah Tops National Park", "Vişeu de Sus", "Sombrerete", "Papa", "Canyoning", "Forli", "Hammarland", "Armenia",
    "Franz Josef", "Darlington", "Toyohashi", "Minsk Region", "Machu Picchu", "Serrana (Rio de Janeiro)", "Tumanyan", "Kuta", "Coburg", "Gualaca", "Friedberg (Hesse)",
    "Folly Beach", "Southwestern Colorado", "Malinao", "Boa Nova National Park", "Malaysia", "Morpeth (England)", "Hluboká nad Vltavou", "Ainsa", "Avallon", "Aculco", "Lucca",
    "Mountain Pine Ridge", "Zhangjiajie National Forest Park", "Taroko Gorge", "The Horseshoe", "Aneho", "Ryde", "Nakhon Si Thammarat", "South Central Colorado",
    "Twante", "Torrevieja", "Burren", "Carini", "Menghai", "Lucerne", "Antsiranana", "New Denver", "Portarlington", "Jeongdongjin", "Rougemont", "Nakhon Pathom", "Cologne Lowland",
    "Putrajaya", "Charleville-Mézières", "Worms", "Chacaltaya", "Seligenstadt", "Saronno", "Slovak Paradise National Park", "Central Province (Sri Lanka)", "Dawsonville",
    "Pantalica", "Pocono Mountains", "Araucanía", "Chicopee", "Tsavo West National Park", "Introdacqua", "East Midlands", "Bedford (Virginia)", "Karlskrona",
    "Boxmeer", "Barnsley", "Iasi", "Maryland", "Laufenburg", "Shimla", "Lubin", "Jvari", "Capul", "Asti", "Sassari", "Vernet-les-Bains", "Kvam", "Trbovlje"
];

const RANDOM = "https://en.wikivoyage.org/api/rest_v1/page/random/summary/";
const CITY_BASE = "https://en.wikivoyage.org/api/rest_v1/page/summary/";
const BASE_URL = "https://en.wikivoyage.org/w/api.php";

export default async function getDestinations(cityName, requestedCities) {
    if (cityName == null) { // Give requestedCities number of random cities
        let cities = [];
        for (let i = 0; i < requestedCities; i++) {
            const randomCity = randomCities[Math.floor(Math.random() * randomCities.length)];
            cities[i] = getCity(randomCity);
        }

        cities = await Promise.all(cities);

        // If only one city was requested, don't return it in an array. Just return the city object
        if (requestedCities == 1) {
            return cities[0];
        } else {
            return cities;
        }

    } else if (Array.isArray(cityName)) { // If multiple city names were requested, return an array of city objects
        let cities = [];
        for (let i = 0; i < cityName.length; i++) {
            cities[i] = getCity(cityName[i]);
        }

        cities = await Promise.all(cities);

        return cities;
    } else {
        return getCity(cityName);
    }
}

async function getCity(cityName) {
    // Build the search path and fetch its data
    const searchPath = CITY_BASE + cityName;
    const res = await fetch(searchPath);
    const data = await res.json();

    // Get the country associated with this cities pageId
    const country = await getCountryByCityId(data.wikibase_item);

    return ({
        description: data.description,
        extract: data.extract,
        thumbnail: data.thumbnail.source,
        title: data.title,
        pageId: data.wikibase_item,
        country: country,
    });
}

// Given a pageId, attempts to find a country associated with it. If none is found, or none is higher ranking than the others, return null.
// Otherwise, return the country name as a string.
async function getCountryByCityId(pageId) {
    // Build the search path and get its data
    let url = new URL("https://www.wikidata.org/w/api.php");
    url.search = new URLSearchParams({
        action: "wbgetentities",
        ids: pageId,
        props: "claims",
        format: "json",
        origin: "*",
    });
    let res = await fetch(url);
    let data = await res.json();

    // Pull the countryId number from the pages
    const countryList = data.entities[pageId].claims.P17; // Bracket notation because pageId is a string; P17 is where country associations are stored
    let countryId = null;

    if (countryList?.length == 1) {
        countryId = countryList[0].mainsnak.datavalue.value.id;
    } else if (countryList?.length > 1) { // If there is more than one country listed, find one marked "preferred"
        countryId = countryList.find(country => country.rank === "preferred")?.mainsnak.datavalue.value.id;
    } else { // If there is more than one country listed and none are marked "preferred", return null
        return null;
    }

    // Search for pages associated with the countryId
    url = new URL("https://www.wikidata.org/w/api.php");
    url.search = new URLSearchParams({
        action: "wbgetentities",
        ids: countryId,
        props: "sitelinks",
        format: "json",
        origin: "*",
    });
    res = await fetch(url);
    data = await res.json();

    const countryName = data.entities[countryId].sitelinks.enwiki.title;
    return countryName;
}