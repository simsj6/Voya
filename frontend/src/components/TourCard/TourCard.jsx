import React from "react";
import "./TourCard.css";

export default function TourCard({ title, image, country }) {
  return (
    <article className="tour-card">
      <img src={image} alt="" />
      <div className="rating">4.8</div>
      <h3>{title}</h3>
      <p>
        <strong>{country}</strong>
      </p>
    </article>
  );
}
