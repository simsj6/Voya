import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiUrl } from "../../utils/api";
import toast from "react-hot-toast";
import ProfilePanel from "../../components/ProfilePanel/ProfilePanel";
import Field from "../../components/Field/Field";
import { assets } from "../../constants/assets";
import "./Profile.css";

export default function Profile({ active }) {
  const navigate = useNavigate();
  const [profileError, setProfileError] = useState("");
  const [securityError, setSecurityError] = useState("");
  const [profile, setProfile] = useState({
    pname: "",
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
      pname: user.pname || "",
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

  const handleProfileChange = (key, value) => {
    setProfile((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSecurityChange = (key, value) => {
    setSecurity((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveProfile = async (event) => {
    console.log("Saved profile:", profile);
    // change just the profile information

    event.preventDefault();
    setProfileError("");

    try {
      // use email to link to user as the creator of trip and get token to verify authentication
      const user = JSON.parse(localStorage.getItem("User"));
      const email = user.email;
      const token = localStorage.getItem("token");

      const response = await fetch(apiUrl("/api/profile/update-profile"), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          email: email,
          pname: profile.pname,
          birthday: profile.birthday,
          dateOfBirth: profile.dateOfBirth,
          phone: profile.phone,
          location: profile.location
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        const message = data.error || "Profile update failed.";
        setProfileError(message);
        toast.error(message);
        return;
      }

      localStorage.setItem("User", JSON.stringify(data.user));
      toast.success(data.message || "Profile update successful.");
    } catch (err) {
      console.error(err);
      const message = "Network error. Is the server running?";
      setProfileError(message);
      toast.error(message);
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
    setSecurityError("");

    const validationError = validateInputs();
    if (validationError) {
      setSecurityError(validationError);
      toast.error(validationError);
      return;
    }

    try {
      // use email to link to user as the creator of trip and get token to verify authentication
      const user = JSON.parse(localStorage.getItem("User"));
      const email = user.email;
      const token = localStorage.getItem("token");

      const response = await fetch(apiUrl("/api/profile/update-security"), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          email: email,
          newEmail: security.email,
          newPassword: security.confirmPassword
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        const message = data.error || "Security update failed.";
        setSecurityError(message);
        toast.error(message);
        return;
      }

      localStorage.setItem("User", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      toast.success(data.message || "Security update successful.")
    } catch (err) {
      console.error(err);
      const message = "Network error. Is the server running?";
      setSecurityError(message);
      toast.error(message);
    }
  }

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
      toast("Logged out.");
      navigate("/");
    }
  };

  return (
    <main className="profile-page">
      <aside className="profile-side">
        <img src={assets.profile} alt="Profile" />
        <h2>{profile.pname}</h2>
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

      <main className="profile-main">
        <form className="profile-main" onSubmit={handleSaveProfile}>
          <h1>My Profile</h1>
          <p>Manage your travel preferences and personal details.</p>
          <ProfilePanel title="Personal Information">
            <div className="field-in">
              {profileError && <p className="Profile-form-error">{profileError}</p>}
              <span>pName</span>
              <input
                placeholder={profile.pname || "John Doe"}
                value={profile.pname}
                onChange={(event) => {
                  handleProfileChange('pname', event.target.value);
                }}
              />
              <span>Date of Birth</span>
              <input
                type="date"
                value={profile.dateOfBirth}
                onChange={(event) => {
                  handleProfileChange('birthday', event.target.value);
                  handleProfileChange('dateOfBirth', event.target.value);
                }}
              />
            </div>

            <div className="field-in">
              <span>Phone</span>
              <input
                type="phone"
                placeholder={profile.phone || "111-111-1111"}
                value={profile.phone}
                onChange={(event) => {
                  handleProfileChange('phone', event.target.value);
                }}
              />
              <span>Location</span>
              <input
                placeholder={profile.location || "City, State/Country"}
                value={profile.location}
                onChange={(event) => {
                  handleProfileChange('location', event.target.value);
                }}
              />
            </div>

            <button className="primary small" type="submit">
              Save
            </button>
          </ProfilePanel>
        </form>

        <form className="profile-main" onSubmit={handleSaveSecurity}>
          <ProfilePanel title="Security">
            <div className="field-in">
              {securityError && <p className="Security-form-error">{securityError}</p>}
              <span>Email</span>
              <input
                type="email"
                placeholder={security.email || "JohnDoe@email.com"}
                value={security.email}
                onChange={(event) => {
                  handleSecurityChange('email', event.target.value);
                }}
              />
            </div>

            <div className="field-in">
              <span>Password</span>
              <input
                type="password"
                placeholder="********"
                value={security.password}
                onChange={(event) => {
                  handleSecurityChange('password', event.target.value);
                }}
              />
              <span>Confirm Password</span>
              <input
                type="password"
                placeholder="********"
                value={security.confirmPassword}
                onChange={(event) => {
                  handleSecurityChange('confirmPassword', event.target.value);
                }}
              />
            </div>

            <button className="primary small" type="submit">
              Save
            </button>
          </ProfilePanel>
        </form>
      </main>
    </main>
  );
}
