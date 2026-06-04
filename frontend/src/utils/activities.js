import { Activity } from "react";

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

    const destination = {
        title: cityName,
        subtitle: getSubtitle(page),
        image: await getImage(page),
        description: getDescription(page),
        activities: getActivities(page),
        seeList: getSee(page),
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