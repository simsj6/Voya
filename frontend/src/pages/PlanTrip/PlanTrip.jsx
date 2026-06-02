import { React, useState } from "react";
import { useLocation } from "react-router-dom";
import Field from "../../components/Field/Field";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import ImageOverlay from "../../components/ImageOverlay/ImageOverlay";
import { assets } from "../../constants/assets";
import DatePicker from "../../components/DatePicker/DatePicker";
import { parseDate } from "@internationalized/date";
import InputNumber from "@rc-component/input-number";
import "../../styles.css";
import styles from "./PlanTrip.module.css";
import getActivities from "../../utils/activities";
import ActivityCard from "../../components/ActivityCard/ActivityCard";

export default function PlanTrip() {
  const location = useLocation();
  const city = location?.state;
  const [destination, setDestination] = useState(city || "");
  const [date, setDate] = useState({
    start: parseDate('2026-05-13'),
    end: parseDate('2026-05-16'),
  });
  const [travelers, setTravelers] = useState(1);
  const [pace, setPace] = useState("Balanced");
  const [itineraries, setItineraries] = useState([]);
  const [activities, setActivites] = useState([]);

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
    async function loadActivities() {
      const returnedActivities = await getActivities(destination);
      setActivites(returnedActivities);
    };
    loadActivities();
  }

  return (
    <main className={styles.page}>
      <section className={styles.centerHero}>
        <h1>Plan Your Next Adventure</h1>
        <p>
          Design a journey that reflects your pace. Tell us your desires, and
          we'll craft the perfect escape.
        </p>
      </section>
      <section className={styles.plannerPanel}>
        <div className={styles.plannerGrid}>
          <Field label="Destination" value={destination} onChange={(value) => handleDestinationChange(event)} />
          <DatePicker label="Select dates" value={date} onChange={setDate} />
          <label className={styles.field}>
            <span>Travelers</span>
            <InputNumber defaultValue={travelers} min={1} onChange={(event) => handleTravelerChange(event)} />
          </label>
          <button className={styles.primary} onClick={handleOnSubmit}>Find Your Next Adventure</button>
        </div>
        <div className={styles.chips}>
          <strong>Pace & Budget:</strong>
          <button className={pace === "Relaxed" ? `${styles.selected}` : ""} onClick={() => handlePaceChange("Relaxed")}>Relaxed</button>
          <button className={pace === "Balanced" ? `${styles.selected}` : ""} onClick={() => handlePaceChange("Balanced")}>Balanced</button>
          <button className={pace === "Luxury" ? `${styles.selected}` : ""} onClick={() => handlePaceChange("Luxury")}>Luxury</button>
        </div>
      </section>

      <section className={styles.section}>
      <SectionHeading title="Things to do..." />
      {activities[0].map((activity) => 
        <ActivityCard title={activity.title} body={activity.body} />)}
      <SectionHeading title="Things to see..." />
      {activities[1].map((activity) => 
        <ActivityCard title={activity.title} body={activity.body} />)}
      </section>

      <section className={styles.section}>
        <SectionHeading title="Suggested Itineraries" />
        <div className={styles.itineraryGrid}>
          {itineraries.map((itinerary) => 
            <ImageOverlay image={itinerary.image} duration={itinerary.duration} title={itinerary.title} text={itinerary.text} />)}
        </div>
      </section>
    </main>
  );
}
