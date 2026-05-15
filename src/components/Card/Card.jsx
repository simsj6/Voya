import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';

export default function Card({ title, image, tall, time, price }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/plan-a-trip')
    }

    return (
        <article className={tall ? "card tall" : "card"} onClick={handleClick}>
            <img src={image} alt="" />
            <h3>{title}</h3>
            <div className="card-meta"><span>{time} Minutes</span><span>Starts at ${price}</span></div>
        </article>
    );
}