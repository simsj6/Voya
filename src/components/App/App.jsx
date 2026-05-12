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
    ["Alaska: Westminster to Greenwich River Thames", assets.aurora, "2 Hours", "$35.00"],
    ["Alaska: Vintage Double Decker Bus Tour & Thames", assets.alaska, "4 Hours", "$12.00"],
    ["Alaska: Magic of London Tour with Afternoon Tea", assets.lake, "1 Hour", "$40.00"],
    ["Alaska: Volcanic Landscapes", assets.trees, "30 Minutes", "$5.00"],
];

const featuredDestinations = [
    ["Alaska: Westminster to Greenwich", assets.aurora, "$35.00"],
    ["Alaska: Vintage Double Decker", assets.alaskaView, "$35.00"],
    ["Alaska: Magic of London", assets.activity1, "$35.00"],
];

export default function App() {
    const location = useLocation();
    
    return (
        <div className="App">
            <Navigation active={location.pathname}/>

            <Routes>
                <Route path="/" element={<HomePage popularCities={popularCities} featuredDestinations={featuredDestinations} />}/>
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