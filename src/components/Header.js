import React from 'react'
import {auth} from "../utils/firebase"
import { signOut } from "firebase/auth";
import { useSelector } from 'react-redux';


import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';



const Header = () => {
  const dispatch= useDispatch();  // hook shd b on top of component
  const navigate = useNavigate();
  const user=useSelector(store=>store.user)

   const handleSignOut= ()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
   }
   
    useEffect(()=>{
   const unsubscribe = onAuthStateChanged(auth,(user) => {
      if (user) {

        const {uid,email,displayName, photoURL }= user;
        dispatch(
          addUser({
            uid:uid ,
             email:email ,
              displayName:displayName , 
              photoURL:photoURL
            }));
            navigate("/browse");

        // ...
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
     
      }
    });

    return () => unsubscribe(); //its kinda of Event Listener ,so need to unsubscribe when compo unMounts

  },[]);

  return (
    <div className="absolute px-8 py-2 z-10 w-screen flex justify-between">
      <h1 className="text-4xl font-serif bg-transparent text-red-700 tracking-tighter">InstantShow</h1>
    
 { user &&
    ( <div className="text-cyan-800 ">
      <img className="w-12,h-12" src ={user?.photoURL} alt= "user icon"/>
      
      <button onClick={handleSignOut} className ="font-bold text-red-800">(Sign Out)</button>
    </div>)
    }
    </div>
    
  )
}

export default Header