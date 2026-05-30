import {React, useEffect, useState } from 'react';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import Card from '../../components/Card/Card';
import { assets } from '../../constants/assets';
import { Link } from 'react-router-dom';
import WideCard from '../../components/WideCard/WideCard';
import styles from './HomePage.module.css';

import getDestinations from '../../utils/wikitravel';

export default function HomePage({ destinationOverview }) {
    const [popularDestinations, setPopularDestinations] = useState([]);
    const [featuredDestinations, setFeaturedDestinations] = useState([]);

    useEffect(() => {
        async function loadDestination() {
            const destination = await getDestinations(null, 4);
            setPopularDestinations(destination);

            const destinations = [3];
            destinations[0] = await getDestinations("London", 0);
            destinations[1] = await getDestinations("NYC", 0);
            destinations[2] = await getDestinations("Tokyo", 0);
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
                    {popularDestinations.map((city, index) => <Card index={index} title={city.title} image={city.thumbnail} tall={index % 2 === 1} country={city.country} />)}
                </div>
            </section>

            <section className={`${styles.section} ${styles.featureStrip}`}>
                <SectionHeading title="Featured Destinations" text="" />
                <div className={styles.wideCards}>
                    {featuredDestinations.map((city, index) => <WideCard index={index} title={city.title} image={city.thumbnail} country={city.country} />)}
                </div>
            </section>

            {/* Paragraph about random city */}

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