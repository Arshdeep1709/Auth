import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Verifymail from './pages/Verifymail'
import Verify from './pages/Verify'


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
    </div>
  )
}

export default App