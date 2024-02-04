import React from 'react';
import './Banner.css';
import bannerimg from '../Assets/Images/banner_2.jpg'

const Banner = () => {
    return (
        <div className="banner-container">
            <img
                src={bannerimg}
                alt="Banner"
                className="banner-image"
            />
            <div className="banner-text-container">
                <h1 className="animated-text">Make your decision-making process modern, secure, and effective.</h1>
                <p className="sub-text">
                    Upgrade from manually counting ballots to an online election system without scarificing the integrity of your vote.
                </p>
            </div>
        </div>
    );
};

export default Banner;