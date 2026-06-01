import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div>
                <h2>VOYA</h2>
                <p>Plan your journey with elegance and ease. We bring you the finest destinations with a touch of sophistication.</p>
            </div>
            <div className="footer-links">
                <div>
                    <h3>Company</h3>
                    <a>About Us</a>
                    <Link to="/popular-destinations">Popular Destinations</Link>
                    <Link to="/plan-a-trip">Plan A Trip</Link>
                    <Link to="/add-trip">Add Trip</Link>
                </div>
                <div>
                    <h3>Support</h3>
                    <a>Contact us</a>
                    <a>FAQs</a>
                    <a>Privacy policy</a>
                    <a>Sitemap</a>
                </div>
            </div>
            <div className="footer-bottom">
                <span>Copyright 2026 Voya. All Rights Reserved</span>
                <span className="socials"><i>f</i><i>t</i><i>i</i><i>p</i></span>
            </div>
        </footer>
    );
}