/**
 * List of "random" cities
 * 
 * Good cities
 * 
 * Linlithgow, UK
 * Palisades, US
 * Port au Port Peninsula, Canada
 * Padua, Italy
 * Biella, Italy
 * Armstrong Redwoods State Natural Reserve, US
 * Solingen, Germany
 * Hartz Mountains National Park, Australia
 * Wigan, UK
 * Radal Siete Tazas National Park, Chile
 * Stein Bei Nurnberg, Germany
 * San Juan del Sur, Nicaragua
 * Wells Gray Provincial Park, Canada
 * Pembroke (Wales), UK
 * Bobigny, France
 * Oberursel, Germany
 * Ballarat, Australia
 * Pula, Croatia
 * Eidfjord, Norway
 * Lich, Germany
 * Torotoro National Park, Bolivia
 * Mannheim, Germany
 * Canon del Sumidero, Mexico
 * Sanremo, Italy
 * Heppenheim, Germany
 * Fuzhou, China
 * Huashan National Park, China
 * Jau, Brazil
 * Aigues-Mortes, France
 * Bad Wildbad, Germany
 * Tay Ninh, Vietnam
 * Crisana, Romania
 * Bydgoszcz, Poland
 * Costa Teguise, Spain
 * Frejus, France
 * Bihar, India
 * Troyes, France
 * Luray, US
 * Tepic, Mexico
 * Durham, UK
 * Hradec Kralove, Czech Republic
 * Rocky Mountaineer, Canada
 * Bicester, UK
 * Sakura, Japan
 * Saltaire, UK
 * Coolah Tops National Park, Australia
 * Viseu de Sus, Romania
 * Sombrerete, Mexico
 * Papa, Hungary
 * Canyoning
 * Forli, Italy
 * Hammarland, Finland
 * Armenia, Armenia
 * Franz Josef, New Zealand
 * Darlington, UK
 * Laufenberg, Germany
 * Toyohashi, Japan
 * Minsk Region, Belarus
 * Machu Picchu, Peru
 * Serrana (Rio de Janeiro), Brazil
 * Tumanyan, Armenia
 * Buta, Indonesia
 * Coburg, Germany
 * Gualaca, Panama
 * Friedberg (Hesse), Germany
 * Folly Beach, US
 * Southwestern Colorado, US
 * Malinao, Philippines
 * Boa Nova National Park, Brazil
 * Malaysia, Malaysia
 * Morpeth (England), UK
 * Hluboka nad Vltavou, Czech Republic
 * Ainsa, Spain
 * Avallon, France
 * Aculco, Mexico
 * Lucca, Italy
 * Mountain Pine Ridge, Belize
 * Zhangjiajie National Forest Park, China
 * Taroko Gorge, Taiwan
 * The Horseshoe, Indonesia
 * Aneho, Togo
 * Ryde, UK
 * Nakhon Si Thammarat, Thailand
 * South Central Colorado, US
 * Twante, Myanmar
 * Torrevieja, Spain
 * Burren, Republic of Ireland
 * Carini, Italy
 * Menghai, China
 * Lucerne, Switzerland
 * Antsiranana, Madagascar
 * New Denver, Canada
 * Portalington, Republic of Ireland
 * Jeongdongjin, South Korea
 * Rougemont, Canada
 * Nakhon Pathom, Thailand
 * Cologne Lowland, Germany
 * Putrajaya, Malayasia
 * Charleville-Mezieres, France
 * Worms, Germany
 * Chacaltaya, Bolivia
 * Seligenstadt, Germany
 * Saronno, Italy
 * Slovak Paradise National Park, Slovakia
 * Central Province (Sri Lanka), Sri Lanka
 * Dawsonville, US
 * Pantalica, Italy
 * Pocono Mountains, US
 * Araucania, Chile
 * Chicopee, US
 * Tsavo West National Park, Kenya
 * Introdacqua, Italy
 * East Midlands, UK
 * 
 * Okay cities
 * 
 * Bedford (Virginia), US
 * Karlskrona, Sweden
 * Boxmeer, Netherlands
 * Barnsley, UK
 * Iasi, Romania
 * Maryland, US
 * Laufenburg, Germany
 * Shimla, India
 * Lubin, Poland
 * Jvari, Georgia
 * Capul, Philippines
 * Asti, Italy
 * Sassari, Italy
 * Vernet-les-Bains, France
 * Kvam, Norway
 * Trbovlje, Slovenia
 */

const randomCities = [
    "Linlithgow", "Palisades", "Port au Port Peninsula", "Padua", "Biella", "Armstrong Redwoods State Natural Reserve", "Solingen", "Hartz Mountains National Park",
    "Wigan", "Radal Siete Tazas National Park", "Stein Bei Nurnberg", "San Juan del Sur", "Wells Gray Provincial Park", "Pembroke (Wales)", "Bobigny", "Oberursel",
    "Ballarat", "Pula", "Eidfjord", "Lich", "Torotoro National Park", "Mannheim", "Canon del Sumidero", "Sanremo", "Heppenheim", "Fuzhou", "Huashan National Park",
    "Jau", "Aigues-Mortes", "Bad Wildbad", "Tay Ninh", "Crisana", "Bydgoszcz", "Costa Teguise", "Frejus", "Bihar", "Troyes", "Luray", "Tepic", "Durham", "Hradec Kralove",
    "Rocky Mountaineer", "Bicester", "Sakura", "Saltaire", "Coolah Tops National Park", "Viseu de Sus", "Sombrerete", "Papa", "Canyoning", "Forli", "Hammarland", "Armenia",
    "Franz Josef", "Darlington", "Laufenberg", "Toyohashi", "Minsk Region", "Machu Picchu", "Serrana (Rio de Janeiro)", "Tumanyan", "Kuta", "Coburg", "Gualaca", "Friedberg (Hesse)",
    "Folly Beach", "Southwestern Colorado", "Malinao", "Boa Nova National Park", "Malaysia", "Morpeth (England)", "Hluboká nad Vltavou", "Ainsa", "Avallon", "Aculco", "Lucca",
    "Mountain Pine Ridge", "Zhangjiajie National Forest Park", "Taroko Gorge", "The Horseshoe", "Aneho", "Ryde", "Nakhon Si Thammarat", "South Central Colorado",
    "Twante", "Torrevieja", "Burren", "Carini", "Menghai", "Lucerne", "Antsiranana", "New Denver", "Portalington", "Jeongdongjin", "Rougemont", "Nakhon Pathom", "Cologne Lowland",
    "Putrajaya", "Charleville-Mezieres", "Worms", "Chacaltaya", "Seligenstadt", "Saronno", "Slovak Paradise National Park", "Central Province (Sri Lanka)", "Dawsonville",
    "Pantalica", "Pocono Mountains", "Araucania", "Chicopee", "Tsavo West National Park", "Introdacqua", "East Midlands", "Bedford (Virginia)", "Karlskrona",
    "Boxmeer", "Barnsley", "Iasi", "Maryland", "Laufenburg", "Shimla", "Lubin", "Jvari", "Capul", "Asti", "Sassari", "Vernet-les-Bains", "Kvam", "Trbovlje"
];

const RANDOM = "https://en.wikivoyage.org/api/rest_v1/page/random/summary/";
const CITY_BASE = "https://en.wikivoyage.org/api/rest_v1/page/summary/";
const BASE_URL = "https://en.wikivoyage.org/w/api.php";

export default async function getDestinations(cityName, requestedCities) {
    if (cityName == null) { // Give requestedCities number of random cities
        const cities = [];
        for (let i = 0; i < requestedCities; i++) {
            const search_path = CITY_BASE + randomCities[Math.floor(Math.random() * randomCities.length)];
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
        if (requestedCities == 1) {
            return cities[0];
        } else {
            return cities;
        }
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