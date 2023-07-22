import React, { useEffect, useState } from 'react'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios  from 'axios';
import { loginRoute } from '../utils/APIroutes';

const Login = () => {
    const navigate=useNavigate();
    const [value,setValue]=useState({
        username:"",
        password:""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(handleValidation()){
            const {password ,username}=value;
            const {data}=await axios.post(loginRoute,{
                username,
                password
            });
            if(data.status===false){
                toast.error(data.msg,toastOptions);
            }else if(data.status===true){
                localStorage.setItem("chat-app-user",JSON.stringify(data.user));
                navigate("/");
            } 
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
        const {password,username}=value;
        if(username===""){
            toast.error("Username and Password is required",toastOptions);
            return false;
        }else if(password===""){
          toast.error("Username and Password is required",toastOptions);
          return false;
        }
          return true;

    }
    return (
        <div  className='hero' >
        <div className="register">
            <div className='center'>
                    <div className='image'>
                        <img src="favicon.png" alt="" srcset="" />
                    </div>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="txt_field">
                        <input type="text" name="username" autoComplete="off" onChange={handleChange} />
                        <span></span>
                        <label>Username:</label>
                    </div>
                    <div className="txt_field">
                        <input type="password" name="password" autoComplete="off" onChange={handleChange} />
                        <span></span>
                        <label>Password:</label>
                    </div>
                    <button className="btn-reg">Login</button>
                    <span className='btn-switch'>if not Register? <Link to="/register">Register</Link></span>
                </form>
            </div>
                <ToastContainer/>
        </div>
        </div>
    ) 
}

export default Login;