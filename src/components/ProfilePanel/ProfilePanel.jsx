import React from "react";
import "./ProfilePanel.css";
import "../../styles.css";

export default function ProfilePanel({ title, children }) {
  return (
    <div className="profile-panel">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
