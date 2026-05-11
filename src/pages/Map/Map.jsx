import React from "react";
import "./Map.css";
import { assets } from "../../constants/assets";

export default function Map() {
  return (
    <main className="map-page">
      <div className="map-search">Search destinations, places...</div>
      <div className="map-filters">
        <button className="active">Hotels</button>
        <button>Dining</button>
        <button>Attractions</button>
        <button>Cafes</button>
      </div>
      {/* placeholder background until we get api */}
      <img className="map-bg" src={assets.map} alt="Map view" />
      <div className="pin active-pin">Villa d'Este</div>
      <div className="pin second-pin">Dining</div>
      <article className="location-card">
        <img src={assets.villa} alt="Villa d'Este" />
        <div>
          <h2>Villa d'Este</h2>
          <p>Lake Como, Italy</p>
          <strong>4.9 (120 reviews)</strong>
        </div>
      </article>
      <button className="locate">Target</button>
    </main>
  );
}
