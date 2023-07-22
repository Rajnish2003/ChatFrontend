import React,{useState,useEffect} from 'react'
import './Contacts.scss'

const Contacts = ({contacts,currentUser,changeChat}) => {
  const [currentUserName,setCurrentUserName]=useState(undefined);
  const [currentUserImage,setCurrentUserImage]=useState(undefined);
  const [currentSelected,setCurrentSelected]=useState(undefined);
   useEffect(()=>{
    if(currentUser && currentUser.avatarImage){
       setCurrentUserImage(currentUser.avatarImage);
       setCurrentUserName(currentUser.username);
    }
   },[currentUser]);

 const changeCurrentChat=(index,contact)=>{
    setCurrentSelected(index);
    changeChat(contact);
 } 
  return (
    <>
       {currentUserImage && currentUserName && (
        <div className='contactContainer'>
            <div className="brand">
                <img src="favicon.png" alt="logo" />
                <h3>Chat</h3>
            </div>
            <div className="contacts">
                {contacts.map((contact,index)=>{
                    return(
                        <div
                        className={`contact ${
                            index===currentSelected? "select" : ""
                        }`}
                        key={index}
                        onClick={()=>{
                            changeCurrentChat(index,contact)
                        }}
                        >
                            <div className="avatar">
                            <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt='avatar'/>
                            </div>
                            <div className="username">
                                <h3>{contact.username}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="current-user">
                <div className="avatar">
                <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt='avatar'/>
                </div>
                <div className="username">
                    <h2>{currentUserName}</h2>
                </div>
            </div>
        </div>
     )}
    </>
  )
};

export default Contacts;