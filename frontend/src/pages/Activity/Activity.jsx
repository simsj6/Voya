import React from "react";
import "./Activity.css";
import { assets } from "../../constants/assets";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import TourCard from "../../components/TourCard/TourCard";

export default function Activity() {
  const gallery = [
    assets.gallery1,
    assets.gallery2,
    assets.gallery3,
    assets.gallery4,
    assets.activity1,
  ];

  return (
    <main className="page activity">
      <section className="activity-header">
        <div>
          <h1>Vintage Double Decker Bus Tour & Thames River Cruise</h1>
          <p>Top Rated Tour - 4.8 (8,940 reviews)</p>
        </div>
        <div className="booking-mini">
          <label>Currency</label>
          <select>
            <option>$71.81 USD</option>
          </select>
          <button className="primary">Add to Itinerary</button>
        </div>
      </section>
      <section className="gallery">
        <img
          className="main-photo"
          src={assets.mountainView}
          alt="Mountain view"
        />
        <div>
          {gallery.map((image) => (
            <img key={image} src={image} alt="" />
          ))}
        </div>
      </section>
      <section className="article-copy">
        <h2>Description</h2>
        <p>
          See the highlights of London via classic modes of transport on this
          half-day adventure. Enjoy views of Westminster Abbey, the Houses of
          Parliament, and the London Eye while riding through historic streets.
        </p>
        <p>
          Continue to St Paul's Cathedral and the Tower of London before taking
          a short trip along the River Thames, passing Shakespeare's Globe and
          London Bridge.
        </p>
        <h2>Activity</h2>
        <ul>
          <li>Discover London on board a classic Routemaster bus</li>
          <li>Cruise down the River Thames</li>
          <li>See the Changing of the Guard</li>
          <li>Learn the stories of the Tower of London</li>
        </ul>
      </section>
      <img className="activity-map" src={assets.basemap} alt="Route map" />
      <section className="section related">
        <SectionHeading title="Related Activities In Alaska" />
        <div className="destination-grid four">
          {[
            assets.activity1,
            assets.activity2,
            assets.activity3,
            assets.activity4,
          ].map((image, index) => (
            <TourCard
              key={image}
              title={`Alaska: ${["Mountains to Oceans", "Popular Glacier Destination", "Magic of London Tour", "Magic of London Tour #2"][index]}`}
              image={image}
              duration={`${[2, 5, 3, 4][index]} Hours`}
              price={`$${[25, 35, 55, 65][index]}.00`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
