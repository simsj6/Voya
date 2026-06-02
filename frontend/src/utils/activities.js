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
    
    const sections = [parseDoSection(page), parseSeeSection(page)];
    return sections;
}

function getSection(page, section) {
    const regex = new RegExp(`==\\s*${section}\\s*==([\\s\\S]*?)(?=\\n==[^=].*==|\\n$)`);
    return page.match(regex);
}

function parseDoSection(page) {
    const doSection = getSection(page, "Do")[0];
    console.log(doSection);
    const regex = new RegExp("(?<====\\[\\[)[^\\]]*(?=\\]\\]===)");
    const heading = doSection.match(regex);
    console.log(heading[0]);
    return ([
        {
            title: "Beachcombing",
            body: "They have a nice beach.",
        },
        {
            title: "Camping",
            body: "They have a nice campground.",
        },
    ]);
}

function parseSeeSection(page) {
    const seeSection = getSection(page, "See");
    return ([
        {
            title: "Ocean",
            body: "They have good views of the ocean.",
        },
        {
            title: "Forest",
            body: "They forest is thick and pretty.",
        },
    ]);
}