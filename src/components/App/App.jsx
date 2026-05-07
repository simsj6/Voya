import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

export default function App() {
    return (
        <div className="App">
            <Navigation />

            <Routes>
                <Route path="/" element={<HomePage />}/>
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