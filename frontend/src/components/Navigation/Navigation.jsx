import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

export default function Navigation({ active }) {
  return (
    <header className="nav">
      <Link className="brand" to="/">VOYA</Link>
      <nav className="nav-links" aria-label="Main navigation">
        <Link className={active === "/" ? "active" : ""} to="/">Home</Link>
        <Link className={active === "/plan-a-trip" ? "active" : ""} to="/plan-a-trip">Plan A Trip</Link>
        <Link className={active === "/add-trip" ? "active" : ""} to="/add-trip">Add Trip</Link>
        {localStorage.getItem("User") ?
          <Link className="signup" to="/profile">User Profile</Link>
        :
          <>
            <Link className="signin" to="/signin">Sign In</Link>
            <Link className="signup" to="/signup">Sign Up</Link>
          </>
        }
      </nav>
    </header>
  );
}