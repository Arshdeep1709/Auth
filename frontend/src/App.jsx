import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Verifymail from './pages/Verifymail'
import Verify from './pages/Verify'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/verify',
    element: <Verifymail />
  },
  {
    path: '/verify/:token',
    element: <Verify />
  },
  {
    path: '/signup',
    element: <Signup />
  }
])
const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="colored"
      />
    </div>
  )
}

export default App