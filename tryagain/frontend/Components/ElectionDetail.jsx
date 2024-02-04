import React, { useState } from 'react';
import './ElectionDetail.css';


const AddElectionForm = ({ setDate, dates }) => {
    const [electionName, setElectionName] = useState('');
    // const [date, setDate] = useState('');
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

        <div className="add-election-form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Election Name:</label>
                    <input
                        type="text"
                        value={dates.election}
                        onChange={(e) => setDate((dates) => ({ ...dates, election: e.target.value }))}
                        required
                    />
                    <label id='label-date'>Date:</label>
                    <input
                        type="date"
                        value={dates.date}
                        onChange={(e) => setDate((dates) => ({ ...dates, date: e.target.value }))}
                        required
                    />
                    <label htmlFor=''>Start Time:</label>
                    <input
                        type="time"
                        value={dates.startTime}
                        onChange={(e) => setDate((dates) => ({ ...dates, startTime: e.target.value }))}
                        required
                    />
                    <label>End Time:</label>
                    <input
                        type="time"
                        value={dates.endTime}
                        onChange={(e) => setDate((dates) => ({ ...dates, endTime: e.target.value }))}
                        required
                    />
                </div>
                {/* <button type="submit">Save</button> */}
            </form>
        </div>

    );
};

export default AddElectionForm;