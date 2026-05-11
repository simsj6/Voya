import React from 'react';
import './ImageOverlay.css';

export default function ImageOverlay({ image, duration, title, text, large }) {
  return (
    <article className={large ? "overlay-card large" : "overlay-card"}>
      <img src={image} alt="" />
      <div>
        <span>{duration}</span>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
}
