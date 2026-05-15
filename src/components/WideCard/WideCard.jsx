import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function WideCard({ image, title, price }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/plan-a-trip');
    }
    return (
        <article className="wide-card" onClick={handleClick}>
            <img src={image} alt="" />
            <div><strong>{title}</strong><span>${price} per person</span></div>
        </article>
    );
}