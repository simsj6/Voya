import React from 'react';
import './Card.css';

export default function Card({ title, image, tall, time, price }) {
    return (
        <article className={tall ? "card tall" : "card"}>
            <img src={image} alt="" />
            <h3>{title}</h3>
            <div className="card-meta"><span>{time}</span><span>Starts at {price}</span></div>
        </article>
    );
}