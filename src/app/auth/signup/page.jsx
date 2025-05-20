"use client"

import { poppins } from "../../../../public/assets/fonts"
import { Router } from "next/router";
import {useState} from 'react'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Signup() {
  const router = useRouter()
  const [firstName, setfirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [show,setshow]=useState(false)
  const [fail, setFail] = useState('')
  async function handleSignup(e){
    e.preventDefault()
    try{
      // console.log(`my method is ${method}`)
      const res = await fetch('/api/signup',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email,password})
      })
      if(!res.ok){
        const errorMessage = await res.json()
        throw new Error(errorMessage.message||'There was something wrong')
      }
      const {token} = await res.json()

      document.cookie = `token=${token}; path=/; samesite=lax `
      router.push('/src/app/page.jsx')
    }catch(error){
      console.log(error)
      setFail(`there was an error while signing you up`)
    }
  }
  //incase user is already logged in.. 
  // comment the whole useEffect out when testing
  // useEffect(()=>{
  //   const isLoggedIn = document.cookie.includes('token=')
  //   if(isLoggedIn){
  //     router.push('/src/app/page.jsx')
  //   }
  // },[])
  return(
    <div className="flex justify-center items-center">
      <div className="flex flex-col  mt-20 h-[861px] w-[773px] shadow-lg rounded-lg">
        <div className="flex flex-col m-5 justify-center items-center">
          <h1 className="font-bold text-[#262323] text-2xl">Sign Up</h1>
          <p className="mt-4">with</p>
        </div>
        <div className="flex  justify-center items-center flex-col">
          <button className="bg-[#F9E3DE] text-[#262323] rounded-lg flex justify-center text-base font-semibold items-center w-[632px] h-[55px] py-[12px]"><img className="mr-3" src="/assets/images/google.png" />Google</button>
          <div className="flex m-6 justify-between flex-row">
            <span className="w-[287.05px] border h-[1] text-[#262323]"></span>
            <p className="font-bold mx-2 text-[20px]">OR</p>
            <span className="w-[287.05px] h-[1] border text-[#262323]"></span>
          </div>
          {/* forms */}
          <form onSubmit={handleSignup}>
          <div className="flex flex-col w-[631px] h-[415px]">
            <div className="flex justify-between w-full flex-row ">
              <div className="flex flex-col ">
                <label className="font-semibold text-[16px]" htmlFor="firstName">First Name</label>
                <input onChangeCapture={()=>setFail('')} type="text" required value={firstName} onChange={(e)=>setfirstName(e.target.value)} className="border p-4 border-solid w-[272px] border-[#89888B] h-[63px] rounded-[10px] focus:border-[#89888B] " />
              </div>
              <div className="flex flex-col">
                <label  className="font-semibold text-[16px]" htmlFor="lastName">Last name</label>
                <input onChangeCapture={()=>{setFail('')}} type="text" required value={lastName} onChange={(e)=>{setLastName(e.target.value)}} className="border border-solid p-4 w-[272px] border-[#89888B] h-[63px] rounded-[10px] focus:border-[#89888B] " />
              </div> 
            </div>
            <div className="mt-7">
              <label className="font-semibold text-[16px]" htmlFor="Email">Email</label>
              <input type="text" onChangeCapture={()=>{setFail('')}} value={email} required onChange={(e)=>setEmail(e.target.value)} className="border p-4 border-solid w-full border-[#89888B] h-[63px] rounded-[10px] focus:border-[#89888B] " />
              <p className="text-sm font-normal text-[rgba(0, 0, 0, 0.75)]">please check your email address to make sure it's correct</p>
            </div>
            <div className="mt-7 relative">
              <label className="font-semibold text-[16px]" htmlFor="password">Password</label>
              <input type={show?'text':'password'} onChangeCapture={()=>{setFail('')}} required value={password} onChange={(e)=>setPassword(e.target.value)} id="password" className="border inline-block relative p-4 border-solid w-full border-[#89888B] h-[63px] rounded-[10px] focus:border-[#89888B] " />
              
              <p className="text-sm font-normal text-[rgba(0, 0, 0, 0.75)]">(min.8 characters)</p>
            </div>
            <div className="my-7 flex flex-row items-center">
              <input type="checkbox" required className="w-[30px] h-[30px] border-[rgba(137, 136, 139, 1)] rounded-[4px]"  />
              <p className="pl-[22px] onPress">I accept the Terms of Service, Privacy Notice and Cookie Policy</p>
            </div>
           </div>{/*end of forms */}
           <button type="submit" className="mt-7 bg-[#E2725B] hover:bg-[#F3C4B9] flex justify-center items-center text-base text-white rounded-[10px] font-bold w-[631px] h-[55px]">Sign Up</button>
           </form>
           <p className={`bg-[rgba(0, 0, 0, 0.7)]`}>Already on CuratED? <a className="font-bold pl-2 text-base" href="">Login</a> </p>
           <p className=" mx-5 mt-7 text-red-600 font-bold">{fail}</p>
        </div>
      </div>
    </div>
  )
}
