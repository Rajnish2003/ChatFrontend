import React from 'react'
import axios from 'axios'
import {BiPowerOff} from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import './Logout.scss'
const Logout = () => {
    const navigate=useNavigate();
    const handleClick=async()=>{
        localStorage.clear();
        navigate("/login");
    }
  return ( 
    <div className="logoutContainer">
         <BiPowerOff onClick={handleClick}/>
    </div>
  )
}

export default Logout