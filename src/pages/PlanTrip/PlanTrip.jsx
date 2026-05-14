import { React, useState } from "react";
import Field from "../../components/Field/Field";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import ImageOverlay from "../../components/ImageOverlay/ImageOverlay";
import { assets } from "../../constants/assets";
import DatePicker from "../../components/DatePicker/DatePicker";
import { parseDate } from "@internationalized/date";
import InputNumber from "@rc-component/input-number";

export default function PlanTrip() {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState({
    start: parseDate('2026-05-13'),
    end: parseDate('2026-05-16'),
  });
  const [travelers, setTravelers] = useState(1);
  const [pace, setPace] = useState("Balanced");

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  }

  const handleTravelerChange = (event) => {
    setTravelers(event);
  }

  const handlePaceChange = (value) => {
    setPace(value);
  }

  const handleOnSubmit = () => {
    // If there is no destination set, don't do anything
    if (destination === "") {
      return ;
    }
    // This is where data would be given to an api
    console.log(destination);
    console.log(date.start);
    console.log(date.end);
    console.log(travelers);
    console.log(pace);
  }

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
          <Field label="Destination" value={destination} onChange={(value) => handleDestinationChange(event)} />
          <DatePicker label="Select dates" value={date} onChange={setDate} />
          <label className="field">
            <span>Travelers</span>
            <InputNumber defaultValue={travelers} min={1} onChange={(event) => handleTravelerChange(event)} />
          </label>
          <button className="primary" onClick={handleOnSubmit}>Find Your Next Adventure</button>
        </div>
        <div className="chips">
          <strong>Pace & Budget:</strong>
          <button className={pace === "Relaxed" ? "selected" : ""} onClick={() => handlePaceChange("Relaxed")}>Relaxed</button>
          <button className={pace === "Balanced" ? "selected" : ""} onClick={() => handlePaceChange("Balanced")}>Balanced</button>
          <button className={pace === "Luxury" ? "selected" : ""} onClick={() => handlePaceChange("Luxury")}>Luxury</button>
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
