import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ProfilePanel from "../../components/ProfilePanel/ProfilePanel";
import Field from "../../components/Field/Field";
import { assets } from "../../constants/assets";
import "./Profile.css";

export default function Profile({ active }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [profile, setProfile] = useState({
    name: "",
    location: "",
    birthday: "",
    dateOfBirth: "",
    phone: "",
  });

  const [security, setSecurity] = useState({
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
    });

    setSecurity({
      email: user.email || "",
      password: "",
      confirmPassword: "",
    })
  }, [navigate]);

  const handleChange = (key, value) => {
    setProfile((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveProfile = async (event) => {
    console.log("Saved profile:", profile);
    // change just the profile information

    event.preventDefault();
    setError("");

    try {
      // use email to link to user as the creator of trip and get token to verify authentication
      const user = localStorage.getItem("User");
      const email = user.email;
      const token = localStorage.getItem("token");

      const response = await fetch("/api/profile/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify( email, profile.name, profile.dateOfBirth, profile.phone, profile.location ),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Security change failed.");
        return;
      }

    } catch (err) {
      console.error(err);
      setError("Network error. Is the server running?");
    }
  };

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!security.email || !emailRegex.test(security.email)) {
      return "Please enter a valid email address.";
    }
    if (!security.password || security.password.length < 8) {
      return "Password must be at least 8 characters.";
    }
    if (security.password !== security.confirmPassword) {
      return "Passwords do not match.";
    }
    return "";
  }

  const handleSaveSecurity = async (event) => {
    // change 
    event.preventDefault();
    setError("");

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      // use email to link to user as the creator of trip and get token to verify authentication
      const user = localStorage.getItem("User");
      const email = user.email;
      const token = localStorage.getItem("token");

      const response = await fetch("/api/profile/update-security", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify( email, security.email, security.confirmPassword ),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Security change failed.");
        return;
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Is the server running?");
    }
  }

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

      <form className="profile-main" onSubmit={handleSaveProfile}>
        <h1>My Profile</h1>
        <p>Manage your travel preferences and personal details.</p>
        <ProfilePanel title="Personal Information">
          <div className="two-col">
            <Field
              label="Name"
              value={profile.name}
              onChange={(event) => {
                setProfile({ name: event.target.value });
              }}
            />
            <input
              type="date"
              label="Date of Birth"
              value={profile.dateOfBirth}
              onChange={(event) => {
                setProfile({ dateOfBirth: event.target.value });
              }}
            />
          </div>

          <div className="two-col">
            <input
              type="phone"
              label="Phone"
              value={profile.phone}
              onChange={(event) => {
                setProfile({ phone: event.target.value });
              }}
            />
            <Field
              label="Location"
              value={profile.location}
              onChange={(event) => {
                setProfile({ location: event.target.value });
              }}
            />
          </div>

          <button className="primary small" type="submit">
            Save
          </button>
        </ProfilePanel>
      </form>

      <form className="profile-security" onSubmit={handleSaveSecurity}>
        <ProfilePanel title="Security">
          <div className="one-col">
            <input
              type="email"
              placeholder="YourEmail@email.com"
              value={security.email}
              onChange={(event) => {
                setSecurity({ email: event.target.value });
              }}
            />
          </div>

          <div className="two-col">
            <input
              type="password"
              placeholder="Password"
              value={security.password}
              onChange={(event) => {
                setSecurity({ password: event.target.value });
              }}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={security.confirmPassword}
              onChange={(event) => {
                setSecurity({ confirmPassword: event.target.value });
              }}
            />
          </div>

          <button className="primary small" type="submit">
            Save
          </button>
        </ProfilePanel>
      </form>
    </main>
  );
}
