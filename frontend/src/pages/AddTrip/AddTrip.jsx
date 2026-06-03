import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddTrip() {
    const navigate = useNavigate();
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [numTravelers, setNumTravelers] = useState();
    const [travelers, setTravelers] = useState("")
    const [travEmails, setTravEmails] = useState([]);
    const [flight, setFlight] = useState("");
    const [hotel, setHotel] = useState("");
    const [activities, setActivities] = useState("");
    const [listActivities, setListActivities] = useState([]);
    const [error, setError] = useState("");

    const validateInputs = () => {
        if (!destination) {
            return "Please enter a valid destination";
        }
        if (!startDate) {
            return "Please enter a valid start date";
        }
        if (!endDate) {
            return "Please enter a valid end date";
        }
        if (!numTravelers) {
            return "Please enter a valid number of travelers";
        }
        if (!travelers && numTravelers > 0) {
            return "Please enter a valid number of travelers";
        }
        if (numTravelers > 0) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emails = travelers.split(", ");
            for (let i = 0; i < emails.length; i++) {
                if (!emailRegex.test(emails[i])) {
                    return "One or more email addresses is invalid."
                }
            }
            setTravEmails(emails);
        }
        if (!flight) {
            return "Please enter a valid flight.";
        }
        if (!hotel) {
            return "Please enter a valid hotel.";
        }
        if (activities) { // does a user need to add activities?
            const acts = activities.split(", ");
            setListActivities(acts);
        }
        return "";
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        const validationError = validateInputs();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            // use email to link to user as the creator of trip and get token to verify authentication
            const user = JSON.parse(localStorage.getItem("User"));
            if (!user) {
                setError("Please sign in before adding a trip.");
                return;
            }
            const email = user.email;
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Please sign in before adding a trip.");
                return;
            }
            const emails = travelers ? travelers.split(", ").filter(Boolean) : [];
            const acts = activities ? activities.split(", ").filter(Boolean) : [];

            const response = await fetch("/api/add-trip", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },
                body: JSON.stringify({
                    email,
                    destination,
                    startDate,
                    endDate,
                    amtTravelers: numTravelers,
                    travelers: emails,
                    flight,
                    hotel,
                    activities: acts,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.error || "Trip adding failed.");
                return;
            }

            navigate("/profile"); // navigate to my trips?
        } catch (err) {
            console.error(err);
            setError("Network error. Is the server running?");
        }
    };

    return (
        <main className="page auth-page">
            <form className="form-card auth-card" onSubmit={handleSubmit}>
                <h1>Add Trip</h1>
                {error && <p>{error}</p>}
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
                <button className="primary" type='submit'>Add Trip</button>
            </form>
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
