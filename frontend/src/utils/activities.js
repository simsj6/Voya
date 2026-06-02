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

    console.log(url);

    const res = await fetch(url);
    const data = await res.json();
    const page = data.query.pages[Object.keys(data.query.pages)[0]].revisions[0]["*"];
    const seeSection = parseDoSection(page);
}

function getSection(page, section) {
    const regex = new RegExp(`==\\s*${section}\\s*==([\\s\\S]*?)(?=\\n==[^=].*==|\\n$)`);
    return page.match(regex);
}

function parseDoSection(page) {
    console.log(getSection(page, "Do"));
}