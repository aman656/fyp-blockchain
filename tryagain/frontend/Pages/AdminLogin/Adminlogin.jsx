import React, { useState } from 'react';
import './Adminlogin.css';
import Navbar from '../../Components/Navbar';
import { adminLogin } from '../../redux/actions/admin.action';
import { useDispatch, useSelector } from 'react-redux';
import { Circles } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../Components/AdminNavbar';

const Adminlogin = () => {
  const [name, setName] = useState("")
  const [password, setPass] = useState("")
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true)
    dispatch(adminLogin({
      name,
      password
    })).then((res) => {
      console.log(res)
      if (res.payload.success) {
        console.log("success")
        localStorage.setItem("isAdmin", true)
        // navigate("/candid")
        window.location.href = "/adminHome"
      } else {
        console.log("error")
        toast.error(res?.payload?.data?.message, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
      setName("")
      setPass("")
      setLoading(false)
    })

  };


  return (
    <div className="Login">
      <AdminNavbar />
      <div className="login-container">
        {!loading ? <form className="login-form" onSubmit={submitForm}>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
            placeholder="Enter User name"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPass(e.target.value)
            }}
            placeholder="Enter password"
            required
          />
          <button type="submit">Login</button>
        </form> : <Circles
          type="TailSpin"
          color="rgb(155, 236, 34)"
          height={80}
          width={80}
          timeout={5000} />}
      </div>
      <ToastContainer hideProgressBar={true} autoClose={2500} />
    </div>
  );
};

export default Adminlogin;
