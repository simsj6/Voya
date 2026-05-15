import React from 'react';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import Card from '../../components/Card/Card';
import { assets } from '../../constants/assets';
import { Link } from 'react-router-dom';
import WideCard from '../../components/WideCard/WideCard';

export default function HomePage({ popularCities, featuredDestinations, destinationOverview }) {
    return (
        <main className="page home">
            <section className="hero split">
                <div className="hero-copy">
                    <h1>Plan<br />Smoothly<br />With <em>VOYA</em></h1>
                    <br />
                    <div className="actions">
                        <Link className="primary" to="/plan-a-trip">Start Planning</Link>
                        <Link className="outline" to="/map">Explore Map</Link>
                    </div>
                </div>
                <div className="hero-image blob"><img src={assets.beach} alt="Beach sunset" /></div>
            </section>

            <section className="section">
                <SectionHeading title="Explore Popular Cities" text="Curated experiences from around the world" />
                <div className="city-grid staggered">
                    {popularCities.map((city, index) => <Card title={city.title} image={city.image} tall={index % 2 === 1} time={city.timeMinutes} price={city.price} />)}
                </div>
            </section>

            <section className="section feature-strip">
                <SectionHeading title="Featured Destinations" text="" />
                <div className="wide-cards">
                    {featuredDestinations.map((destination) => <WideCard image={destination.image} title={destination.title} price={destination.price} />)}
                </div>
            </section>

            <section className="section split wildlife">
                <div className="round-image"><img src={assets.alaskaView} alt="Wildlife view" /></div>
                <div>
                    <h2>{destinationOverview.title}</h2>
                    <p>{destinationOverview.text}</p>
                    {/* <button className="gold">Read More</button> */}
                </div>
            </section>
        </main>
    );
}