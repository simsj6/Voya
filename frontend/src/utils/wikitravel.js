const RANDOM = "https://en.wikivoyage.org/api/rest_v1/page/random/summary/";
const BASE = "https://en.wikivoyage.org/api/rest_v1/page/summary/";

// List of popular cities and randomly pick from
// Return country of origin and state

export default async function getDestinations(cityName, requestedCities) {
    if (cityName == null) { // Give requestedCities number of random cities
        const cities = [];
        for (let i = 0; i < requestedCities; i++) {
            const search_path = RANDOM;
            const res = await fetch(search_path);
            const data = await res.json();
            cities[i] = {
                description: data.description,
                extract: data.extract,
                thumbnail: data.thumbnail.source,
                title: data.title,
                extract: data.extract,
            };
        }
        return cities;
    } else { // Only give info on the specific city
        const search_path = BASE + cityName;
        const res = await fetch(search_path);
        const data = await res.json();
        console.log(data);
        const city = {
            description: data.description,
            extract: data.extract,
            thumbnail: data.thumbnail.source,
            title: data.title,
        };
        return city;
    }
}