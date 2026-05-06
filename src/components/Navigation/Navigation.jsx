import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

export default function Navigation({ active }) {
    return (
        <header className="nav">
            <button className="brand">VOYA</button>
            <nav className="nav-links" aria-label="Main navigation">
                <Link to="/">Home</Link>
                <Link to="/popular-destinations">Popular Destinations</Link>
                <Link to="/plan-a-trip">Plan A Trip</Link>
                <Link to="/map">Map</Link>
                <Link to="/profile">User Profile</Link>
                <Link to="/signin">Sign In</Link>
            </nav>
        </header>
    );
}