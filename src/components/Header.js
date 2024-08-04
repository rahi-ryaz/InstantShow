import React from 'react'
import {auth} from "../utils/firebase"
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
 import { useSelector } from 'react-redux';



const Header = () => {

  const navigate = useNavigate();
  const user=useSelector(store=>store.user)


   const handleSignOut= ()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/")
    }).catch((error) => {
      // An error happened.
      navigate("/error")
    });
   }

  return (
    <div className="absolute px-8 py-2 z-10 w-screen flex justify-between">
      <h1 className="text-4xl font-serif bg-transparent text-red-700 tracking-tighter">InstantShow</h1>
    
 { user &&
    ( <div className="text-cyan-800 ">
      <img className="w-12,h-12" src ={user?.photoURL} alt= "user icon"/>
      {/* {console.log(user?.photoURL,"from headers")} */}
      <button onClick={handleSignOut} className ="font-bold text-red-800">(Sign Out)</button>
    </div>)
    }
    </div>
    
  )
}

export default Header