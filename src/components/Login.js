import React, {useState} from 'react'
import InputControl from './InputControl';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import { auth, provider } from '../firebase';
import {GoogleButton} from 'react-google-button';

const Login = () => {
  const [values,setValues]=useState({
    email:'',
    password:''
  });

  const [errMsg,setErrMsg]=useState('');
  const [submitButtonDisabled,setSubmitButtonDisabled]=useState(false);
  const navigate = useNavigate();

  const handleSubmit = ()=> {
    if(!values.email || !values.password){
      setErrMsg("Please fill all the details");
      setSubmitButtonDisabled(true);
      return;
    }
    setErrMsg('');
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.password).then((res)=>{
      setSubmitButtonDisabled(false);
      navigate('/');
    }).catch((err)=>{
      setErrMsg(err.message);
      setSubmitButtonDisabled(false);
    });
  }

  const handleGoogleLogin=()=>{
    signInWithPopup(auth,provider).then(()=>{
      navigate('/');
    }).catch((err)=>{
      setErrMsg(err.message);
    });
  }

  return (
    <div className='h-screen bg-purple-600 flex justify-center items-center'>
      <div className='w-1/4 bg-white p-8 rounded-xl shadow-md flex flex-col items-center'>
        <h1 className='font-bold text-4xl mb-2'>Login</h1>
        <InputControl label="Email" placeholder="Enter Email Address" onChange={(e)=>setValues((prev)=>({...prev, email: e.target.value}))}/>
        <InputControl label="Password" placeholder="Enter Password" onChange={(e)=>setValues((prev)=>({...prev, password: e.target.value}))}/>
        {errMsg!==''?<h2 className='font-bold text-md text-red-600 my-2'>{errMsg}</h2>:<></>}
        <button className='w-full bg-purple-600 rounded-lg text-white text-md hover:bg-purple-500 font-semibold p-2 my-2 shadow-lg disabled:bg-black' disabled={submitButtonDisabled} onClick={handleSubmit}>Login</button>
        <GoogleButton onClick={handleGoogleLogin} className='my-2'/>
        <div className='flex'>
          <h2>Create a new account?</h2>
          <Link to='/signup' className='mx-2 text-blue-700 cursor-pointer font-semibold hover:text-blue-500'>Sign Up</Link>
        </div>
      </div>
    </div>
  )
}

export default Login