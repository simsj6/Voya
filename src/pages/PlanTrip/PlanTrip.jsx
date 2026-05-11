import React from "react";
import Field from "../../components/Field/Field";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import ImageOverlay from "../../components/ImageOverlay/ImageOverlay";
import { assets } from "../../constants/assets";

export default function PlanTrip() {
  return (
    <main className="page">
      <section className="center-hero">
        <h1>Plan Your Next Adventure</h1>
        <p>
          Design a journey that reflects your pace. Tell us your desires, and
          we'll craft the perfect escape.
        </p>
      </section>
      <section className="planner-panel">
        <div className="planner-grid">
          <Field label="Destination" value="Where to?" />
          <Field label="Dates" value="Select dates" />
          <Field label="Travelers" value="2 Adults" />
          <button className="primary">Find Your Next Adventure</button>
        </div>
        <div className="chips">
          <strong>Pace & Budget:</strong>
          <button>Relaxed</button>
          <button className="selected">Balanced</button>
          <button>Luxury</button>
        </div>
      </section>
      <section className="section">
        <SectionHeading title="Suggested Itineraries" />
        <div className="itinerary-grid">
          <ImageOverlay
            image={assets.amalfi}
            duration="2 Days"
            title="Amalfi Coast Serenity"
            text="A slow-paced journey through cliffside villages and pristine waters."
            large
          />
          <ImageOverlay
            image={assets.kyoto}
            duration="5 Days"
            title="Kyoto Retreat"
            text="Find balance in ancient temples and mindful traditions."
          />
        </div>
      </section>
    </main>
  );
}
