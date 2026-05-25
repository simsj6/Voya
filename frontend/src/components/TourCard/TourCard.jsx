import React from "react";
import "./TourCard.css";

export default function TourCard({ title, image, duration, price }) {
  return (
    <article className="tour-card">
      <img src={image} alt="" />
      <div className="rating">4.8</div>
      <h3>{title}</h3>
      <div className="tags">
        <span>{duration} Minutes</span>
        <span>Walking</span>
        <span>Family Plan</span>
      </div>
      <p>
        <strong>${price}</strong> per person
      </p>
    </article>
  );
}
