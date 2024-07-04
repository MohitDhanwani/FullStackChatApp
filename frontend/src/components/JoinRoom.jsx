import React, { useState } from 'react';
import '../styles/RoomForm.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../url';

const JoinRoom = () => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState('');
  const [createdby , setCreatedBy] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${baseURL}/room/auth/check`, { roomName, password }, { withCredentials: true })
      .then(res => {
        setCreatedBy(res.data.createdby);
        navigate(`/chat/${res.data.roomId}?RoomAuth=${res.data.createdby}`)
        
      })
      .catch(err => {
        alert('Invalid room name or password');
      });
  };

  return (
    <div className="room-form-overlay">
      <div className="room-form-container">
        <h2>Join Room</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="roomName">Room Name:</label>
            <input
              type="text"
              id="roomName"
              name="roomName"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Join Room</button>
        </form>
      </div>
    </div>
  );
};

export default JoinRoom;
