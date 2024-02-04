import React from 'react';
import StaticBanner from '../../Components/Banner';
import Navbar from '../../Components/Navbar';
import Midcomp from '../../Components/Midcomp';
import AboutUs from '../../Components/About';
import Footer from '../../Components/Footer'
import Abouts from '../../Components/Abouts';
import AdminNavbar from '../../Components/AdminNavbar';

const AdminHome = () => {
    return (
        <div>
            <AdminNavbar pollList={"candid"} namee={"Create Poll"} />
            <StaticBanner />
            <Midcomp />
            <Abouts />
            <AboutUs />
            <Footer />
        </div>
    );
};


export default AdminHome
