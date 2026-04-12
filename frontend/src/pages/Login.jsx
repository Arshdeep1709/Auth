import React from 'react'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { useForm } from "react-hook-form"

const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()


  const onSubmit = async (data) => {
    console.log("Form data being sent:", data);
    try {
      const { name, email, password, confirmPassword } = data;
  
      const res = await fetch("http://localhost:3009/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({  email, password }),
      });
  
      const result = await res.json();
      console.log("Response:", result);
  
      if (res.ok && result.success) {
        navigate("/");
        toast.success("Login successful!");
      } else {
        // Handle backend errors
        if (result.errors && Array.isArray(result.errors)) {
          result.errors.forEach((errMsg) => toast.error(errMsg));
        } else if (result.message) {
          toast.error(result.message);
        } else {
          toast.error("login failed");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className="border border-black px-6 py-3 rounded-md space-y-3 w-96">
      <h1 className='text-green-600 font-bold text-2xl items-center'>log into your Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
          {/* email */}
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-lg border border-gray-400'>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 2C0.447715 2 0 2.44772 0 3V12C0 12.5523 0.447715 13 1 13H14C14.5523 13 15 12.5523 15 12V3C15 2.44772 14.5523 2 14 2H1ZM1 3L14 3V3.92494C13.9174 3.92486 13.8338 3.94751 13.7589 3.99505L7.5 7.96703L1.24112 3.99505C1.16621 3.94751 1.0826 3.92486 1 3.92494V3ZM1 4.90797V12H14V4.90797L7.74112 8.87995C7.59394 8.97335 7.40606 8.97335 7.25888 8.87995L1 4.90797Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          <input type="text" placeholder='Email' {...register("email", { required: true })} className='grow outline-none' />
          </div>
          {errors.email && <span className='font-semibold text-sm text-red-600'>This field is required</span>}
          {/* password */}
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-lg border border-gray-400'>
          {
              showPassword ? <svg onClick={() => setShowPassword(!showPassword)} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg> : <svg onClick={() => setShowPassword(!showPassword)} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3536 2.35355C13.5488 2.15829 13.5488 1.84171 13.3536 1.64645C13.1583 1.45118 12.8417 1.45118 12.6464 1.64645L10.6828 3.61012C9.70652 3.21671 8.63759 3 7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C0.902945 9.08812 2.02314 10.1861 3.36061 10.9323L1.64645 12.6464C1.45118 12.8417 1.45118 13.1583 1.64645 13.3536C1.84171 13.5488 2.15829 13.5488 2.35355 13.3536L4.31723 11.3899C5.29348 11.7833 6.36241 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C14.0971 5.9119 12.9769 4.81391 11.6394 4.06771L13.3536 2.35355ZM9.90428 4.38861C9.15332 4.1361 8.34759 4 7.5 4C4.80285 4 2.52952 5.37816 1.09622 7.50001C1.87284 8.6497 2.89609 9.58106 4.09974 10.1931L9.90428 4.38861ZM5.09572 10.6114L10.9003 4.80685C12.1039 5.41894 13.1272 6.35031 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11C6.65241 11 5.84668 10.8639 5.09572 10.6114Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
              </svg>
            }
          <input type={showPassword ? 'text' : 'password'} {...register("password", { required: true })}  placeholder='Password' className='grow outline-none' />
          </div>
          {errors.password && <span className='font-semibold text-sm text-red-600'>This field is required</span>}
          <div className='flex justify-center'>
            <button type='submit' className='text-white bg-green-600 w-full rounded-lg py-2 cursor-pointer'>login</button>
          </div>
          </form>
          <p className='mt-2 text-center'>Don't have an account ?? <span className='text-blue-500 underline cursor-pointer ml-1' onClick={(e)=>{e.preventDefault(),navigate('/signup')}}>signup</span></p>
          </div>
    </div>
  )
}

export default Login