import React from 'react';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import Card from '../../components/Card/Card';
import { assets } from '../../constants/assets';

export default function HomePage({ explorePopularCities }) {
    return (
        <main className="page home">
            <section className="hero split">
                <div className="hero-copy">
                    <h1>Plan<br />Smoothly<br />With <em>VOYA</em></h1>
                    <br />
                    <div className="actions">
                        <button className="primary">Start Planning</button>
                        <button className="outline">Explore Map</button>
                    </div>
                </div>
                <div className="hero-image blob"><img src={assets.beach} alt="Beach sunset" /></div>
            </section>

            <section className="section">
                <SectionHeading title="Explore Popular Cities" text="Curated experiences from around the world" />
                <div className="city-grid staggered">
                    {explorePopularCities.map(([title, image, time, price], index) => <Card key={title} title={title} image={image} tall={index % 2 === 1} time={time} price={price} />)}
                </div>
            </section>

            <section className="section feature-strip">
                <SectionHeading title="Featured Destinations" text="" />
                <div className="wide-cards">
                    {[assets.aurora, assets.alaskaView, assets.activity1].map((image, index) => (
                        <article className="wide-card" key={image}>
                            <img src={image} alt="" />
                            <div><strong>Alaska: {["Westminster to Greenwich", "Vintage Double Decker", "Magic of London"][index]}</strong><span>$35.00 per person</span></div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="section split wildlife">
                <div className="round-image"><img src={assets.alaskaView} alt="Wildlife view" /></div>
                <div>
                    <h2>Wildlife of Alaska</h2>
                    <p>Amid misty ridgelines and crystalline lakes, Alaska offers a quiet, unforgettable journey through nature and open sky.</p>
                    <button className="gold">Read More</button>
                </div>
            </section>
        </main>
    );
}