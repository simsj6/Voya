import {React, useEffect, useState } from 'react';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import Card from '../../components/Card/Card';
import { assets } from '../../constants/assets';
import { Link } from 'react-router-dom';
import WideCard from '../../components/WideCard/WideCard';
import styles from './HomePage.module.css';
import getDestinations from '../../utils/wikitravel';

export default function HomePage() {
    const [popularDestinations, setPopularDestinations] = useState([]);
    const [featuredDestinations, setFeaturedDestinations] = useState([]);

    useEffect(() => {
        async function loadDestination() {
            const popular = await Promise.all([
                getDestinations(null, 1),
                getDestinations(null, 1),
                getDestinations(null, 1),
                getDestinations(null, 1)
            ]);
            setPopularDestinations(popular);

            const destinations = await Promise.all([
                getDestinations("London", 0),
                getDestinations("NYC", 0),
                getDestinations("Tokyo", 0)
            ]);
            setFeaturedDestinations(destinations);
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
                    {popularDestinations.map((city, index) => <Card key={index} title={city.title} image={city.thumbnail} tall={index % 2 === 1} country={city.country} />)}
                </div>
            </section>

            <section className={`${styles.section} ${styles.featureStrip}`}>
                <SectionHeading title="Featured Destinations" text="" />
                <div className={styles.wideCards}>
                    {featuredDestinations.map((city, index) => <WideCard key={index} title={city.title} image={city.thumbnail} country={city.country} />)}
                </div>
            </section>

            <section className={`${styles.section} ${styles.split} ${styles.wildlife}`}>
                <div>
                    <h2>About {popularDestinations[0]?.title}</h2>
                    <p>{popularDestinations[0]?.extract}</p>
                </div>
            </section>
        </main>
    );
}