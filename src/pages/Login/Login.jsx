import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "./Login.scss"
import { axiosClient } from '../../utils/axiosClient';
import { KEY_ACCESS_TOKEN, setItem } from '../../utils/localStorageManager';
import toast from "react-hot-toast";

function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await axiosClient.post("/auth/login",{
        email,
        password
      });

      toast.success("Login Successfully");
      setItem(KEY_ACCESS_TOKEN,response.result.token);
      navigate("/");

    } catch(e){
      
    }

  }


  return (
    <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} >
            <label htmlFor="email">
                Email:
            </label>
            <input className="input-box" id="email" type="text" onChange={(e)=>setEmail(e.target.value)} />
            <label htmlFor="password">Password:</label>
            <input className="input-box" id="password" type="password" onChange={(e)=>setPassword(e.target.value)} />
            <input className="btn" type="submit" value="Submit" />
        </form>
        <p>Don't have account? <NavLink to="/signup">Signup</NavLink></p>
    </div>
  )
}

export default Login