import React from "react";
import ProfilePanel from "../../components/ProfilePanel/ProfilePanel";
import Field from "../../components/Field/Field";
import { assets } from "../../constants/assets";

export default function Profile() {
  return (
    <main className="profile-page">
      <aside className="profile-side">
        <img src={assets.profile} alt="Profile" />
        <h2>Masum Rana</h2>
        <p>Gothenburg</p>
        <p>15th February</p>
        <button className="active">Personal Info</button>
        <button>Trips</button>
        <button>Shared Itineraries</button>
        <button>Notifications</button>
      </aside>
      <section className="profile-main">
        <h1>My Profile</h1>
        <p>Manage your travel preferences and personal details.</p>
        <ProfilePanel title="Personal Information">
          <div className="two-col">
            <Field label="Name" value="Masum Rana" />
            <Field label="Date of Birth" value="15/03/1886" />
          </div>
          <div className="two-col">
            <Field label="Phone" value="+46-7644 394 68" />
            <Field label="Location" value="Gothenburg" />
          </div>
          <button className="primary small">Save</button>
        </ProfilePanel>
        <ProfilePanel title="Security">
          <Field label="Email Address" value="masumrana15@gmail.com" />
          <div className="two-col">
            <Field label="Password" value="********" />
            <Field label="Confirm Password" value="********" />
          </div>
          <button className="primary small">Save</button>
        </ProfilePanel>
      </section>
    </main>
  );
}
