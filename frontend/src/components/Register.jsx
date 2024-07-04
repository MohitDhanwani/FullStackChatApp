import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/Form.css'
import { baseURL } from '../url';

function RegisterForm({ toggleForm }) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [contactNo, setContact] = useState('');
    const [email, setEmail] = useState('');

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        axios.post(`${baseURL}/register/user/signup`, {
            name,
            userName,
            password,
            contactNo,
            email
        }, { withCredentials: true })
        .then(response => {
            navigate('/login');
        })
        .catch(error => {
            console.log("Error in registration:", error);
        });
    };

    return (
        <form className="register-form" onSubmit={handleRegisterSubmit}>
            <div className="big-form-container">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required value={name}
                    onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input type="tel" id="phone" name="phone" required
                    value={contactNo}
                    onChange={(e) => setContact(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className='form-button'>Register</button>
            <p className='confirmation-para'>
                Already a user? <a href='/login' className="toggle-link" onClick={toggleForm}>Login here</a>
            </p>
            </div>
            
        </form>
    );
}

export default RegisterForm;
