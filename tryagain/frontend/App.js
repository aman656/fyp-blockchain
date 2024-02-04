import "./App.css";
import Login from "./Pages/Login/Login";
import Candidate from "./Pages/ECscreen/Candidate";
import Adminlogin from "./Pages/AdminLogin/Adminlogin";
import PollTable from "./Pages/Poll/Poll"; 
import VoteScreen from "./Pages/Votescreen/Votescreen";
import AddElectionForm from "./Pages/AddElection/Addelection";
import ElectionResults from "./Pages/Result/Result";
import AdminHome from "./Pages/AdminHome/AdminHome";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { useState } from "react";
import ElectionNotice from './Pages/Notice/Notice';
import Home from "./Pages/Home/Home";
function App({isSignedIn,contractId,wallet}) {
  const admin = localStorage.getItem("isAdmin");
  const isAuthAdmin = localStorage.getItem("isAuthAdmin");
  let cnic = localStorage.getItem("cnic")
  console.log(typeof(admin));

  const callMethod = async (methodName, args = {}) => {
    wallet.callMethod({
      contractId: contractId,
      method: methodName,
      args: args,
    });
  };

  const viewMethod = async (methodName, args = {}) => {
    return await wallet.viewMethod({
      contractId: contractId,
      method: methodName,
      args: args,
    });
  };
  const getPrompts = async () => {
    return await viewMethod("getAllPrompts");
  };
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route  exact={true} path="/" element={ cnic ? <Home isSignedIn={isSignedIn} contractId={contractId} wallet={wallet} callMethod={callMethod} viewMethod={viewMethod} getPrompts={getPrompts} />: <Login isSignedIn={isSignedIn} contractId={contractId} wallet={wallet} callMethod={callMethod} viewMethod={viewMethod} getPrompts={getPrompts}/>}  />
          {/* <Route exact={true} path="/" element={ cnic ? <PollTable isSignedIn={isSignedIn} contractId={contractId} wallet={wallet} callMethod={callMethod} viewMethod={viewMethod} getPrompts={getPrompts} />: <Login isSignedIn={isSignedIn} contractId={contractId} wallet={wallet} callMethod={callMethod} viewMethod={viewMethod} getPrompts={getPrompts}/>} /> */}
          <Route exact={true} path="/pollList" element={cnic ? <PollTable isSignedIn={isSignedIn} contractId={contractId} wallet={wallet} callMethod={callMethod} viewMethod={viewMethod} getPrompts={getPrompts} /> : <Login isSignedIn={isSignedIn} contractId={contractId} wallet={wallet} callMethod={callMethod} viewMethod={viewMethod} getPrompts={getPrompts}/>} />
          <Route exact={true} path="/poll/:id" element={cnic ? <VoteScreen isSignedIn={isSignedIn} contractId={contractId} wallet={wallet} callMethod={callMethod} viewMethod={viewMethod} getPrompts={getPrompts} />: <Login isSignedIn={isSignedIn} contractId={contractId} wallet={wallet} callMethod={callMethod} viewMethod={viewMethod} getPrompts={getPrompts}/>} />
          <Route exact={true} path="/notice/:id" element={cnic ? <ElectionNotice isSignedIn={isSignedIn} contractId={contractId} wallet={wallet} callMethod={callMethod} viewMethod={viewMethod} getPrompts={getPrompts} />: <Login isSignedIn={isSignedIn} contractId={contractId} wallet={wallet} callMethod={callMethod} viewMethod={viewMethod} getPrompts={getPrompts}/>} />
          <Route exact={true} path="/standings/:id" element={cnic ? <ElectionResults isSignedIn={isSignedIn} contractId={contractId} wallet={wallet} callMethod={callMethod} viewMethod={viewMethod} getPrompts={getPrompts} />: <Login isSignedIn={isSignedIn} contractId={contractId} wallet={wallet} callMethod={callMethod} viewMethod={viewMethod} getPrompts={getPrompts}/>} /> 
          <Route exact={true} path="/home" element={cnic ? <Home isSignedIn={isSignedIn} contractId={contractId} wallet={wallet} callMethod={callMethod} viewMethod={viewMethod} getPrompts={getPrompts} />: <Login isSignedIn={isSignedIn} contractId={contractId} wallet={wallet} callMethod={callMethod} viewMethod={viewMethod} getPrompts={getPrompts}/>} />
          <Route exact={true} path="/admin" element={admin=="true" ? <AdminHome isSignedIn={isSignedIn} contractId={contractId} wallet={wallet} callMethod={callMethod} viewMethod={viewMethod} getPrompts={getPrompts} />:<Adminlogin isSignedIn={isSignedIn} contractId={contractId} wallet={wallet} callMethod={callMethod} viewMethod={viewMethod} getPrompts={getPrompts} />} />
          {/* {isAuthAdmin == true && ( */}
          <Route
            exact={true}
            path="/adminHome"
            element={admin=="true" ? <AdminHome isSignedIn={isSignedIn} contractId={contractId} wallet={wallet} callMethod={callMethod} viewMethod={viewMethod} getPrompts={getPrompts} /> : <Adminlogin isSignedIn={isSignedIn} contractId={contractId} wallet={wallet} callMethod={callMethod} viewMethod={viewMethod} getPrompts={getPrompts} />}
          />
          <Route
            exact={true}
            path="/candid"
            element={admin=="true" ? <Candidate isSignedIn={isSignedIn} contractId={contractId} wallet={wallet} callMethod={callMethod} viewMethod={viewMethod} getPrompts={getPrompts} /> : <Adminlogin isSignedIn={isSignedIn} contractId={contractId} wallet={wallet} callMethod={callMethod} viewMethod={viewMethod} getPrompts={getPrompts} />}
          />


        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
