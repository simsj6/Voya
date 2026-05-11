import React from "react";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import TourCard from "../../components/TourCard/TourCard";
import { assets } from "../../constants/assets";

// Might need to change how we do the cards if we want to split the data between "Things to Do in City" and "Outside the City Specials"

export default function PopularDestinations( { cards }) {
  return (
    <main className="page destinations">
      <section className="destination-hero">
        <div>
          <h1>Popular Destinations</h1>
          <p>
            Discover handpicked experiences tailored for the discerning
            traveler.
          </p>
        </div>
        <div className="selects">
          <button>Sort by: Popularity</button>
          <button>All Categories</button>
        </div>
      </section>
      <section className="section">
        <SectionHeading title="Things To Do In London" />
        <div className="destination-grid">
          {/* shows first three cards */}
          {cards.slice(0, 3).map(([title, image, duration, price]) => (
            <TourCard key={title} title={title} image={image} duration={duration} price={price} />
          ))}
        </div>
      </section>
      <section className="section">
        <SectionHeading title="Outside The City Specials" />
        <div className="chips">
          <button className="selected teal">Water Activities</button>
          <button>Special Foods</button>
          <button>River Activity</button>
          <button>Historical Tours</button>
        </div>
        <div className="destination-grid four">
          {/* shows cards after first three */}
          {cards
            .slice(3)
            .map(([title, image, duration, price], index) => (
              <TourCard
                key={`${title}-${index}`}
                title={title}
                image={image}
                duration={duration}
                price={price}
              />
            ))}
        </div>
      </section>
    </main>
  );
}
