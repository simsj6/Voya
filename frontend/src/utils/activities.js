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

    console.log(destination);

    return destination;
}

function getSection(page, section) {
    const regex = /==\s*${section}\s*==([\s\S]*?)(?=\n==[^=].*==|\n$)/;
    return page.match(regex);
}

function getSubtitle(page) {
    const regex = /(?<!')''([^']+?)''(?!')/;
    let subtitle = page.match(regex)[0];
    subtitle = subtitle.replaceAll("'''", "").replaceAll("[[", "").replaceAll("]]", "").replaceAll("&nbsp;", " ");
    return subtitle;
}

async function getImage(page) {
    const regex = /(?<=\|)[\s\S]*?(?=[\|}])/;
    const imageName = page.match(regex)[0];

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
    const regex = /'''[^']+'''([^\n]*)/;
    return page.match(regex);
}

function getActivities(page) {
    const regex = /==\s*Do\s*==([\s\S]*?)(?=={2,}[^=]*?)/;
    const doSection = page.match(regex)[0];

    const activitiesRegex = /(?<=\*)[\s\S]*?(?=[\n])/g;
    const activities = [...doSection.matchAll(activitiesRegex)];

    return activities;
    // return ([
    //     "activity 1",
    //     "activity 2",
    // ]);
}

function getSafety(page) {
    return "tmp safety";
}