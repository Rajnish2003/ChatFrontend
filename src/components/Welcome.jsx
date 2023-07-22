import React from 'react'
import './Welcome.scss'
const Welcome = ({currentUser }) => {
  return (
    <div className="welcomeContainer">
        <img src="robot.gif " alt="robot" />
        <h1>
            Welcome,<span>{currentUser?currentUser.username:" "}!</span>
        </h1>
        <h3>Please select a chat to Start Messaging</h3>
    </div>
  )
} 

export default Welcome;