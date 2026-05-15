import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import HomePage from '../../pages/HomePage/HomePage';
import PopularDestinations from '../../pages/PopularDestinations/PopularDestinations';
import PlanTrip from '../../pages/PlanTrip/PlanTrip';
import Map from '../../pages/Map/Map';
import Profile from '../../pages/Profile/Profile';
import SignInForm from '../../forms/SignInForm';
import SignupForm from '../../forms/SignupForm';
import AddTrip from '../../pages/AddTrip/AddTrip';
import Activity from '../../pages/Activity/Activity';
import { assets } from '../../constants/assets';

const popularCities = [
    {
        title: "Alaska: Westminster to Greenwich River Thames",
        image: assets.aurora,
        timeMinutes: 120,
        price: 35,
    },
    {
        title: "Alaska: Vintage Double Decker Bus Tour & Thames",
        image: assets.alaska,
        timeMinutes: 240,
        price: 12,
    },
    {
        title: "Alaska: Magic of London Tour with Afternoon Tea",
        image: assets.lake,
        timeMinutes: 60,
        price: 40,
    },
    {
        title: "Alaska: Volcanic Landscapes",
        image: assets.trees,
        timeMinutes: 30,
        price: 5,
    },
]

const featuredDestinations = [
    {
        title: "Alaska: Westminster to Greenwich",
        image: assets.aurora,
        price: 35,
    },
    {
        title: "Alaska: Vintage Double Decker",
        image: assets.alaskaView,
        price: 35,
    },
    {
        title: "Alaska: Magic of London",
        image: assets.activity1,
        price: 35,
    },
];

const destinationOverview = {
    title: "Wildlife of Alaska",
    text: "Amid misty ridgelines and crystalline lakes, Alaska offers a quiet, unforgettable journey through nature and open sky.",
}

export default function App() {
    const location = useLocation();
    
    return (
        <div className="App">
            <Navigation active={location.pathname}/>

            <Routes>
                <Route path="/" element={<HomePage popularCities={popularCities} featuredDestinations={featuredDestinations} destinationOverview={destinationOverview} />}/>
                <Route path="/popular-destinations" element={<PopularDestinations cards={popularCities} />}/>
                <Route path="/plan-a-trip" element={<PlanTrip />}/>
                <Route path="/map" element={<Map />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/signin" element={<SignInForm />}/>
                <Route path="/signup" element={<SignupForm />}/>
                <Route path="/add-trip" element={<AddTrip />}/>
                <Route path="/activity" element={<Activity />} />
            </Routes>

            <Footer />
        </div>
    )
}