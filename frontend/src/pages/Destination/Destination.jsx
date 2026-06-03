import { React, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Destination.css";
import { assets } from "../../constants/assets";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import TourCard from "../../components/TourCard/TourCard";
import getDestinations from '../../utils/wikitravel';
import getActivities from "../../utils/activities";

// note: activities is just tours of destination page on wikitravel
// this is just placeholder until we get api calls working
const destination2 = {
  "title": "Seattle",
  "subtitle": "Seattle is a huge city with several district articles containing sightseeing, restaurant, nightlife and accommodation listings — have a look at each of them.",
  "image": "https://wikitravel.org/upload/shared//5/51/Seattle_banner.jpg",
  "description": "Seattle, Washington, [2] is the largest city in the Pacific Northwest. Located between Puget Sound and Lake Washington in King County, of which it is the county seat, and overlooking Elliott Bay, Seattle is nicknamed The Emerald City. The city is a damp green gem, with an abundance of evergreen trees throughout, and spectacular views of the Cascade mountains to the east and the Olympic mountains to the west. The cultural and business center of the Pacific Northwest, the city and its surrounding areas are the home of the Space Needle, Boeing's aircraft assembly plants, Microsoft, Amazon.com, Costco, Nintendo of America, Starbucks, T-Mobile, and the University of Washington, as well as a vibrant arts and music scene and an excellent park system.",
  "activities": [
    "Argosy Cruises [41]. Offers sightseeing cruises of the harbor, the locks, and the surrounding lakes. They also offer day trips to Tillicum Village on Blake Island with a salmon bake from 1201 Alaskan Way, Piers 55 & 56.",
    "Bill Speidel's Underground Tour [42]. Bill Speidel's Underground Tour is Seattle's most unusual attraction, a humorous stroll through subterranean old red-light district storefronts and sidewalks entombed when the city rebuilt on top of itself after the Great Fire. The tour begins above ground in a restored 1890s saloon, then spills into historic Pioneer Square, before plunging underground for a time-capsule view of the buried city. All the while, tour guides regale you with sidesplitting stories our pioneers didn’t want you to hear. It’s history with punch lines! Adults only. One alcoholic drink included. Valid picture ID required. Tickets: undergroundtour.com, 206 682 4646.",
    "Public Market Tours [43] A one-hour historical tour of Pike Place Market filled with intriguing tales, including the original Starbucks and Sur La Table stores, as well as the world famous fish throwing Pike Place Fish boys.",
    "Hot Air Balloon Tours [44]. Hot air ballooning has been a staple in Seattle for the last 30 years. Seeing Mount Rainier from a few thousand feet is a photographers paradise. Flights typically take place at sunrise and sunset and last around an hour. If you are interested in not just watching the balloons fly, and would like to take flight yourself, there are a variety of companies in the Seattle area. Tickets can be booked online at: seattleballooning.com 206 588 9788.",
    "Savor Seattle Food Tours [45]. As seen in Bon Appétit Magazine, USA Today, and Frommer’s Travel Guide, Savor Seattle Food Tours is ranked #1 for the best things to do in Seattle! Offer award-winning food tours that explore the exciting history, culture, and food that makes Seattle a top culinary destination.",
    "SubSeattle Tour [46]. SubSeattle Tour is a rollicking, scenic bus ride through out-of-sight city neighborhoods, with lots of irreverent humor, sightings and stories of Seattle's subcultures. See the “real” Seattle most visitors don’t even hear about. View Lake Washington beaches, the house where Nirvana's Kurt Cobain lived (and died), and Seattle's gay Pride parade route along hopping Broadway Ave. Brought to you by the Underground Tour. Tickets: subseattletour.com, 206 682 4646.",
    "Taste Seattle Food Tour Ranked 5 Stars on Yelp and TripAdvisor [47] Taste Seattle Food Tours is one of the most fun and unique ways to experience our city. As we like to think of it, we take you off the “eaten path”. You will be guided on a relaxed tour with some of the best food and drink Seattle’s unique neighborhoods have to offer while getting to know Seattle’s history and culture. Come join us and…Live Life With Flavor and Fun! Buy Tickets:https://my.getinsellout.com/providers/taste-seattle-food-tours/list, 1-206-330-0275",
    "Western Prince Whale Watching San Juan Island [48] Whale watching tours from Friday Harbor on San Juan Island, just 90 miles north of Seattle, WA. 5 Star Tripadvisor Rating. The original whale watch company in the San Juan Islands. We operate the “Western Prince II”, limited to 32 guests, and the zodiac style “Western Explorer”, limited to 15 guests. Two wonderful boats to choose from on your Salish sea adventure! 360-378-5315 Western Prince Whale Watching San Juan Island"
  ],
  "safety": "Seattle is a fairly safe city in most areas, especially as you move away from downtown area. However, like all large cities you should be cautious of potential danger and use common sense. There is little concern in the residential North Seattle districts, except for the areas around Aurora Avenue, the University District and Lake City Way at night time. Car break-ins are a prevalent issue, such as in the University District. Some South Seattle neighborhoods have a history of gang and drug related violence, but common sense and smart thinking should be used in any neighborhood you are unfamiliar with, especially if traveling by foot or alone.\n\nDowntown Seattle has a sizable population of homeless men and women. Many may beg for change which then go to fund the local drug markets. While walking down Pike or Pine Streets from Westlake Center to Pike Place Market, be vigilant when passing 2nd and 3rd Avenues, as this has been a particular hotspot of crime and drug activity and even the occasional shooting. Many social services are based in the Pioneer Square area, and transient populations do spread into the International District and Westlake areas. However, these places are also heavily monitored by city police, and the city's officials and residents continue to increase efforts to address urban homelessness. It should be noted that the majority of the city is still extremely safe to travel through at any given time.\n\nThe right to assemble and protest is taken very seriously in Seattle (as well as the rest of Washington), and often goes to extremes. Protest-related violence has occurred in the past, so take extra precautions and be sensible. Keep in mind also the Seattle Police can be known for being heavy-handed in such situations."
}

export default function Destination() {
  const { destinationId } = useParams();
  const [destination, setDestination] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // // get random cities for bottom of page
  const [randomDestinations, setRandomDestinations] = useState([]);
  useEffect(() => {
    async function loadDestination() {
      const random = await Promise.all([
        getDestinations(null, 1),
        getDestinations(null, 1),
        getDestinations(null, 1),
        getDestinations(null, 1)
      ]);
      setRandomDestinations(random);
    };
    loadDestination();
  }, [destinationId]);

  // get destination info from wikivoyage
  useEffect(() => {
    const fetchDestination = async () => {
      // try {
      //   setLoading(true);
      //   const response = await fetch(`https://en.wikivoyage.org/w/api.php?action=parse&page=${destinationId}&prop=tocdata&format=json`);
      //   const data = await response.json();

      //   // use multiple state variables/api calls to populate page
      //   setDestination(data);
      // } catch (error) {
      //   console.error("Error fetching destination:", error);
      // } finally {
      //   setLoading(false);
      // }
      setDestination(await getActivities(destinationId));
    };

    fetchDestination();
  }, [destinationId]);

  const handleClick = () => {
    navigate('/plan-a-trip', {state: destination.title});
  }

  return (
    <main className="page activity">
      <section className="activity-header">
        <div>
          <h1>{destinationId}</h1>
          <p>{destination.subtitle}</p>
        </div>
        <div className="booking-mini">
          <button className="primary" onClick={handleClick}>Plan a Trip!</button>
        </div>
      </section>
      <section className="gallery">
        <img
          className="main-photo"
          src={destination.image}
          alt="Mountain view"
        />
      </section>
      <section className="article-copy">
        {
          destination.description ?
            <>
              <h2>Description</h2>
              <p>
                {destination.description}
              </p>
            </>
          :
            <></>
        }
        {
          destination.activities ?
            <>
              <h2>Activities</h2>
              <ul>
                {destination.activities.map((activity) => (
                  <li>{activity}</li>
                ))}
              </ul>
            </>
          :
            <></>
        }
        {
          destination.safety ? 
            <>
              <h2>Safety</h2>
              <p>{destination.safety}</p>
            </>
          :
            <></>
        }
      </section>
      <section className="section related">
        <SectionHeading title="Other Destinations You May Enjoy" />
        <div className="destination-grid four">
          {randomDestinations.map((city, index) => 
            <TourCard key={index} title={city.title} image={city.thumbnail} country={city.country} />
          )}
        </div>
      </section>
    </main>
  );
}
