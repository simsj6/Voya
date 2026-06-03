const IMAGE_NAME_PREFIX = "en.wikivoyage.org/wiki/File:";

export default async function getActivities(cityName) {
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

    const destination = {
        title: cityName,
        subtitle: getSubtitle(page),
        image: await getImage(page),
        description: getDescription(page),
        activities: [
            "tmp activity1",
            "tmp activity2",
        ],
        safety: "tmp safety",
    };

    console.log(destination);

    return destination;
}

function getSection(page, section) {
    const regex = new RegExp(`==\\s*${section}\\s*==([\\s\\S]*?)(?=\\n==[^=].*==|\\n$)`);
    return page.match(regex);
}

function getTitle(page) {
    const regex = new RegExp("'''([^']+)'''");
    return page.match(regex)[1];
}

function getSubtitle(page) {
    const regex = new RegExp("'''[^']+'''([^\n]*)")
    return page.match(regex)[0];
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
    const regex = new RegExp("'''([^']+)'''");
    return page.match(regex);
}