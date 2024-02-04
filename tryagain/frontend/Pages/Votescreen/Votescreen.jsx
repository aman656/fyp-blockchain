// VoteScreen.jsx
import React, { useState, useEffect } from 'react';
import './Votescreen.css';
import Navbar from '../../Components/Navbar';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Rings, Circles } from 'react-loader-spinner';
import { toast, ToastContainer } from 'react-toastify'



const VoteScreen = ({ wallet, isSignedIn, contractId, callMethod, viewMethod, getPrompts }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false)
  const [isVote, setisVote] = useState()
  const navigate = useNavigate()
  const [lastMessage, setLastMessage] = useState("")
  const cnic = localStorage.getItem("cnic")
  const location = useLocation()
  const { id } = useParams()
  console.log(id)
  // console.log(id, "177777777")

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
      // setCandidates(mappedArray)
      console.log(pair)
      let voteCount = await viewMethod("getVotes", {
        election: id,
      });
      console.log(voteCount)

      let updateArray = mappedArray.map((obj, index) => ({
        ...obj,
        votes: voteCount[index]
      }))
      setCandidates(updateArray)
      console.log(voteCount)
      let didUserVote = await viewMethod("didParticipate", {
        election: id,
        user: cnic,
      });
      setisVote(didUserVote)
      console.log(candidates)
      console.log("did user vote", didUserVote);
      setLoading(false)
    }
    getInfo()
  }, [])
  console.log(candidates)
  const addVote = async (index) => {

    setLoading(true)
    await callMethod("addVote", {
      election: id,
      index: index,
      length: location.state.length
    })
    let vote = await callMethod("recordUser", {
      election: id,
      user: cnic,
    });
    setTimeout(async () => {
      toast.success("Voted Successfully", {
        position: toast.POSITION.TOP_RIGHT
      })
      let voteCount = await viewMethod("getVotes", {
        election: id,
      });
      candidates[0].votes = voteCount[0]
      candidates[1].votes = voteCount[1]
      let isVoted = await viewMethod("didParticipate", {
        election: id,
        user: cnic,
      })
      setisVote(true)
      setLastMessage("You have successfully casted your vote.Thanks for being a responsible citizen.You can see the result tomorrow 00:01 ")
      console.log("71", voteCount)
      console.log("72", isVoted)
      setLoading(false)
    }, 10000)
    // let mytime = setTimeout(vote, 5000)
    // clearTimeout(mytime)
    // toast.success("Voted Successfully", {
    //   position: toast.POSITION.TOP_RIGHT
    // })
  };



  // const addVote = async (index) => {
  //   await addVote1(index)
  // }
  return (
    <div className="App">
      <Navbar wallet={wallet} isSignedIn={isSignedIn} pollList={"pollList"} namee={"Polls"} />
      {loading ?
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "300px" }}>
          <Circles
            type="TailSpin"
            color="rgb(155, 236, 34)"
            height={80}
            width={80}
            timeout={5000} /></div> :
        <div className="candidates-row">
          {isVote == true && <div>
            {lastMessage == "" ? <p style={{ color: "red" }}>You have already voted for this election.Thanks for being a responsible citizen.<br /> You can see the result tomorrow 00:01 </p> : <p style={{ color: "red" }}>{lastMessage}</p>}
            <div>
              <div className="vote-button-container">
                <button onClick={() => {

                  navigate("/pollList")
                }}>Go Back</button>
              </div>
              {/* <div className="vote-button-container">

                <button onClick={() => {
                  navigate(`/standings/${id}`, { state: { pollName: id, length: location.state.length } })
                }}>See Standings</button>
              </div> */}
            </div>
          </div>}
          {isVote == false && <div className="candidates-grid">
            {candidates?.map((candidate, index) => (
              <div className="candidate-card" key={index}>
                <img src={candidate.pic} alt={candidate.name} className="candidate-image" />
                <h3>{candidate.name}</h3>
                <p>{candidate.party}</p>
                {/* <img src={candidate.partyIcon} alt={`Party Icon ${candidate.party}`} className="party-icon" /> */}
                <div className="vote-button-container">
                  <button onClick={() => {
                    console.log(index)
                    addVote(index)
                  }}>Vote</button>
                </div>
                {/* <div>{candidate.votes}</div> */}
              </div>


            ))}

          </div>}
        </div>}
      <ToastContainer hideProgressBar={false} autoClose={2500} style={{ width: "500px", textAlign: "center" }} />
    </div>
  );
};

export default VoteScreen;
