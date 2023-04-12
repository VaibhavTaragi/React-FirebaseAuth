import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Home = ({ name }) => {
  const navigate = useNavigate();
  const [signOutMsg,setSignOutMsg]=useState('');

  const HandleSignOut=()=>{
    signOut(auth).then(()=>{
      navigate('/');
      setSignOutMsg('Signed Out Successfully')
    }).catch((err)=>{
      setSignOutMsg('Error Signing Out : ',err.message);
    });
  }

  return (
    <div className="h-screen flex flex-col items-center bg-purple-600">
      <div className="flex w-full m-2 px-10 p-2 justify-end gap-5">
        {name === "" ? (
          <>
            <h1 className="font-semibold text-white cursor-pointer hover:text-yellow-300">
              <Link to="/login">Login</Link>
            </h1>
            <h1 className="font-semibold text-white cursor-pointer hover:text-yellow-300">
              <Link to="/signup">Signup</Link>
            </h1>
          </>
        ) : (
          <h1 className="font-semibold text-white cursor-pointer hover:text-yellow-300" onClick={HandleSignOut}>Sign Out</h1>
        )}
      </div>
      <div className="w-3/4 h-1/2 bg-white m-2 p-10 flex flex-col items-center">
      {signOutMsg!==''?<h2 className="text-xl mt-5">{signOutMsg}</h2>:<></>}
      <h1 className="text-2xl font-bold my-10">{name !=='' ? `Hello World` : "Login Please"}</h1>
      </div>
    </div>
  );
};

export default Home;
