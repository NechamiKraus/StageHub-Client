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
import { Manager } from './types/manager';
import { Actor } from './types/actor';
import { Director } from './types/director';
import { Provider } from './types/provider';
import { Coach } from './types/coach';
import UserList from './components/UserList/UserList';
import Diary from './components/MeetingCalander/MeetingCalander';

function App() {

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
  const userRole = localStorage.getItem('userRole');
  const user = (() => {
    switch (userRole) {
      case "Manager":
        return new Manager(details);
      case "Actor":
        return new Actor(details);
      case "Director":
        return new Director(details);
      case "Provider":
        return new Provider(details);
      case "Coach":
        return new Coach(details);
      default:
        return null; // Handle unknown roles
    }
  })();
  // console.log(user);
  return (
    <>
      <NavBar userName={userName} onLogout = {hundleLogout} pages ={pages}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin/:role" element={<SignIn onLogin={hundleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/aaa" element={<UserList roleList={"actor"}/>} />

        {/* <Route path="/about" element={<About />} /> */}
        
        <Route element={<PrivateRoute userName={userName} />}>
          <Route path= {`${localStorage.getItem("userRole")}`} element={<UserDashboard user= {user}/>} />
          <Route path={`${localStorage.getItem('userRole')}/diary`} element={<Diary/>} />

          <Route path={`${localStorage.getItem('userRole')}/user-list/actors`} element={<UserList roleList={"actors"} />} />
          <Route path={`${localStorage.getItem('userRole')}/user-list/coaches`} element={<UserList roleList={"coaches"} />} />
          <Route path={`${localStorage.getItem('userRole')}/user-list/providers`} element={<UserList roleList={"providers"} />} />
          <Route path={`${localStorage.getItem('userRole')}/user-list/directors`} element={<UserList roleList={"directors"} />} />

        </Route>

        <Route path="*" element={<Home />} />

      </Routes>
    </>
  )
}

export default App
