import { Routes, Route, useNavigate } from 'react-router-dom';
// import './App.css';
import Home  from './components/Home/Home';
import SignIn from './components/Sign-in/SignIn';
import NavBar from './components/NavBar/NavBar'
import SignUp from './components/Sign-up/SignUp';
import { useEffect, useState } from 'react';
import React from 'react';
import PrivateRoute from './components/Security/PrivateRoute';
import UserDashboard from './components/Dashboard/UserDashboard';

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
    localStorage.removeItem("userDetails");
    setUserName('')
    navigate("/")
  }

  const details = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')!) : null;

  return (
    <>
      <NavBar userName={userName} onLogout = {hundleLogout} pages ={pages}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin/:role" element={<SignIn onLogin={hundleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/about" element={<About />} /> */}
        
        <Route element={<PrivateRoute userName={userName} />}>
          <Route path= {`${localStorage.getItem("userRole")}`} element={<UserDashboard details= {details}/>} />
        </Route>
        <Route path="*" element={<Home />} />

      </Routes>
    </>
  )
}

export default App
