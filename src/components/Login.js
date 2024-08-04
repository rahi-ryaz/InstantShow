
import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';

import { createUserWithEmailAndPassword ,signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from "../utils/firebase" 
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';




const Login = () => {
  

  const dispatch=useDispatch();
  const [IsSignInForm ,setIsSignInForm] =useState(true);
  const [errorMessage, setErrorMessage]= useState(null);
  const navigate = useNavigate();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInform =() => {
    setIsSignInForm(!IsSignInForm);

  }

  const handleButtonClick=() =>{
    //validate data 
    // console.log(email.current.value,password.current.value)
    const message= checkValidData(email.current.value, password.current.value);
  
    setErrorMessage(message);
    if(message) return;


    if(!IsSignInForm){
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
       .then((userCredential) => {
     // Signed up 
     const user = userCredential.user;
     updateProfile(user, {
      displayName: name.current.value,
      photoURL: 'https://spline.design/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fspline_logo.647803e0.png&w=64&q=75',

    })
    .then(() => {
      const {uid,email,displayName, photoURL }= auth.currentUser;
      // console.log(auth.currentUser,"from login:user")
      dispatch(
        addUser({
          uid:uid ,
           email:email ,
            displayName:displayName , 
            photoURL:photoURL
          }));

      navigate("/browse");
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
     console.log(user);
     // ...
     navigate("/browse")
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
      <div className='absolute opacity-25' >
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/826348c2-cdcb-42a0-bc11-a788478ba5a2/6d20b198-e7ab-4e9f-a1aa-666faa0298f9/IN-en-20240729-POP_SIGNUP_TWO_WEEKS-perspective_WEB_a67d8c9e-8121-4a74-98e4-8005eb2df227_large.jpg" alt ="backgroung img"></img>
      </div>



      <form onSubmit= {(e) => e.preventDefault()}
       className='w-3/12 h-4/5 absolute p-12 my-36 mx-auto left-0 right-0 bg-black rounded-lg bg-opacity-70'>

      <h1 className= "text-white font-bold text-2xl pb-4">{IsSignInForm ? "Sign In" : "Sign Up"}</h1>
       

      { !IsSignInForm &&
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
        type="text" 
        placeholder='Password' 
        className='p-4 my-2 bg-gray-800 w-full text-white rounded-md'/>

        <p className ="text-red-500 font-bold text-lg">{errorMessage}</p>

        <button className=" bg-[#C11119] text-white text-2xl p-4,my-2 w-full rounded-md" onClick= {handleButtonClick}>{IsSignInForm ? "Sign In" : "Sign Up"} </button>

        <p className ="text-white py-4 m-2 cursor-pointer" onClick ={toggleSignInform}>{IsSignInForm ? "New to Instantshow? Sign Up Now": "A;ready registered? Sign In Now"}  </p>



      </form>
    </div>
  )
}

export default Login