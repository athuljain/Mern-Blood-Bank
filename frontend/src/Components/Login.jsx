import React from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { mycontx } from './Context';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../CSS/Login.css'

export default function Login() {
    
    const{email,setMail,password,setPassword}=useContext(mycontx);

    const nav=useNavigate()
    const log =async () =>{
      if(!email||!password)
      {
        alert("please fill all fields")
      }
      try {
        const response =await axios.post("http://localhost:8000/user/login",{
        email,password
    });
    if(response.status===200){
      alert("Login successfuly");
      nav("/Donate")
  }
  else{
      alert("login failed");
  }
    }
    catch (error){
      console.error("Error:", error.response ? error.response.data : error.message);
            alert("Login failed. Please check your credentials.");

            
      
    }
  }
 
    return (
    <div className='login'>
    <h1 className='h1-login'>Login</h1>
    <div className='login-input'>
   
    <input type="email" value={email} placeholder='Email' onChange={(e) =>setMail(e.target.value)}/><br></br>
    <input type="password" value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)}/><br></br><br></br>
    <button onClick={log}>Login</button>
    <h5 className='log-reg'>don't have an account?<Link to='/Register'>Register Here</Link></h5>
    </div>
  </div>
  )
}
