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

// This will be fetched from some api later, this is for testing
const assets = {
    beach: "/assets/voya-beach.png",
    alaska: "/assets/voya-alaska.jpg",
    aurora: "/assets/voya-aurora.jpg",
    lake: "/assets/voya-lake.jpg",
    trees: "/assets/voya-trees.jpg",
    alaskaView: "/assets/voya-alaska-view.png",
    activity1: "/assets/voya-activity1.png",
    activity2: "/assets/voya-activity2.png",
    activity3: "/assets/voya-activity3.png",
    activity4: "/assets/voya-activity4.png",
    map: "/assets/voya-map.png",
    villa: "/assets/voya-villa.jpg",
    amalfi: "/assets/voya-amalfi.png",
    kyoto: "/assets/voya-kyoto.png",
    river: "/assets/voya-river.png",
    tower: "/assets/voya-tower.png",
    market: "/assets/voya-market.png",
    coast: "/assets/voya-coast.png",
    stonehenge: "/assets/voya-stonehenge.png",
    oxford: "/assets/voya-oxford.png",
    mountainView: "/assets/voya-mountain-view.jpg",
    gallery1: "/assets/voya-gallery1.jpg",
    gallery2: "/assets/voya-gallery2.jpg",
    gallery3: "/assets/voya-gallery3.jpg",
    gallery4: "/assets/voya-gallery4.jpg",
    basemap: "/assets/voya-basemap.png",
    profile: "/assets/voya-profile.jpg",
};

const explorePopularCities = [
    ["Alaska: Westminster to Greenwich River Thames", assets.aurora, "2 Hours", "$35.00"],
    ["Alaska: Vintage Double Decker Bus Tour & Thames", assets.alaska, "4 Hours", "$12.00"],
    ["Alaska: Magic of London Tour with Afternoon Tea", assets.lake, "1 Hour", "$40.00"],
    ["Alaska: Volcanic Landscapes", assets.trees, "30 Minutes", "$5.00"],
];

export default function App() {
    const location = useLocation();
    
    return (
        <div className="App">
            <Navigation active={location.pathname}/>

            <Routes>
                <Route path="/" element={<HomePage explorePopularCities={explorePopularCities} />}/>
                <Route path="/popular-destinations" element={<PopularDestinations />}/>
                <Route path="/plan-a-trip" element={<PlanTrip />}/>
                <Route path="/map" element={<Map />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/signin" element={<SignInForm />}/>
                <Route path="/signup" element={<SignupForm />}/>
                <Route path="/add-trip" element={<AddTrip />}/>
            </Routes>

            <Footer />
        </div>
    )
}