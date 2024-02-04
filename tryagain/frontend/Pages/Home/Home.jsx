import React from 'react';
import StaticBanner from '../../Components/Banner';
import Navbar from '../../Components/Navbar';
import Midcomp from '../../Components/Midcomp';
import AboutUs from '../../Components/About';
import Footer from '../../Components/Footer'
import Abouts from '../../Components/Abouts';

const Home = () => {
    return (
        <div>
            <Navbar pollList={"pollList"} namee={"Polls"} />
            <StaticBanner />
            <Midcomp />
            <Abouts />
            <AboutUs />
            <Footer />
        </div>
    );
};


export default Home
