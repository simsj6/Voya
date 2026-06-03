const IMAGE_NAME_PREFIX = "en.wikivoyage.org/wiki/File:";

export default async function getDestination(cityName) {
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
    const page = data.query.pages[Object.keys(data.query.pages)[0]].revisions[0]["*"];

    console.log(page);

    const destination = {
        title: cityName,
        subtitle: getSubtitle(page),
        image: await getImage(page),
        description: getDescription(page),
        activities: getActivities(page),
        safety: getSafety(page),
    };

    return destination;
}

function getSubtitle(page) {
    // Some wikivoyage pages have a subtitle section embedded in the header inside '' quotes.
    // Pull that subtitle and remove some of formatting wikivoyage uses to link to other pages within the wiki
    const regex = /(?<=\}\})[^\{\{]+?(?<!')''([^']+?)''(?!')[\s]+?(?=\{\{)/;
    let subtitle = page.match(regex);
    if (subtitle == null) {
        return null;
    }
    subtitle = subtitle[1].replaceAll("'''", "").replaceAll("[[", "").replaceAll("]]", "").replaceAll("&nbsp;", " ");
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
    const description = page.match(regex);

    return description;
}

function getActivities(page) {
    // Caputure everything starting at ==Do== and ending at the next "=" starting tag
    const regex = /==\s*Do\s*==([\s\S]*?)(?=={2,}[^=]*?)/;
    const doSection = page.match(regex)[0];

    // Caputure every item starting with a *, which does not contain the {{do}} tag and return as an array
    const activitiesRegex = /(?<=\*)(?!\s*\{\{)[^\n]+/g;
    const activities = [...doSection.matchAll(activitiesRegex)];

    return activities;
}

function getSafety(page) {
    // Caputer everything following ==Stay safe== and ending at the next "=" starting tag
    const regex = /(?<==\s*Stay safe\s*==)[\s\S]*?(?===)/;
    const safeSection = page.match(regex);
    
    if (safeSection == null) {
        return null;
    } 
    return safeSection;
}