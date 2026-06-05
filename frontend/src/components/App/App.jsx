import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import HomePage from '../../pages/HomePage/HomePage';
import PopularDestinations from '../../pages/PopularDestinations/PopularDestinations';
import PlanTrip from '../../pages/PlanTrip/PlanTrip';
import Map from '../../pages/Map/Map';
import Profile from '../../pages/Profile/Profile';
import Trips from '../../pages/Profile/Trips';
import SharedTrips from '../../pages/Profile/SharedTrips';
import SignInForm from '../../forms/SignInForm';
import SignupForm from '../../forms/SignupForm';
import AddTrip from '../../pages/AddTrip/AddTrip';
import Destination from '../../pages/Destination/Destination';
import PageNotFound from '../../pages/PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute';
import "./App.css";
import { assets } from '../../constants/assets';
import ScrollToTop from "../ScrollToTop/ScrollToTop";

export default function App() {
    const location = useLocation();
    
    return (
        <div className="App">
            <Toaster />
            <Navigation active={location.pathname}/>

            <div className="content">
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<HomePage />}/>
                    <Route path="/popular-destinations" element={<PopularDestinations />}/>
                    <Route path="/plan-a-trip" element={<PlanTrip />}/>
                    <Route path="/add-trip" element={<AddTrip />}/>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/profile" element={<Profile active={location.pathname} />}/>
                        <Route path="/trips" element={<Trips active={location.pathname} />}/>
                        <Route path="/shared-trips" element={<SharedTrips active={location.pathname} />}/>
                    </Route>
                    <Route path="/signin" element={<SignInForm />}/>
                    <Route path="/signup" element={<SignupForm />}/>
                    <Route path="/destination/:destinationId" element={<Destination />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </div>

            <Footer />
        </div>
    )
}
