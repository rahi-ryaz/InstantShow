import React, { useEffect } from 'react'
import Login from './Login'
import Browse from "./Browse"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { auth } from "../utils/firebase";
import {  onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';

const Body = () => {
    const dispatch= useDispatch();  // hook shd b on top of component
  
    const appRouter = createBrowserRouter([
        {
            path :"/",
            element : <Login/>
        },
        {
            path:"/Browse",
            element:<Browse/>
        }
    ])

    useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const {uid , email, displayName }= user;
          dispatch(addUser({uid:uid , email:email , displayName:displayName}));

          // ...
        } else {
          // User is signed out
          dispatch(removeUser());
       
        }
      });

    },[]);



  return (
    <div>
     <RouterProvider router= {appRouter}/>
    </div>
  )
}

export default Body