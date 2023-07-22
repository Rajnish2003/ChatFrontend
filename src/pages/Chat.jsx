import React, { useEffect, useState,useRef} from 'react'
import axios from "axios";
import './Chat.css';
import { useNavigate } from 'react-router-dom';
import { allUserRoute, host } from '../utils/APIroutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from "socket.io-client";

const Chat = () => {
  const navigate=useNavigate();
  const socket=useRef();
  const [contacts,setContacts]=useState([]);
  const [currentUser,setCurrentUser]=useState(undefined);
  const [currentChat,setCurrentChat]=useState(undefined);
    useEffect(()=>{
      const getDatas=async()=>{
        if(!localStorage.getItem("chat-app-user"))
        navigate("/login");
        else{
          setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user"))); 
        }
      }
      getDatas();
    },[]);
     
    useEffect(()=>{
      if(currentUser){
        socket.current=io(host);
        socket.current.emit("add-user",currentUser._id);
      }
    },[currentUser]);
    
    useEffect(()=>{
      const getDats=async()=>{
        if(currentUser){
          if(currentUser.isAvatarImageSet){
            const data=await axios.get(`${allUserRoute}/${currentUser._id}`);
            setContacts(data.data);
          }else{
            navigate('/setAvatar');
          }
        }
      }
      getDats();
    },[currentUser]);
 
    const handleChatChange=(chat)=>{
      setCurrentChat(chat);
    }
   
  return(
    <div className="chats">
        <div className="chatContainer">
          <Contacts currentUser={currentUser} contacts={contacts} changeChat={handleChatChange}/>
          {
            currentChat===undefined?
            <Welcome currentUser={currentUser}/>
            :
            <ChatContainer  currentChat={currentChat} currentUser={currentUser} socket={socket}/>
          }
        </div>
    </div>
  )
}

export default Chat