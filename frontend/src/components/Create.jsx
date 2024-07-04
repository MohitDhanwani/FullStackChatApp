import React, { useState } from 'react';
import '../styles/RoomForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { baseURL } from '../url';


const RoomForm = () => {

   const navigate = useNavigate();
   const roomID = uuidv4();

  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState('');
  const [description , setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
      const response = await axios.post(`${baseURL}/room/create`, {
        roomName,
        password,
        description,
      } , {withCredentials: true})
      .then(res => {
        navigate('/rooms/join');
      })
  };

  return (
    <div className="room-form-overlay">
      <div className="room-form-container">


        <h2>Create Room</h2>

        <form>
          <div className="form-group">

            <label htmlFor="roomName">Room Name:</label>
            <input
              type="text"
              placeholder='Enter name without any spaces'
              id="roomName"
              name="roomName"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Description:</label>
            <input
              type="text"
              name="description"
              placeholder='Describe you room'
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder='Enter Password'
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            Create Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoomForm;
