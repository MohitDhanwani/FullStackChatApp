import { useState , useEffect} from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import {BrowserRouter , Route , Routes} from 'react-router-dom'
import Earn from './components/Earn'
import Chat from './components/Chat'
import RegisterForm from './components/Register'
import LoginForm from './components/Login'
import CreateJoin from './components/CreateJoin'
import RoomForm from './components/Create'
import JoinRoom from './components/JoinRoom'

function App() {

  return (

    <>
    <Navbar/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<RegisterForm/>} />
        <Route path='/login' element={<LoginForm/>} />
        <Route path='/earn' element={<Earn/>} />
        <Route path='/rooms' element={<CreateJoin/>} />
        <Route path='/rooms/create' element={<RoomForm/>} />
        <Route path='/rooms/join' element={<JoinRoom/>} />
        <Route path='/chat/:chatRoomId' element={<Chat/>} />
      </Routes>
    </BrowserRouter>
     
     
    </>
  )
}

export default App
