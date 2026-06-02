// It takes ~1-2 seconds to pull this data, as it does have to make 4 api calls to pull the relevant information.
const SEARCH_PATH = "https://en.wikivoyage.org/w/api.php";
const cityName = "Seattle"; // used for testing...
// NOTE: Some cities have different names, as they may choose to differentiate themselves from similar entities
// EX. Portland is 'Portland (Oregon)', whereas Seattle is just 'Seattle'

function stripHtml(html) {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContext || tmp.innerText || "";
}

export default async function getSectionIndexes(cityName) {
    const params = new URLSearchParams({
        action: "parse",
        page: cityName,
        prop: "tocdata",
        format: "json"
    });

    const res = await fetch(`${SEARCH_PATH}?${params}`);

    if (!res.ok) {
        throw new Error(`Wiki request failed (${res.status})`);
    }

    const data = await res.json();

    const sects = data.parse.tocdata;

    let indexes = [0]; // includes index of summary text initially.
    let foci = ["Tours", "Stay safe"];

    sects.sections.forEach(function (x, index) {
        if (foci.includes(x.line)) {
            indexes.push(index + 1);
            let indRm = foci.indexOf(x.line);
            foci.splice(indRm, 1);
        }
    });

    let saveInd = 0;
    if (foci) {
        if (foci.length == 2) {
            indexes[1] = -1;
            indexes[2] = -1;
        } else if (foci[0] == "Tours")  {
            saveInd = indexes[1];
            indexes[1] = -1;
            indexes[2] = saveInd;
        } else if (foci[0] == "Stay Safe"){
            saveInd = indexes[1];
            indexes[1] = saveInd;
            indexes[2] = -1;
        }
    }

    return indexes;
}

export default async function getSections(indexes, cityName) { // could potentially call the previous function inside this...
    let sections = [];

    for (let i = 0; i < 3; i++) {
        if (indexes[i] == -1) {
            sections.push("");
            continue;
        }
        const params = new URLSearchParams({
            action: "parse",
            page: cityName,
            prop: "text",
            format: "json",
            section: indexes[i]
        });

        const res = await fetch(`${SEARCH_PATH}?${params}`);

        if (!res.ok) {
            throw new Error(`Wiki request failed (${res.status})`);
        }

        const data = await res.json();

        sections.push(data.parse.text["*"].replace(/<\/?[^>]+(>|$)/g, ""));
    }

    return sections;
}

const indexes = await getSectionIndexes(cityName);
console.log(indexes);

const sections = await getSections(indexes, cityName);
console.log(sections);

