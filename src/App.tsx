import { Routes, Route, useNavigate } from 'react-router-dom';
// import './App.css';
import Home  from './components/Home/Home';
import SignIn from './components/Sign-in/SignIn';
import NavBar from './components/NavBar/NavBar'
import SignUp from './components/Sign-up/SignUp';
import { useEffect, useState } from 'react';
import React from 'react';
import ManagerDashboard from './components/Dashboard/ManagerDashboard';
import ActorDashboard from './components/Dashboard/ActorDashboard';
import CoachDashboard from './components/Dashboard/CoachDashboard';
import ProviderDashboard from './components/Dashboard/providerDashboard';
import DirectorDashboard from './components/Dashboard/DirectorDashboard';
import PrivateRoute from './components/Security/PrivateRoute';
import Diary from './components/Diary/Diary';

function App() {

  const userRole = localStorage.getItem('userRole');

const pages = [
  { name: 'בית', path: '/' },
  { name: 'אודות', path: '/about' }
];

  const navigate = useNavigate();

  const [userName , setUserName] = useState('');
  useEffect(() => {
    const savedUserName = localStorage.getItem('userName');
    if (savedUserName) {
      setUserName(savedUserName);  // Set the userName from localStorage on initial load
    }
  }, []);

  const hundleLogin = (name , role) => {
    localStorage.setItem("userName",name);
    localStorage.setItem("userRole",role);
    setUserName(name);
    navigate(`/${userRole}/dairy`)
  }
  const hundleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("userRole");
    setUserName('')
    navigate("/")
  }
  return (
    <>
      <NavBar userName={userName} onLogout = {hundleLogout} pages ={pages}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin/:role" element={<SignIn onLogin={hundleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/about" element={<About />} /> */}
        
        <Route element={<PrivateRoute userName={userName} />}>
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/director" element={<DirectorDashboard />} />
          <Route path="/director/dairy" element={<Diary/>} />
          <Route path="/provider" element={<ProviderDashboard />} />
          <Route path="/coach" element={<CoachDashboard />} />
          <Route path="/coach/dairy" element={<Diary/>} />
          <Route path="/actor" element={<ActorDashboard />} />
          <Route path="/actor/dairy" element={<Diary />} />
        </Route>
        <Route path="*" element={<Home />} />

      </Routes>
    </>
  )
}

export default App
