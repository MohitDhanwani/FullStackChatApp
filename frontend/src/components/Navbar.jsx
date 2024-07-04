import React from 'react'
import "../style/navbar.css"
import axios from 'axios'
import { baseURL } from '../url'

function Navbar() {
    const handleLogout = () => {
    
      alert("logout!")
      axios.get(`${baseURL}/register/logout` , {withCredentials: true})
      .then(res => console.log("cookie cleared!"))
      .catch(err => console.log("err -> " , err));
  }

  
  return (
    <>
    <nav className='navbar'>
    <div className="navbarLeft">
        <a href='/' className='application-heading-name'><strong>ChatHub</strong></a>
    </div>
    <div className="navbarRight">
        <a href='/rooms' className='navbar-right-heading'>Room</a >
        <a href='/earn' className='navbar-right-heading'>Earn</a>
        <a href='/register' className='navbar-right-heading'>Account</a>
        <a href='/' className='navbar-right-heading' onClick={handleLogout}>Logout</a>
    </div>
    </nav>
    </>
  )
}

export default Navbar