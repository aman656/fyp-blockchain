import React, { useState } from 'react';
import './Addelection.css';
import Navbar from '../../Components/Navbar';
import img1 from '../../Assets/Images/img1.png'

const AddElectionForm = ({ onSaveElection }) => {
    const [electionName, setElectionName] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newElection = {
            name: electionName,
            date,
            startTime,
            endTime,
        };
        onSaveElection(newElection);
        // Clear form fields after submission
        setElectionName('');
        setDate('');
        setStartTime('');
        setEndTime('');
    };

    return (
        <div>
            <div className="add-election-form">
                <img src={img1} alt="" />
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Election Name:</label>
                        <input
                            type="text"
                            value={electionName}
                            onChange={(e) => setElectionName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Start Date:</label>
                        <input
                            type="date"
                            value={electionName}
                            onChange={(e) => setElectionName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>End Date:</label>
                        <input
                            type="date"
                            value={electionName}
                            onChange={(e) => setElectionName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Date:</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Start Time:</label>
                        <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>End Time:</label>
                        <input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default AddElectionForm;