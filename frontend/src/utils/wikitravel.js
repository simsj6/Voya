import { useState } from "react";

const BASE = "https://en.wikivoyage.org/api/rest_v1/page/";
const SUFFIX = "summary/";

export default async function getDestinations(location, requestedCities) {
    console.log(location);
    console.log(requestedCities);
    const [destinations, setDestinations] = useState([]);

    if (location == null) {
        const search_path = BASE + "random/" + SUFFIX;

        for (i = 0; i < requestedCities; i++) {
            const res = await fetch(search_path);
            const data = await res.json();
            const newDestination = {
                description: data.description,
                extract: data.extract,
                thumbnail: data.thumbnail.source,
                title: data.title,
            };
            setDestinations((prev) => [...prev, newDestination]);
        }
        console.log(destinations);
        return destinations;
    } else {
        const search_path = BASE + SUFFIX + location;
        const res = await fetch(search_path);
        const data = await res.json();

        return {
            description: data.description,
            extract: data.extract,
            thumbnail: data.thumbnail.source,
            title: data.title,
        };
    }
}