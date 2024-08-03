import React, { useState } from 'react'
import Header from './Header'

const Login = () => {

  const [IsSignInForm ,setIsSignInForm] =useState(true);

  const toggleSignInform =() => {
    setIsSignInForm(!IsSignInForm);

  }


  return (
    <div >
      <Header/>
      <div className='absolute' >
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/826348c2-cdcb-42a0-bc11-a788478ba5a2/6d20b198-e7ab-4e9f-a1aa-666faa0298f9/IN-en-20240729-POP_SIGNUP_TWO_WEEKS-perspective_WEB_a67d8c9e-8121-4a74-98e4-8005eb2df227_large.jpg" alt ="backgroung img"></img>
      </div>


      <form className='w-3/12 h-4/5 absolute p-12 my-36 mx-auto left-0 right-0 bg-black rounded-lg bg-opacity-70'>
      <h1 className= "text-white font-bold text-2xl pb-4">{IsSignInForm ? "Sign In" : "Sign Up"}</h1>
       

      { !IsSignInForm &&
        <input type="text" 
        placeholder='Full Name' 
        className="p-4 my-2 bg-gray-700 w-full  rounded-md" />
        }


        <input type="text" 
        placeholder='Email' 
        className="p-4 my-2 bg-gray-800 w-full  rounded-md" />

      

        <input type="text" 
        placeholder='Password' 
        className='p-4 my-2 bg-gray-800 w-full  rounded-md'/>

       

        <button className=" bg-red-700 text-2xl p-4,my-4 w-full rounded-md">{IsSignInForm ? "Sign In" : "Sign Up"} </button>

        <p className ="text-white py-4 m-2 cursor-pointer" onClick ={toggleSignInform}>{IsSignInForm ? "New to Instantshow? Sign Up Now": "A;readty registered? Sign In Now"}  </p>

      </form>
    </div>
  )
}

export default Login