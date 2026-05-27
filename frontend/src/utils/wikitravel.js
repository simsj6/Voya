const RANDOM = "https://en.wikivoyage.org/api/rest_v1/page/random/summary/";
const BASE = "https://en.wikivoyage.org/api/rest_v1/page/summary/";

export default async function getDestinations(city, requestedCities) {
    const cities = [];
    if (city == null) { // Give requestedCities number of random cities
        for (let i = 0; i < requestedCities; i++) {
            const search_path = RANDOM;
            const res = await fetch(search_path);
            const data = await res.json();
            cities[i] = {
                description: data.description,
                extract: data.extract,
                thumbnail: data.thumbnail.source,
                title: data.title,
            };
        }
    } else { // Only give info on the specific city
        const search_path = BASE + city;
        const res = await fetch(search_path);
        const data = await res.json();
        cities[0] = {
            description: data.description,
            extract: data.extract,
            thumbnail: data.thumbnail.source,
            title: data.title,
        };
    }
    console.log("leaving getDest");
    return cities;
}