import React, { useEffect, useMemo, useState } from 'react';
import './Poll.css';
import Navbar from '../../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import { eligibleCheck } from '../../redux/actions/eligible.action';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BarLoader } from 'react-spinners'


const PollTable = ({ wallet, isSignedIn, contractId, callMethod, viewMethod, getPrompts }) => {
    const dispatch = useDispatch()
    const cnic = localStorage.getItem("cnic")
    const checkEligiblity = async (poll, pollDate, status, length) => {
        if (status == "Upcoming") {
            navigate(`/notice/${poll}`, { state: { pollName: poll, date: pollDate, status } })
        }
        else if (status == "Ongoing") {
            dispatch(eligibleCheck({
                cnic
            })).then((res) => {
                console.log(res)
                if (res?.payload?.success) {
                    console.log("success")
                    if (res.payload.eligible == true) {
                        navigate(`/poll/${poll}`, { state: { pollName: poll, length } })
                    } else {
                        toast.info("You are not eligible to cast vote", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                } else {
                    console.log("error")
                    toast.error("An error occured", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }

            })
        } else {
            navigate(`/standings/${poll}`, { state: { pollName: poll, length } })
        }


    }

    const [pollsData, setPollsData] = useState([])
    const navigate = useNavigate()

    useMemo(() => {
        const getInfo = async () => {
            let out = await getPrompts()
            console.log(out)
            let mappedArray = []
            for (var i = 0; i < out?.length; i++) {
                let arr = out?.[i]?.split(",")
                let obj = {
                    name: arr[0],
                    date: arr[1],
                    length: arr[2]
                }
                if (arr[1] == new Date().toISOString().split('T')[0]) {
                    obj.status = "Ongoing"
                    console.log("ongoing", new Date().toISOString())
                } else if (arr[1] > new Date().toISOString().split('T')[0]) {
                    obj.status = "Upcoming"
                    console.log("Upcoming", new Date().toISOString())
                } else {
                    obj.status = "Ended"
                }
                mappedArray.push(obj)
            }
            setPollsData(mappedArray)
        }
        getInfo()
    }, [])

    const clearArray = async () => {
        const data = await callMethod("clearElectionArr");
        setTimeout(() => {
            toast.info("Poll List Cleared", {
                position: toast.POSITION.TOP_RIGHT
            })
        })
    }

    return (
        <div>
            <Navbar wallet={wallet} isSignedIn={isSignedIn} pollList={"home"} namee={"Home"} />
            <div className="poll-table-container">
                <table className="poll-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>List of Polls</th>
                            <th>Election Date</th>
                            <th>Status</th>
                            <th>Go to Poll</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pollsData?.map((poll, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{poll.name}</td>
                                <td>{poll.date}</td>
                                <td>{poll.status}</td>
                                <td>
                                    <button className="go-to-poll-button" onClick={() => checkEligiblity(poll.name, poll.date, poll.status, poll.length)}
                                    //  (poll) => {

                                    //     // navigate(`/poll/${poll}`, { state: { pollName: poll } })

                                    // }}
                                    >Go to Poll</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* <div style={{ float: "right", marginTop: "20px" }}>
                <button onClick={clearArray}>Clear List</button>
            </div> */}
            <ToastContainer hideProgressBar={true} autoClose={2500} />
        </div>
    );
};

export default PollTable;