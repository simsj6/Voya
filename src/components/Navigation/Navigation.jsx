import React from 'react';
import './Navigation.css';

// Temp, just for testing. 
const navItems = [
  { key: "home", label: "Home" },
  { key: "destinations", label: "Popular Destinations" },
  { key: "plan", label: "Plan A Trip" },
  { key: "map", label: "Map" },
  { key: "profile", label: "User Profile" },
];

export default function Navigation({ active }) {
    return (
        <header className="nav">
            <button className="brand">VOYA</button>
            <nav className="nav-links" aria-label="Main navigation">
                {navItems.map((item) => (
                    <button className={active === item.key ? "active" : ""} key={item.key}>
                        {item.label}
                    </button>
                ))}
                <button className="signin">Sign In</button>
            </nav>
        </header>
    );
}