import { React, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Destination.css";
import { assets } from "../../constants/assets";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import TourCard from "../../components/TourCard/TourCard";
import getDestinations from '../../utils/wikitravel';
import getCityInfo from "../../utils/cityinfo";

export default function Destination() {
  const { destinationId } = useParams();
  const [destination, setDestination] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // // get random cities for bottom of page
  const [randomDestinations, setRandomDestinations] = useState([]);
  useEffect(() => {
    async function loadDestination() {
      const random = await getDestinations(null, 4);
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
      setDestination(await getCityInfo(destinationId));
    };

    fetchDestination();
  }, [destinationId]);

  const handleClick = () => {
    navigate('/plan-a-trip', {state: destination.title});
  }

  if (destination == null) {
    return (
      <main className="page activity">
        <section className="activity-header">
          <div>
            <h1>City not found...</h1>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="page activity">
      <section className="activity-header">
        <div>
          <h1>{destination.title}</h1>
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
