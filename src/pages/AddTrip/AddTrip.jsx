import { React, useState } from 'react';

export default function AddTrip() {
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [numTravelers, setNumTravelers] = useState();
    const [travelers, setTravelers] = useState("")
    const [flight, setFlight] = useState("");
    const [hotel, setHotel] = useState("");
    const [activities, setActivities] = useState("");

    return (
        <main className="page auth-page">
            <section className="form-card trip-card">
                <h1>Add Trip</h1>
                <label className="field">
                    <span>Destination*</span>
                    <input 
                        placeholder="Alaska, USA"
                        value={destination}
                        onChange={(event) => {
                            setDestination(event.target.value)
                        }}
                    />
                </label>
                <div className="two-col">
                    <label className="field">
                        <span>Start Date*</span>
                        <input 
                            placeholder="07/24/26"
                            value={startDate}
                            onChange={(event) => {
                                setStartDate(event.target.value)
                            }}
                        />
                    </label>
                    <label className="field">
                    <span>End Date*</span>
                    <input 
                        placeholder="08/01/26"
                        value={endDate}
                        onChange={(event) => {
                            setEndDate(event.target.value)
                        }}
                    />
                </label>
                </div>
                <label className="field">
                    <span>Number Of Travelers*</span>
                    <input 
                        placeholder="2"
                        value={numTravelers}
                        onChange={(event) => {
                            setNumTravelers(event.target.value)
                        }}
                    />
                </label>
                <label className="field">
                    <span>Travelers*</span>
                    <input 
                        placeholder="travelerOne@gmail.com, travelerTwo@gmail.com"
                        value={travelers}
                        onChange={(event) => {
                            setTravelers(event.target.value)
                        }}
                    />
                </label>
                <label className="field">
                    <span>Flight*</span>
                    <input 
                        placeholder="Alaska Airlines 227"
                        value={flight}
                        onChange={(event) => {
                            setFlight(event.target.value)
                        }}
                    />
                </label>
                <label className="field">
                    <span>Hotel*</span>
                    <input 
                        placeholder="Holiday Inn"
                        value={hotel}
                        onChange={(event) => {
                            setHotel(event.target.value)
                        }}
                    />
                </label>
                <label className="field">
                    <span>Activities*</span>
                    <input 
                        placeholder="Sledding, hiking"
                        value={activities}
                        onChange={(event) => {
                            setActivities(event.target.value)
                        }}
                    />
                </label>
                <button className="primary">Add Trip</button>
            </section>
        </main>
    );
}

function Field({ label, value }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input value={value} readOnly />
    </label>
  );
}