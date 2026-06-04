import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiUrl } from "../../utils/api";
import Trip from "../../components/Trip/Trip";
import { assets } from "../../constants/assets";
import "./Profile.css";

export default function SharedTrips({ active }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    location: "",
    birthday: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const user_item = localStorage.getItem("User");
    const token = localStorage.getItem("token");

    if (!user_item || !token) {
      navigate("/signin");
      return;
    }

    const user = JSON.parse(user_item);
    setProfile({
      name: user.name || "",
      location: user.location || "",
      birthday: user.birthday || "",
      dateOfBirth: user.dateOfBirth || "",
      phone: user.phone || "",
      email: user.email || "",
      password: "",
      confirmPassword: "",
    });

    const getTrips = async () => {
      try {
        const response = await fetch(apiUrl("/api/profile/shared-itinerary"), {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const data = await response.json();
        if (!response.ok) {
          console.error(data.error || "Couldnt load shared trips.");
          return;
        }
        const sharedTrips = (data.itns || []).map((trip) => ({
          _id: trip._id,
          destination: trip.destination,
          start: trip.startDate,
          end: trip.endDate,
          flight: trip.flight,
          hotel: trip.hotel,
          num_travelers: trip.amtTravelers,
          is_shared: Array.isArray(trip.travelers) && trip.travelers.length > 0,
          emails: Array.isArray(trip.travelers) ? trip.travelers.join(", ") : "",
          activities: Array.isArray(trip.activities) ? trip.activities.join(", ") : "",
        }));

        setTrips(sharedTrips);
      } catch (err) {
        console.error(err);
      }
    };

    getTrips();
  }, [navigate]);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      await fetch(apiUrl("/api/logout"), {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem("User");
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <main className="profile-page">
      <aside className="profile-side">
        <img src={assets.profile} alt="Profile" />
        <h2>{profile.name}</h2>
        <p>{profile.location}</p>
        <p>{profile.birthday}</p>

        <Link className="profile-link" to="/profile">
          <button className={active === "/profile" ? "active" : ""}>Personal Info</button>
        </Link>
        <Link className="profile-link" to="/trips">
          <button className={active === "/trips" ? "active" : ""}>Trips</button>
        </Link>
        <Link className="profile-link" to="/shared-trips">
          <button className={active === "/shared-trips" ? "active" : ""}>Shared Itineraries</button>
        </Link>
        <button type="button" onClick={handleLogout}>Logout</button>
      </aside>
      <section className="profile-main">
        <h1>Shared Trips</h1>
        <p>Manage trips shared with you.</p>
        {trips.map((trip) => (
          <Trip key={trip._id} trip={trip} />
        ))}
      </section>
    </main>
  );
}
