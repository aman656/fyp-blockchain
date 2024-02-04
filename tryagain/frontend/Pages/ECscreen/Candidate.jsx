import React, { useEffect, useState, CSSProperties } from 'react';
import './Candidate.css';
import Navbar from '../../Components/Navbar';
import CandidateForm from '../../Components/CandidateForm';
import AddElectionForm from '../../Components/ElectionDetail';
import { storage } from '../../firebase'
import { v4 } from 'uuid'
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { BarLoader } from 'react-spinners'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavbar from '../../Components/AdminNavbar';

const Candidate = ({ wallet, isSignedIn, contractId, callMethod, viewMethod, getPrompts }) => {
  const [candidates, setCandidates] = useState([
  ]);
  const [election, setElection] = useState("44")
  const [numForms, setnumForms] = useState(2)
  const [dates, setDate] = useState({ election, date: "", startTime: "", endTime: "" })
  const [add1, setAdd1] = useState({ name: "", party: "", imagecc: null })
  const [add2, setAdd2] = useState({ name: "", party: "", imagecc: null })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleAddCandidate = (newCandidate) => {
    setCandidates([...candidates, newCandidate]);
  };

  const handleDeleteCandidate = (id) => {
    const updatedCandidates = candidates.filter((candidate) => candidate.id !== id);
    setCandidates(updatedCandidates);
  };

  const handleCandidateChange = (event, id, field) => {
    const updatedCandidates = candidates.map((candidate) => {
      if (candidate.id === id) {
        return { ...candidate, [field]: event.target.value };
      }
      return candidate;
    });

    setCandidates(updatedCandidates);
  };
  const getUrl = async (imagec) => {
    let ar;
    if (imagec == null) {
      console.log("Empty")
      return
    }
    try {
      const imageRef = ref(storage, `images/${imagec.name + v4()}`)
      const snapshot = await uploadBytes(
        imageRef, imagec
      );
      const url = await getDownloadURL(snapshot.ref)
      return url
    } catch (error) {
      console.log(error);
      return "error"
    }
  }
  const handleSaveCandidates = async () => {
    setLoading(true)
    console.log(dates, candidates)
    let a = []
    for (var i = 0; i < candidates.length; i++) {
      const data = await getUrl(candidates[i].imagec)
      a.push(candidates[i].name)
      a.push(candidates[i].party)
      a.push(data)
    }
    await callMethod("addFightingPair", {
      election: dates.election,
      data: a
    })
    await callMethod('addtoElectionArr', {
      election: dates.election + "," + dates.date + "," + numForms
    })
    await callMethod('initializeVote', {
      election: dates.election, length: numForms
    })

    console.log("Saved................ to blockchain")
    setTimeout(() => {
      setLoading(false)
      setMessage("Done")
    }, 12000)
  };
  const handleArray = async () => {
    await callMethod('clearElectionArr', {
    })

  }
  const handleAddForm = () => {
    setnumForms((numForms) => numForms + 1);
  };
  console.log(numForms)
  return (
    <div className="App">
      <AdminNavbar wallet={wallet} isSignedIn={isSignedIn} pollList={"adminHome"} namee={"Home"} />
      {(loading == false && message == "") && <div className="candidates-row container">
        <h2 style={{ margin: 0, padding: 0, color: "Black" }}>Add Election Detail</h2>
        <AddElectionForm setDate={setDate} dates={dates} />
        <div className="candidates-grid row">
          {[...Array(numForms)].map((_, index) => (
            <div className="candidate-form col" key={index}>
              <h2>Add New Candidate</h2>
              <CandidateForm onAddCandidate={handleAddCandidate} setCandidates={setCandidates} index={index} candidate={candidates} />
            </div>
          ))}
        </div>
        <div className="add-form-icon" onClick={handleAddForm}>
          <FontAwesomeIcon icon={faPlus} className="plus-icon" />
        </div>

        <div className="save-button-container">
          <button className="save-button" onClick={handleSaveCandidates}>
            Save
          </button>
        </div>
      </div>}
      {(loading == true && message == "") && <div style={{ marginTop: "300px", }}>
        <BarLoader width={600} height={20} color='#bffa60' cssOverride={{ display: "block", margin: "0rem auto" }} />
        <p>Please wait, we are processing all the data...</p>
      </div>}
      {loading == false && message == "Done" &&
        <div style={{ marginTop: "130px", }}>
          <p>Election with candidates have been created successfully.</p>
        </div>
      }
    </div>
    // <div className="App">
    //   <Navbar wallet={wallet} isSignedIn={isSignedIn} className="can-nav" />
    //   {(loading == false && message == "") && <div className="candidates-row container">
    //     <AddElectionForm />
    //     <div className="candidates-grid row">
    //       {candidates.map((candidate) => (
    //         <div className="candidate-card" key={candidate.id}>
    //           <img
    //             src={candidate.image}
    //             alt={candidate.name}
    //             type="file"
    //             className="candidate-image"
    //           />
    //           <input
    //             type="text"
    //             value={candidate.name}
    //             onChange={(event) => handleCandidateChange(event, candidate.id, 'name')}
    //             placeholder="Candidate Name"
    //           />
    //           <input
    //             type="text"
    //             value={candidate.party}
    //             onChange={(event) => handleCandidateChange(event, candidate.id, 'party')}
    //             placeholder="Party Name"
    //           />
    //           <img
    //             src={candidate.partyIcon}
    //             alt={`Party Icon ${candidate.party}`}
    //             className="party-icon"
    //           />
    //           <div className="delete-icon" onClick={() => handleDeleteCandidate(candidate.id)}>
    //             &#x2715;
    //           </div>
    //         </div>
    //       ))}

    //       {[...Array(numForms)].map((_, index) => (
    //         <div className="candidate-form col" key={index}>
    //           <h2>Add New Candidate</h2>
    //           <CandidateForm onAddCandidate={handleAddCandidate} />
    //         </div>
    //       ))}
    //     </div>
    //     <div className="add-form-icon" onClick={handleAddForm}>
    //       <FontAwesomeIcon icon={faPlus} className="plus-icon" />
    //     </div>

    //     <div className="save-button-container">
    //       <button className="save-button" onClick={handleSaveCandidates}>
    //         Save
    //       </button>
    //     </div>
    //   </div>}

    //   {/* {(loading == false && message == "") && <div className="candidates-row">
    //     <AddElectionForm />


    //     <div className="candidates-grid">
    //       {candidates.map((candidate) => (
    //         <div className="candidate-card" key={candidate.id}>
    //           <img
    //             src={candidate.image}
    //             alt={candidate.name}
    //             type="file"
    //             className="candidate-image"
    //           />
    //           <input
    //             type="text"
    //             value={candidate.name}
    //             onChange={(event) => handleCandidateChange(event, candidate.id, 'name')}
    //             placeholder="Candidate Name"
    //           />
    //           <input
    //             type="text"
    //             value={candidate.party}
    //             onChange={(event) => handleCandidateChange(event, candidate.id, 'party')}
    //             placeholder="Party Name"
    //           />
    //           <img
    //             src={candidate.partyIcon}
    //             alt={`Party Icon ${candidate.party}`}
    //             className="party-icon"
    //           />
    //           <div className="delete-icon" onClick={() => handleDeleteCandidate(candidate.id)}>
    //             &#x2715;
    //           </div>
    //         </div>
    //       ))}

    //       <div className="candidate-form">
    //         <h2>Add New Candidate</h2>
    //         <CandidateForm onAddCandidate={handleAddCandidate} add1={add1} setAdd1={setAdd1} type="one" />
    //       </div>

    //       <div className="candidate-form">
    //         <h2>Add New Candidate</h2>
    //         <CandidateForm onAddCandidate={handleAddCandidate} add2={add2} setAdd2={setAdd2} type="two" />
    //       </div>
    //     </div>

    //     <div className="save-button-container">
    //       <button className="save-button" onClick={handleSaveCandidates}>
    //         Save
    //       </button>
    //     </div>
    //   </div>} */}
    //   {(loading == true && message == "") && <div style={{ marginTop: "130px", }}>
    //     <BarLoader width={600} height={20} color='#bffa60' cssOverride={{ display: "block", margin: "0rem auto" }} />
    //     <p>Please wait, we are processing all the data...</p>
    //   </div>}
    //   {loading == false && message == "Done" &&
    //     <div style={{ marginTop: "130px", }}>
    //       <p>Election with candidates have been created successfully.</p>
    //     </div>
    //   }
    // </div>
  );
};

export default Candidate;