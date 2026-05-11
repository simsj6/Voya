import React from "react";
import "./ProfilePanel.css";

export default function ProfilePanel({ title, children }) {
  return (
    <section className="profile-panel">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
