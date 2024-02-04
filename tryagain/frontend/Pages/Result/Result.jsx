import React, { useEffect, useState } from 'react';
import './Result.css';
import { useLocation, useParams } from 'react-router-dom';
import { Rings, Circles } from 'react-loader-spinner';
import Navbar from '../../Components/Navbar';
const ElectionResults = ({ wallet, isSignedIn, contractId, callMethod, viewMethod, getPrompts }) => {
    const [candidates, setCandidates] = useState([]);
    const location = useLocation()
    console.log(location.state)
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    useEffect(() => {

        const getInfo = async () => {
            console.log(typeof (id))
            setLoading(true)
            let out = await getPrompts()
            console.log(out)
            // setPollsData(out)
            let pair = await viewMethod("getCandidatePair", {
                election: id,
                length: location.state.length
            })
            let mappedArray = []
            for (let i = 0; i < pair?.length; i += 3) {
                const obj = {
                    name: pair?.[i],
                    pic: pair?.[i + 2],
                    party: pair?.[i + 1]
                };
                mappedArray.push(obj);
            }
            let voteCount = await viewMethod("getVotes", {
                election: id,
            });
            console.log(pair)
            let updateArray = mappedArray.map((obj, index) => ({
                ...obj,
                votes: voteCount[index]
            }))
            setCandidates(updateArray)
            setLoading(false)
        }
        getInfo()
    }, [])
    console.log(candidates)
    return (
        <>
            <Navbar pollList={"home"} namee={"Home"} />
            <div className="election-results">
                <h2>Election Results</h2>
                {loading ? (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "100px" }}>
                        <Circles
                            type="TailSpin"
                            color="rgb(155, 236, 34)"
                            height={80}
                            width={80}
                            timeout={5000} />
                    </div>
                ) : (
                    <div className="candidate-list">
                        {candidates &&
                            candidates
                                .slice() // create a shallow copy of the array
                                .sort((a, b) => b.votes - a.votes) // sort in descending order based on votes
                                .map((candidate, index) => (
                                    <div className="candidate-card" key={candidate?.id}>
                                        <div className="rank">Rank {index + 1}</div>
                                        <img src={candidate?.pic} alt={candidate?.name} className="candidate-image" />
                                        <div className="candidate-name">{candidate?.name}</div>
                                        <div className="vote-count">
                                            <div className="vote-circle">
                                                <span className="vote-number">{candidate?.votes}</span>
                                            </div>
                                            <div className="vote-label">Votes</div>
                                        </div>
                                    </div>
                                ))}
                    </div>
                )}
            </div>

        </>
    );
};

export default ElectionResults;