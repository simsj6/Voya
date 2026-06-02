import React from "react";
import { useNavigate } from "react-router-dom";
import "./TourCard.css";

export default function TourCard({ title, image, country }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/destination/${title}`);
  }
  return (
    <article className="tour-card" onClick={handleClick}>
      <img src={image} alt="" />
      <h3>{title}</h3>
      <p>
        <strong>{country}</strong>
      </p>
    </article>
  );
}
