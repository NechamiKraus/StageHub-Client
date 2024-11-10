import { Routes, Route } from 'react-router-dom';
// import './App.css';
import Home  from './components/Home/Home';
import SignIn from './components/Sign-in/SignIn';
import NavBar from './components/NavBar/NavBar'
import SignUp from './components/Sign-up/SignUp';
import { useEffect, useState } from 'react';
import React from 'react';


function App() {

  const [userName , setUserName] = useState('');
  useEffect(() => {
    const savedUserName = localStorage.getItem('userName');
    if (savedUserName) {
      setUserName(savedUserName);  // Set the userName from localStorage on initial load
    }
  }, []);

  const hundleLogin = (name) => {
    localStorage.setItem("userName",name);
    setUserName(name);
  }
  const hundleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    setUserName('')
  }
  return (
    <>
      <NavBar userName={userName} onLogout = {hundleLogout}/>
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin/:role" element={<SignIn onLogin = {hundleLogin}/> } />
            <Route path="/signup" element={<SignUp />} />
            {/* <Route path="/about" element={<SignUp />} /> */}

      </Routes>

    </>
  )
}

export default App
