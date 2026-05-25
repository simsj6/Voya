import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePanel from "../../components/ProfilePanel/ProfilePanel";
import Field from "../../components/Field/Field";
import { assets } from "../../constants/assets";
import "./Profile.css";

export default function Profile() {
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

  useEffect(() => {
    const raw = localStorage.getItem("User");
    if (!raw) {
      navigate("/signin");
      return;
    }

    const user = JSON.parse(raw);
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
  }, [navigate]);

  const handleChange = (key, value) => {
    setProfile((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

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

        <button className="active">Personal Info</button>
        <button>Trips</button>
        <button>Shared Itineraries</button>
        <button>Notifications</button>
        <button type="button" onClick={handleLogout}>Logout</button>
      </aside>
{/* All the profile and field stuff was there already and I just made it more dynamic*/}
      <section className="profile-main">
        <h1>My Profile</h1>
        <p>Manage your travel preferences and personal details.</p>
        <ProfilePanel title="Personal Information">
          <div className="two-col">
            <Field
              label="Name"
              value={profile.name}
              onChange={(value) => handleChange("name", value)}
            />
            <Field
              label="Date of Birth"
              value={profile.dateOfBirth}
              onChange={(value) => handleChange("dateOfBirth", value)}
            />
          </div>

          <div className="two-col">
            <Field
              label="Phone"
              value={profile.phone}
              onChange={(value) => handleChange("phone", value)}
            />
            <Field
              label="Location"
              value={profile.location}
              onChange={(value) => handleChange("location", value)}
            />
          </div>

          <button className="primary small" onClick={handleSave}>
            Save
          </button>
        </ProfilePanel>

        <ProfilePanel title="Security">
          <div className="one-col">
            <Field
              label="Email Address"
              value={profile.email}
              onChange={(value) => handleChange("email", value)}
            />
          </div>

          <div className="two-col">
            <Field
              label="Password"
              value={profile.password}
              onChange={(value) => handleChange("password", value)}
            />
            <Field
              label="Confirm Password"
              value={profile.confirmPassword}
              onChange={(value) => handleChange("confirmPassword", value)}
            />
          </div>

          <button className="primary small" onClick={handleSave}>
            Save
          </button>
        </ProfilePanel>
      </section>
    </main>
  );
}
