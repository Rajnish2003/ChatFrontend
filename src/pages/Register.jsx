import React, { useState,useEffect } from 'react'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios  from 'axios';
import { registerRoute } from '../utils/APIroutes';

const Register = () => {
    const navigate=useNavigate();
    const [value,setValue]=useState({
        username:"",
        email:"",
        password:"",
        cpassword:""
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(handleValidation()){
            const {password ,username,email}=value;
            const {data}=await axios.post(registerRoute,{
                username,
                email,
                password
            });
            if(data.status===false){
                toast.error(data.msg,toastOptions);
            }else if(data.status===true){
                localStorage.setItem("chat-app-user",JSON.stringify(data.user));
                navigate("/setAvatar");
            } 
        }else{

        }
    }
    const handleChange = (e) => {
        setValue({...value,[e.target.name]:e.target.value});
    }
    const toastOptions={
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:'light'
    };
    useEffect(()=>{
        if(localStorage.getItem('chat-app-user')){
          navigate('/');
        }
      },[]);
      
    const handleValidation=()=>{
        const {password,cpassword,username,email}=value;
        if(password!==cpassword){
            toast.error("Password and confirm password not same",toastOptions);
            return false;
        }else if(username.length<3){
            toast.error("Username should be greater than 3 character",toastOptions);
            return false;
        }else if(password.length<8){
            toast.error("Password should be greater or equal to 8 length",toastOptions);
            return false;
        }else if(email===""){
            toast.error("email is required",toastOptions);
            return false;
        }else
          return true;

    }
    return (
        <div  className='hero' >
        <div className="register">
            <div className='center'>
                    <div className='image'>
                        <img src="favicon.png" alt="" srcset="" />
                    </div>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="txt_field">
                        <input type="text" name="username" autoComplete="off" onChange={handleChange} />
                        <span></span>
                        <label>Username:</label>
                    </div>
                    <div className="txt_field">
                        <input type="email" name="email" autoComplete="off" onChange={handleChange} />
                        <span></span>
                        <label>Email:</label>
                    </div>
                    <div className="txt_field">
                        <input type="password" name="password" autoComplete="off" onChange={handleChange} />
                        <span></span>
                        <label>Password:</label>
                    </div>
                    <div className="txt_field">
                        <input type="password" name="cpassword" autoComplete="off" onChange={handleChange} />
                        <span></span>
                        <label>Confirm Password:</label>
                    </div>
                    <button className="btn-reg">Register</button>
                    <span className='btn-switch' >Already have an account? <Link to="/login">Login</Link></span>
                </form>
            </div>
                <ToastContainer/>
        </div>
        </div>
    )
}

export default Register;