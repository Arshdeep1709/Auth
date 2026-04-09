import React from 'react'
import { useState,useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'

const Verify = () => {
    const {token} = useParams()
    const [status, setStatus] = useState('verifying...')
    const navigate = useNavigate()
    useEffect(() => {
      const verifyEmail = async()=>{
        try {
            const res = await fetch('http://localhost:3009/user/verification',{method:'POST', headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},body:JSON.stringify({})})  
            const data = await res.json()
            if(data.success){
                setStatus('Email verified successfully !!!')
                setTimeout(() => {
                    navigate('/login')
                }, 5000);
              }
              else{
                setStatus('Token expired')
              }
        } catch (error) {
            console.log(error);
            setStatus('verification failed, please try again')
        }
      }
      verifyEmail()
    }, [token,navigate])
    
  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-linear-to-br from-blue-200 to-purple-400'>
        <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
        <h2 className='text-3xl font-semibold text-white text-center mb-3'> {status}</h2>
        {/* <p className='text-gray-400 mt-4 text-center text-lg'>We've sent you a verification Mail on your registered Email !</p> */}
        </div>
    </div>
  )
}

export default Verify