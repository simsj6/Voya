import {React, useEffect, useState } from 'react';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import Card from '../../components/Card/Card';
import { assets } from '../../constants/assets';
import { Link } from 'react-router-dom';
import WideCard from '../../components/WideCard/WideCard';
import styles from './HomePage.module.css';

import getDestinations from '../../utils/wikitravel';

export default function HomePage({ popularCities, featuredDestinations, destinationOverview }) {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        async function loadDestination() {
            const destination = await getDestinations(null, 4);
            setDestinations(destination);
        };
        loadDestination();
    }, []);

    return (
        <main className={styles.page}>
            <section className={`${styles.hero} ${styles.split}`}>
                <div className={styles.heroCopy}>
                    <h1>Plan<br />Smoothly<br />With <em>VOYA</em></h1>
                    <br />
                    <div className={styles.actions}>
                        <Link className={styles.primary} to="/plan-a-trip">Start Planning</Link>
                        <Link className={styles.outline} to="/map">Explore Map</Link>
                    </div>
                </div>
                <div className={styles.blob}><img src={assets.beach} alt="Beach sunset" /></div>
            </section>

            <section className={styles.section}>
                <SectionHeading title="Explore Popular Cities" text="Curated experiences from around the world" />
                <div className={`${styles.cityGrid} ${styles.staggered}`}>
                    {destinations.map((city, index) => <Card title={city.title} image={city.thumbnail} tall={index % 2 === 1} time={0} price={0} />)}
                </div>
            </section>

            <section className={`${styles.section} ${styles.featureStrip}`}>
                <SectionHeading title="Featured Destinations" text="" />
                <div className={styles.wideCards}>
                    {featuredDestinations.map((destination) => <WideCard image={destination.image} title={destination.title} price={destination.price} />)}
                </div>
            </section>

            <section className={`${styles.section} ${styles.split} ${styles.wildlife}`}>
                <div className={styles.roundImage}><img src={assets.alaskaView} alt="Wildlife view" /></div>
                <div>
                    <h2>{destinationOverview.title}</h2>
                    <p>{destinationOverview.text}</p>
                    <button className="gold">Read More</button>
                </div>
            </section>
        </main>
    );
}