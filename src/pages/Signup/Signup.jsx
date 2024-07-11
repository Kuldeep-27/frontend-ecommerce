import React, { useState } from 'react'
import "./Signup.scss"
import { NavLink, useNavigate } from 'react-router-dom'
import { axiosClient } from '../../utils/axiosClient';
import toast from "react-hot-toast";

function Signup() {
   const [name,setName] = useState("");
   const [email,setEmail] = useState("");
   const [password,setPassword] = useState("");

   const navigate = useNavigate();

   const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axiosClient.post("/auth/signup",{
        name,
        email,
        password
      })
      toast.success("Account Created Successfully");

      console.log(response);

      navigate("/login");

    } catch(e){
       
    }


   

   }


  return (
    <div className="signup-container">
    <h2>Create New Account</h2>
    <form onSubmit = {handleSubmit} >
        <label htmlFor="username">UserName:</label>
        <input className="input-box" type="text" id="username" onChange={(e)=>setName(e.target.value)} />
        <label htmlFor="email">
            Email:
        </label>
        <input className="input-box" id="email" type="text" onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password:</label>
        <input className="input-box" id="password" type="password" onChange={(e)=>setPassword(e.target.value)} />
        <input className="btn" type="submit" value="Submit" />
    </form>
    <p>Already a user? <NavLink to="/login">Login</NavLink></p>
</div>
  )
}

export default Signup