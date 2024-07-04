import React, { useEffect, useState , useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams , useLocation} from 'react-router-dom';
import '../style/chat.css';
import { io } from "socket.io-client";
import { FaUser } from 'react-icons/fa';
import { baseURL } from '../url';

function Chat() {
  const { chatRoomId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [creator , setCreator] = useState('');
  const [id , setId] = useState('');
  const [showDelBtn , setShowDelBtn] = useState(false);
  const [typing , setTyping] = useState('');
  const typingTimeoutRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const createdBy = queryParams.get('RoomAuth');
    setCreator(createdBy);
  }, []);

  useEffect(() => {
    const newSocket = io(`${baseURL}`, { withCredentials: true });
    setSocket(newSocket);

    axios.get(`${baseURL}/user/chat`, { withCredentials: true })
      .then(res => {
        setId(res.data.id);
        setUsername(res.data.username);
        newSocket.emit('joinRoom', { roomId: chatRoomId, username: res.data.username });
      })
      .catch(err => {
        console.log("Error from chat -> ", err);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          navigate("/register");
        }
      });

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [chatRoomId, navigate]);

  useEffect(() => {
    if (socket) {
      socket.on('receiveMessage', (data) => {
        setMessages(prevMessages => [...prevMessages,data]);
      });

      socket.on('previousMessages', (data) => {
        setMessages(data);
      });

      socket.on('userJoined', (username) => {
        console.log(`${username} joined the room`);
      });
      socket.on('userLeft', (username) => {
        console.log(`${username} left the room`);
      });
      socket.on('updateUserList', (userList) => {
        setUsers([...new Set(userList)]);
      });
    }
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleClick = () => {
    if (message.trim()) {
      socket.emit('sendMessage', { roomId: chatRoomId, message });
      setMessage('');
      setTyping(''); 
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (id && creator && id === creator) {
      setShowDelBtn(true);
    }
  }, [id, creator]);

  const handleTyping = () => {
    setTyping("Typing...");
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setTyping('');
    }, 1000);
  }


  const handleDeleteRoom = async () => {
    try {
        await axios.delete(`${baseURL}/room/delete/${chatRoomId}`, { withCredentials: true });
        navigate('/'); 
    } catch (error) {
        console.error("Error deleting room:", error);
    }
};

  return (
    <div className="chat-container">
      <div className='show-online-users'>

    <div className="delete-container">
    <h2>Online Users:</h2>
    {showDelBtn && <button onClick={handleDeleteRoom} className='delete-room-btn'>Delete Room</button>}
    </div>
       

        {users.map((user, index) => (
          <div key={index} className="users-list">
            <FaUser className="chat-icon-small" />
            <div className="user-name">{user}</div>
              <div className="typing-text">{typing}</div>
          </div>
        ))}
      </div>
      <div className="conversation-section">
        <h2>Messages:</h2>

        <div className="messages-container">
          {messages.map((msg, index) => (
            <div key={index} className={msg.username === username ? "sent-message" : "received-message"}>
              <div className='testing'>
              <strong className='msg-username'>{msg.username}: </strong>{msg.message}
              </div>
            </div>
          ))}

    <div ref={messagesEndRef}></div>

        </div>
        <div className="input-and-btn-container">
          <input
            type="text"
            placeholder='Type your message here'
            id="input-section"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            onKeyDown={handleTyping}
          />
          <button onClick={handleClick} className="send-button">Send</button>
        </div>
      </div>
      
    </div>

  );
}

export default Chat;


