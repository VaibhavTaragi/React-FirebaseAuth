import React, { useState } from 'react';
import InputControl from './InputControl';
import { Link, useNavigate } from 'react-router-dom';
import{createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {auth} from '../firebase.js';

const Signup = () => {
  const [values,setValues]=useState({
    name:'',
    email:'',
    password:''
  });

  const [errMsg,setErrMsg]=useState('');
  const [submitButtonDisabled,setSubmitButtonDisabled]=useState(false);
  const navigate = useNavigate();

  const handleSubmit = ()=> {
    if(!values.name || !values.email || !values.password){
      setErrMsg("Please fill all the details");
      setSubmitButtonDisabled(true);
      return;
    }
    setErrMsg('');
    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.password).then(async(res)=>{
      const user = res.user;
      await updateProfile(user,{
        displayName: values.name,
      });
      setSubmitButtonDisabled(false);
      navigate('/');
    }).catch((err)=>{
      setErrMsg(err.message);
      setSubmitButtonDisabled(false);
    });
  }

  return (
    <div className='h-screen bg-purple-600 flex justify-center items-center'>
      <div className='w-1/3 bg-white p-8 rounded-xl shadow-md flex flex-col items-center'>
        <h1 className='font-bold text-4xl mb-2'>Sign Up</h1>
        <InputControl label="Name" placeholder="Enter Your Name" onChange={(e)=>setValues((prev)=>({...prev ,name:e.target.value}))}/>
        <InputControl label="Email" placeholder="Enter Email Address" onChange={(e)=>setValues((prev)=>({...prev, email:e.target.value}))}/>
        <InputControl label="Password" placeholder="Enter Password" onChange={(e)=>setValues((prev)=>({...prev, password:e.target.value}))}/>
        {errMsg!==''?<h2 className='font-bold text-md text-red-600 my-2'>{errMsg}</h2>:<></>}
        <button className='w-full bg-purple-600 rounded-lg text-white text-lg font-semibold p-2 my-2 disabled:bg-black' disabled={submitButtonDisabled} onClick={handleSubmit}>Sign Up</button>
        <div className='flex'>
          <h2>Already have an account?</h2>
          <Link to='/login' className='mx-2 text-blue-700 cursor-pointer font-semibold hover:text-blue-500'>Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup