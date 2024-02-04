import React from 'react';
import './Notice.css';
import img from '../../Assets/Images/mega.png'
import Navbar from '../../Components/Navbar';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

const ElectionNotice = () => {
    const location = useLocation()
    // Replace this with the actual date of the election
    const electionDate = '2024-08-15';

    return (
        <>
            <Navbar pollList={"pollList"} namee={"Polls"} />
            <div className="election-notice-container">
                <div className="left-side">
                    <img src={img} alt="Election" className="election-image" />
                </div>
                <div className="right-side">
                    <h2>Election Notice</h2>
                    <p>Polling for this election will start on {location.state.date}.</p>
                </div>
            </div>
        </>
    );
};

export default ElectionNotice;