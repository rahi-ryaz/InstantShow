
import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';

import { createUserWithEmailAndPassword ,signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from "../utils/firebase" 
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR } from '../utils/constants';
import {BG_URL} from "../utils/constants"




const Login = () => {
  

  const dispatch=useDispatch();
  const [isSignInForm ,setIsSignInForm] =useState(true);
  const [errorMessage, setErrorMessage]= useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInform =() => {
    setIsSignInForm(!isSignInForm);

  }

  const handleButtonClick=() =>{
    //validate data 
  
    const message= checkValidData(email.current.value, password.current.value);
  
    setErrorMessage(message);
    if(message) return;


    if(!isSignInForm){
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
       .then((userCredential) => {
     // Signed up 
     const user = userCredential.user;
     updateProfile(user, {
      displayName: name.current.value,
      photoURL:USER_AVATAR,
    })

    .then(() => {
      const {uid,email,displayName, photoURL }= auth.currentUser;

      dispatch(
        addUser({
          uid:uid ,
           email:email ,
            displayName:displayName , 
            photoURL:photoURL
          }));

    }).catch((error) => {
      setErrorMessage(error.message);
  });

   })
   .catch((error) => {
     const errorCode = error.code;
     const errorMessage = error.message;
     setErrorMessage(errorCode + "-" + errorMessage)
     // ..
   });
   
   }  else{
    //sign in logic
     signInWithEmailAndPassword
     (auth,
      email.current.value,
      password.current.value)
       
   .then((userCredential) => {
     // Signed in 
     const user = userCredential.user;
   
     // ...
     
   })
   .catch((error) => {
     const errorCode = error.code;
     const errorMessage = error.message;
     setErrorMessage(errorCode + "-" + errorMessage)
   });
   }
  }

  return (
    <div >
      <Header/>
      <div className='absolute ' >
        <img  className="h-screen w-screen object-cover" src={BG_URL} alt ="backgroung img"></img>
      </div>
      <form onSubmit= {(e) => e.preventDefault()}
       className=' w-full md:w-3/12 absolute p-12 my-36 mx-auto left-0 right-0 bg-black rounded-lg bg-opacity-70'>

      <h1 className= "text-white font-bold text-2xl pb-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
       

      { !isSignInForm &&
        <input
        ref={name}
        type="text" 
        placeholder='Full Name' 

        className="p-4 my-2 bg-gray-800 w-full  rounded-md" />
        }


        <input
        ref={email}
        type="text" 
        placeholder='Email' 
        className="p-4 my-2 bg-gray-800 w-full text-white rounded-md" />

      

        <input
         ref={password}
        type="password" 
        placeholder='Password' 
        className='p-4 my-2 bg-gray-800 w-full text-white rounded-md'/>

        <p className ="text-red-500 font-bold text-lg">{errorMessage}</p>

        <button className=" bg-[#C11119] text-white text-2xl p-4,my-2 w-full rounded-md" onClick= {handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"} </button>

        <p className ="text-white py-4 m-2 cursor-pointer" onClick ={toggleSignInform}>{isSignInForm ? "New to Instantshow? Sign Up Now": "Already registered? Sign In Now"}  </p>



      </form>
    </div>
  )
}

export default Login