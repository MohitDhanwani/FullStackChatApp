import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/Form.css';
import { baseURL } from '../url';

function LoginForm({ toggleForm }) {


    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        axios.post(`${baseURL}/register/user/login`, {
            userName,
            password
        }, { withCredentials: true })
        .then(response => {
            const userID = response.data.userID;
            navigate('/rooms')
        })
        .catch(error => {
            console.log("Error in login:", error);
        });
    };

    return (
        <>
        
         <form className="login-form" onSubmit={handleLoginSubmit}>
                    <div className="big-form-container">
                        <div className="form-group">
                            <label htmlFor="email">User Name</label>
                            <input type="text" id="login-userName" name="userName" required
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="login-password" name="password" required value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className='form-button'>Login</button>
                        <p className='confirmation-para'>
                            New user? <a href='/register' className="toggle-link" onClick={toggleForm}>Register here</a>
                        </p>
                    </div>
                </form>
            
        </>
    );
}

export default LoginForm;
