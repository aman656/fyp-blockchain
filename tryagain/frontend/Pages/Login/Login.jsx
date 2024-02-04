import React from 'react';
import './Login.css';
import Navbar from '../../Components/Navbar';
import { useState } from 'react';
import { loginAction } from '../../redux/actions/login.action';
import { useDispatch, useSelector } from 'react-redux';
import { Circles } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [numberc, setNumber] = useState()
  const [cnicError, setCnicError] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const submitForm = (e) => {
    e.preventDefault();
    if (numberc.length < 13) {
      setCnicError(true)
    } else {
      setLoading(true)
      dispatch(loginAction({
        cnic: numberc
      })).then((res) => {
        console.log(res)
        if (res.payload.success) {
          localStorage.setItem("cnic", numberc)
          window.location.href = '/home'
          // toast.success("Entry added successfully.", {
          //   position: toast.POSITION.TOP_RIGHT
          // })
        } else {
          console.log("error")
          toast.error(res?.payload?.data?.message, {
            position: toast.POSITION.TOP_RIGHT
          });
          // toast.error('An error occured!', {
          //   position: toast.POSITION.TOP_RIGHT
          // });
        }
        setLoading(false)
      })
    }
  };

  return (
    <div className="Login">
      <Navbar />
      <div className="login-container">
        {!loading ? <form className="login-form" onSubmit={submitForm}>
          <input

            onChange={(e) => {
              setCnicError(false)
              setNumber(e.target.value)
            }}
            placeholder="Enter NIC number"
            value={numberc}
            required
          />
          {cnicError && <p style={{ color: "red", margin: 0, float: "left" }}>Enter valid cnic</p>}
          <button type="submit">Login</button>
        </form> : <Circles
          type="TailSpin"
          color="rgb(155, 236, 34)"
          height={80}
          width={80}
          timeout={5000}
        />}
      </div>
      <ToastContainer hideProgressBar={true} autoClose={2500} />

    </div>
  );
};

export default Login;
