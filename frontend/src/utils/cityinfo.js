import Fuse from "fuse.js";

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

const IMAGE_NAME_PREFIX = "en.wikivoyage.org/wiki/File:";

export default async function getCityInfo(cityName) {
    // Compares what was input (cityName) to the list of randomCities. If one is close enough, continue. If not, return null
    // const fuse = new Fuse(randomCities, {
    //     includeScore: true,
    // });
    // const result = fuse.search(cityName)[0];
    // if (result.score > 0.3) { // adjust this to change what "close enough" means
    //     return null;
    // }
    // cityName = result.item;

    // Build the search path and fetch its data
    const url = new URL("https://en.wikivoyage.org/w/api.php");
    url.search = new URLSearchParams({
        action: "query",
        prop: "revisions",
        rvprop: "content",
        titles: cityName,
        format: "json",
        origin: "*",
    });
    const res = await fetch(url);
    const data = await res.json();

    // If data.query.pages has a -1 first, there wasn't a city found
    if (Object.keys(data.query.pages)[0] == "-1") {
        return null;
    }

    // Get the entire page from the response
    const page = data.query.pages[Object.keys(data.query.pages)[0]].revisions[0]["*"];

    // If there are multiple cities with this name, return a list of their names
    if (multipleOptions(page)) {
        const regex = /(?<=\* \[\[)([\s\S]+?)(?=\]\])/g;
        console.log(page.match(regex));
        return 
    }

    // If the article fetched isn't a city, check if it is multiple cities. Return that list if it is, or null if not
    if (!isCity(page)) {
        if (multipleOptions(page)) {
            const regex = /(?<=\* \[\[)([\s\S]+?)(?=\]\])/g;
            console.log(page.match(regex));
            return page.match(regex);
        }
        return null;
    }

    // Return all the city page info needed in an object
    return ({
        title: cityName,
        subtitle: getSubtitle(page),
        image: await getImage(page),
        description: getDescription(page),
        activities: getActivities(page), // array
        see: getSee(page), // array
        safety: getSafety(page),
    });
}

function getSubtitle(page) {
    // Some wikivoyage pages have a subtitle section embedded in the header inside '' quotes.
    // Pull that subtitle and remove some of formatting wikivoyage uses to link to other pages within the wiki
    const regex = /(?<=\}\})[^\{\{]+?(?<!')''([^']+?)''(?!')[\s]+?(?=\{\{)/;
    let subtitle = page.match(regex);
    if (subtitle == null) {
        return null;
    }
    subtitle = subtitle[1].replaceAll("'''", "").replaceAll("[[", "").replaceAll("]]", "").replaceAll("&nbsp;", " ").replaceAll(/(\([\s\S]+?\))/g, "");
    return subtitle;
}

async function getImage(page) {
    // Capture the filename from the wikivoyage page header.
    const regex = /(?<=\|)[\s\S]*?(?=[\|}])/;
    const imageName = page.match(regex)[0];

    // Make another api call on the destination of the filename
    const url = new URL("https://www.wikidata.org/w/api.php");
    url.search = new URLSearchParams({
        action: "query",
        titles: `File:${imageName}`,
        prop: "imageinfo",
        iiprop: "url",
        format: "json",
        origin: "*",
    });
    const res = await fetch(url);
    const data = await res.json();
    return data?.query?.pages[Object.keys(data.query.pages)[0]]?.imageinfo[0]?.url;
}

function getDescription(page) {
    // Each wikivoyage page starts with '''CityName'''. This captures everything from that to the first newline.
    const regex = /'''[^']+'''([^\n]*)/;
    let description = page.match(regex);

    if (description.length == 0) {
        return null;
    }

    description = description[0].replaceAll("'''", "").replaceAll("[[", "").replaceAll("]]", "").replaceAll("&nbsp;", " ").replaceAll(/(\([\s\S]+?\))/g, "");

    return description;
}

function getActivities(page) {
    // Caputure everything starting at ==Do== and ending at the next "=" starting tag
    const regex = /==\s*Do\s*==([\s\S]*?)(?=={2,}[^=]*?)/;
    const doSection = page.match(regex)[0];

    // Caputure every item starting with a *, which does not contain the {{do}} tag and return as an array
    const activitiesRegex = /(?<=\*)(?!\s*\{\{)[^\n]+/g;
    const activities = [...doSection.matchAll(activitiesRegex)];

    // If there are no activities, return null instead of an empty array to remove the activity heading
    if (activities.length == 0) {
        return null;
    }

    for (let i = 0; i < activities.length; i++) {
        activities[i] = activities[i][0].replaceAll("'''", "").replaceAll("[[", "").replaceAll("]]", "").replaceAll("&nbsp;", " ");
        activities[i] = activities[i].replaceAll(/(?<=\[)(http[^\s]+)/g, "").replaceAll("[", "").replaceAll("]", "");
        activities[i] = activities[i].replaceAll(/([\S]+?)(?=\|)/g, "").replaceAll("|", "").replaceAll(/(\([\s\S]+?\))/g, "");
    }

    return activities;
}

function getSee(page) {
    const regex = /(?<==\s*See\s*==)[\s\S]*?(?===)/;
    const seeSection = page.match(regex)[0];

    const listRegex = /(?<=\*)(?!\s*\{\{)[^\n]+/g;
    const seeList = [...seeSection.matchAll(listRegex)];

    if (seeList.length == 0) {
        return null;
    }

    for (let i = 0; i < seeList.length; i++) {
        seeList[i] = seeList[i][0].replaceAll("'''", "").replaceAll("[[", "").replaceAll("]]", "").replaceAll("&nbsp;", " ");
        seeList[i] = seeList[i].replaceAll(/(?<=\[)(http[^\s]+)/g, "").replaceAll("[", "").replaceAll("]", "");
        seeList[i] = seeList[i].replaceAll(/([\S]+?)(?=\|)/g, "").replaceAll("|", "").replaceAll(/(\([\s\S]+?\))/g, "");
    }

    return seeList;
}

function getSafety(page) {
    // Capture everything following ==Stay safe== and ending at the next "=" starting tag
    const regex = /(?<==\s*Stay safe\s*==)[\s\S]*?(?===)/;
    let safeSection = page.match(regex);
    
    if (safeSection == null) {
        return null;
    }

    safeSection = safeSection[0].replaceAll("'''", "").replaceAll("[[", "").replaceAll("]]", "").replaceAll("&nbsp;", " ").replaceAll(/(\([\s\S]+?\))/g, "");
    return safeSection;
}

function multipleOptions(page) {
    // the {{disamb}} only appears when a page returned is trying to clarify which city to go to
    const regex = /({{disamb}})/;
    return page.match(regex);
}

function isCity(page) {
    // This checks for a flag {{isPartOf|[LOCATION]}}, which appears in articles about cities and states
    const regex = /(?<=\{\{isPartOf\|)[\s\S]+?(?=\}\})/i;
    return page.match(regex);
}