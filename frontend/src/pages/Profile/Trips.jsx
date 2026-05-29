import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ProfilePanel from "../../components/ProfilePanel/ProfilePanel";
import Field from "../../components/Field/Field";
import Trip from "../../components/Trip/Trip";
import { assets } from "../../constants/assets";
import "./Profile.css";

export default function Trips({ active }) {
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

  // use API to get user trips
  const allTrips = [
    {
      "destination": "Alaska, USA",
      "start": "1/1/2001",
      "end": "1/2/2001",
      "flight": "Alaska Airlines 227",
      "hotel": "Holiday Inn",
      "num_travelers": 2,
      "is_shared": false,
      "emails": "",
      "activities": "sledding, hiking"
    },
    {
      "destination": "Alaska, USA",
      "start": "1/1/2001",
      "end": "1/2/2001",
      "flight": "Alaska Airlines 227",
      "hotel": "Holiday Inn",
      "num_travelers": 3,
      "is_shared": true,
      "emails": "email@gmail.com, email@gmail.com",
      "activities": "sledding, hiking"
    }
  ]

  const trips = allTrips.filter(trip => trip.is_shared === false);

  // useEffect(() => {
  //   const raw = localStorage.getItem("User");
  //   if (!raw) {
  //     navigate("/signin");
  //     return;
  //   }

  //   const user = JSON.parse(raw);
  //   setProfile({
  //     name: user.name || "",
  //     location: user.location || "",
  //     birthday: user.birthday || "",
  //     dateOfBirth: user.dateOfBirth || "",
  //     phone: user.phone || "",
  //     email: user.email || "",
  //     password: "",
  //     confirmPassword: "",
  //   });
  // }, [navigate]);

  // const handleChange = (key, value) => {
  //   setProfile((prev) => ({
  //     ...prev,
  //     [key]: value,
  //   }));
  // };

  const handleSave = () => {
    console.log("Saved profile:", profile);
    //when we have the backend we save it there later
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      await fetch("/api/logout", {
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
        <h1>Trips</h1>
        <p>Manage your trips.</p>
        {trips.map((trip) => {
          console.log(trip)
          return (
            <Trip key={trip} trip={trip} />
          )
        })}
      </section>
    </main>
  );
}
