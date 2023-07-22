import React, { useState } from 'react'
import Picker from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs'
import './ChatInput.scss'
const ChatInput = ({handleSendMsg}) => { 
    const [showEmojiPicker,setShowEmojiPicker]=useState(false);
    const [msg,setMsg]=useState("");

    const handleEmojiPickerHideShow=()=>{
        setShowEmojiPicker(!showEmojiPicker);
    }

const sendChat=(e)=>{
    e.preventDefault();
    if(msg.length>0){
      handleSendMsg(msg);
      setMsg('');
    }
}

    return (
        <div className="ChatInputContainer">
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                    {showEmojiPicker && <Picker onEmojiClick={(emojiObject)=> setMsg((prevMsg)=> prevMsg + emojiObject.emoji)}/>}

                </div>
            </div>
            <form className='input-container' onSubmit={(e)=>sendChat(e )}>
                <input type='text' placeholder='type your message here'  onChange={(e)=>setMsg(e.target.value)} value={msg}/>
                <button className='submit'>
                    <IoMdSend/>
                </button> 
            </form>
        </div>
    )
}

export default ChatInput