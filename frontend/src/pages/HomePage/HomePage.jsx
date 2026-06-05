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
    const [loading, setLoading] = useState(true);
    const [hoverIndex, setHoverIndex] = useState(0);

    useEffect(() => {
        async function loadDestination() {
            setLoading(true);
            const popular = await getDestinations(null, 4);
            setPopularDestinations(popular);

            const destinations = await getDestinations(["London", "NYC", "Tokyo"]);
            setFeaturedDestinations(destinations);
            setLoading(false);
        };
        loadDestination();
    }, []);

    return (
        <main className={styles.page} style={{backgroundColor: "white"}}>
            <section className={`${styles.hero} ${styles.split}`} style={{backgroundColor: "var(--bg)"}}>
                <div className={styles.heroCopy}>
                    <h1>Plan<br />Smoothly<br />With <em>VOYA</em></h1>
                    <br />
                    <div className={styles.actions}>
                        <Link className={styles.primary} to="/plan-a-trip">Start Planning</Link>
                        <Link className={styles.outline} to="/add-trip">Add Existing Trip</Link>
                    </div>
                </div>
                <div className={styles.blob}><img src={assets.beach} alt="Beach sunset" /></div>
            </section>

            {loading ? 
                <>
                    <section className={styles.section} style={{marginBottom: "5em"}, {backgroundColor: "var(--bg"}}>
                        <SectionHeading title="Loading..." />
                    </section>
                </> : 
                <>
                    <section className={styles.section} style={{marginBottom: "5em"}}>
                <SectionHeading title="Explore Popular Cities" text="Curated experiences from around the world" />
                <div className={`${styles.cityGrid} ${styles.staggered}`}>
                    {popularDestinations.map((city, index) => <Card key={index} title={city.title} image={city.thumbnail} tall={index % 2 === 1} country={city.country} onMouseEnter={() => setHoverIndex(index)} />)}
                </div>
            </section>

            <section className={`${styles.section} ${styles.wildlife}`}>
                <div>
                    <h2>About {popularDestinations[hoverIndex]?.title}</h2>
                    <p>{popularDestinations[hoverIndex]?.extract}</p>
                </div>
            </section>

            <section className={`${styles.section} ${styles.featureStrip}`} style={{marginBottom: "0"}}>
                <SectionHeading title="Featured Destinations" text="" />
                <div className={styles.wideCards}>
                    {featuredDestinations.map((city, index) => <WideCard key={index} title={city.title} image={city.thumbnail} country={city.country} />)}
                </div>
            </section>
                </>}
        </main>
    );
}