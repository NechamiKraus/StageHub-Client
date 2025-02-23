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


function App() {
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
      <NavBar userName={userName} onLogout = {hundleLogout}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin/:role" element={<SignIn onLogin={hundleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/about" element={<About />} /> */}
        
        <Route element={<PrivateRoute userName={userName} />}>
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/director" element={<DirectorDashboard />} />
          <Route path="/provider" element={<ProviderDashboard />} />
          <Route path="/coach" element={<CoachDashboard />} />
          <Route path="/actor" element={<ActorDashboard actorId={"66789a238501e75be77823d8"} />} />
        </Route>
        <Route path="*" element={<Home />} />

      </Routes>
    </>
  )
}

export default App
