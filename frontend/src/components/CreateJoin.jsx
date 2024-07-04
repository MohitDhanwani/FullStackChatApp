import React, { useEffect, useState } from 'react'
import "../style/createjoin.css"
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import RoomCard from './RoomCard.jsx';
import { baseURL } from '../url.js';

function CreateJoin() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(`${baseURL}/room/allRooms`, { withCredentials: true })
      .then((response) => setRooms(response.data))
      .catch((error) => console.error("Error fetching rooms:", error));
  }, []);

  const handleCreateRoom = () => {
    navigate('/rooms/create');
  }

  const handleJoinRoom = () => {
    navigate('/rooms/join');
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const filteredRooms = rooms.filter((room) =>
    room.roomName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1 className='rooms-heading'>Create Or Join Rooms</h1>
      <div className="main-big-container">
        <div className="input-search-container">
          <input 
            type="text" 
            placeholder='Search Rooms here' 
            id="room-search-id" 
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <span className="rooms-btn-container">
          <button className='room-btn' onClick={handleCreateRoom}>Create My Own Room</button>
          <button className='room-btn' onClick={handleJoinRoom}>Join Existing Room</button>
        </span>
      </div>
      <div className='room-card-container'>
        {filteredRooms.map((room, index) => (
          <RoomCard key={index} roomName={room.roomName} description={room.description} />
        ))}
      </div>
    </>
  );
}

export default CreateJoin;
