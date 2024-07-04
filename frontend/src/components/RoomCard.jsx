import React, { useState } from 'react'
import "../style/Roomcard.css"
import { useNavigate } from 'react-router-dom'

function RoomCard(props) {

  const navigate = useNavigate()

  const handlePasswordinput = () => {
    navigate('/rooms/join')
  }


  return (
    <>

    <div className="big-room-container">
    <div className="room-container">
    <h3 className='display-room-heading'>Room Name : {props.roomName}</h3>
    <p className='display-room-description'>About Room : {props.description}</p>

    <div className="password-and-btn-container">
    <button className='join-room-button' onClick={handlePasswordinput}>Join Now</button>
    </div>
    </div>
    </div>
    
    </>
  )
}

export default RoomCard