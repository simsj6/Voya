import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function WideCard({ title, image, country }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/plan-a-trip', {state: title});
    }
    return (
        <article className="wide-card" onClick={handleClick}>
            <img src={image} alt="" />
            <div><strong>{title}</strong><span>{country}</span></div>
        </article>
    );
}