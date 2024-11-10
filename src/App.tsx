import { Routes, Route } from 'react-router-dom';
// import './App.css';
import Home  from './components/Home/Home';
import SignIn from './components/Sign-in/SignIn';
import NavBar from './components/NavBar/NavBar'
import SignUp from './components/Sign-up/SignUp';
import { useState } from 'react';
import React from 'react';


function App() {

  const [ userName, setUserName] = React.useState<string | null>('')
  
  const handleUserName = (name) =>{
    setUserName(name)
  }
  return (
    <>
      <NavBar userName = {userName} />
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin/:role" element={<SignIn onNameUpdate= {handleUserName} /> } />
            <Route path="/signup" element={<SignUp />} />
            {/* <Route path="/about" element={<SignUp />} /> */}

      </Routes>

    </>
  )
}

export default App
