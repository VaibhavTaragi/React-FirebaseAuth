import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { auth } from './firebase';

function App() {
  const [userName,setUserName]=useState('');

  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user){
        setUserName(user.displayName);
      }else setUserName('');
    })
  },[userName]);

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/' element={<Home name={userName}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
