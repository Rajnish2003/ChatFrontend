import React, { useState,useEffect } from 'react'
import './setAvatar.css'
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import axios  from 'axios';
import { Buffer } from 'buffer';
import { ToastContainer,toast } from 'react-toastify';
import { setAvatarRoute } from '../utils/APIroutes';


const SetAvatar=()=>{
    const api="https://api.multiavatar.com/4567895";
    const navigate=useNavigate();
    const [avatars,setAvatars]=useState([]);
    const [isLoading,setLoading]=useState(true);
    const [selectAvatar,setSelectAvatar]=useState(undefined);
    const toastOptions={
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:'light'
    };
 
    useEffect(()=>{
        if(!localStorage.getItem("chat-app-user"))
        navigate("/login");
    },[])

   const setProfilePicture= async ()=>{
    if(selectAvatar===undefined){
       toast.error("Please select an avatar",toastOptions);
    }else{
        const user=await JSON.parse(localStorage.getItem("chat-app-user"));
        const {data}=await axios.post(`${setAvatarRoute}/${user._id}`,{
            image:avatars[selectAvatar],
        });
        if(data.isSet){
            user.isAvatarImageSet=true;
            user.avatarImage=data.image;
            localStorage.setItem("chat-app-user",JSON.stringify(user));
            navigate('/');
        }else{
            toast.error("Error in setting avatar. Please try again",toastOptions);
        }
    }
   };
   
   useEffect(()=>{
       const getData=async()=>{
        const data=[];
         for(let i=0;i<4;i++){
         const image=await axios.get(`${api}/${Math.round(Math.random()*1000)}`);
         const buffer=new Buffer(image.data);
         data.push(buffer.toString("base64"));
        }
           setAvatars(data);
           setLoading(false);
       }
       getData();
   },[]);
    
    return(
       <>
        {isLoading?<div className='preloader'>
           <img src="preloader.gif" alt="preloader" />          
        </div>:
        <div className="container">
            <div className="title-container">
                <h1>Pick an avatar as your Profile</h1>
            </div>
            <div className="avatars">
               {avatars.map((avatar,index)=>{ 
                 return (
                    <div key={index} className={`avatar ${
                        selectAvatar===index ? "selected" :"" 
                    }`}>
                        <img src={`data:image/svg+xml;base64,${avatar}`} alt='avatar' onClick={()=>setSelectAvatar(index)}/>
                        {selectAvatar===index && <img className='overlay'src="select.png" alt='rws'/>}
                    </div>
                 );
               })}
            </div>
            <button className='submit-btn' onClick={setProfilePicture}>Set as Profile Picture</button>
            <ToastContainer/>
        </div> } 
       </>
    )
}; 
export default SetAvatar;