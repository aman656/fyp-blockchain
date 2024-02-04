import React, { useState } from "react"
import './Navbar.css'
import flag from '../Assets/Images/flag.webp'
import { Link } from "react-router-dom";

const Navbar = ({ wallet, isSignedIn, pollList, namee }) => {
  let isLoggedIn = localStorage.getItem("cnic")
  const handleLogout = () => {

    localStorage.removeItem("cnic")
    window.location.href = "/"

  }
  const connectWallet = async () => {
    if (!isSignedIn) {
      await wallet.signIn()
    } else {
      await wallet.signOut()
    }
  }

  return (
    <div className="navbar fixed-top">
      <h1 className="navbar-heading">E Voting</h1>
      <ul className="navbar-links">
        {/* <li>
          <Link to="/">Home</Link>
        </li> */}
        {/* {isLoggedIn ? ( */}
        <>
          <li>
            <Link to={"/" + pollList} >
              {namee}
            </Link>
          </li>
          {localStorage.getItem("cnic") && <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>}
          {/* <li>
            <div onClick={connectWallet}>
              <span role="img" aria-label="Wallet" className="wallet">
                💰
              </span>
            </div>
          </li> */}
        </>
        {/* ) : ( */}
        {/* <img
            src={flag}
            alt="Pakistan Flag"
            className="navbar-flag"
          />
        )} */}
      </ul>
    </div>
  );
};
export default Navbar;
