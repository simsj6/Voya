import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Card.module.css';

export default function Card({ title, image, tall, country, state }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/plan-a-trip')
    }

    return (
        <article className={tall ? `${styles.card} ${styles.tall}` : styles.card} onClick={handleClick}>
            <img src={image} alt="" />
            <h3>{title}</h3>
            <div className={styles.cardMeta}><span>{country}</span><span>{state}</span></div>
        </article>
    );
}