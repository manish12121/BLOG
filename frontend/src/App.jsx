import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Blogs from './pages/Blogs'
import Login from './pages/Login'
import Home from './pages/Home'
import About from './pages/About'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import './index.css';
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import YourBlog from './pages/YourBlog'
import Comments from './pages/Comments'
import CreateBlog from './pages/CreateBlog'



const router = createBrowserRouter([
  {
    path:"/",
    element:<><Navbar/><Home/></>
  },
  {
    path:"/blogs",
    element:<><Navbar/><Blogs/></>
  },
  {
    path:"/about",
    element:<><Navbar/><About/></>
  },
  {
    path:"/login",
    element:<><Navbar/><Login/></>
  },
  {
    path:"/signup",
    element:<><Navbar/><Signup/></>
  },
  {
    path:"/dashboard",
    element:<><Navbar/><Dashboard/></>,
    children:[
      {
        path:"profile",
        element:<Profile/>
      },
      {
        path:"your-blog",
        element:<YourBlog/>
      },
      {
        path:"comments",
        element:<Comments/>
      },
      {
        path:"write-blogs",
        element:<CreateBlog/>
      }
    ]
  }
])

function App() {
  return (
    <>
    <RouterProvider router = {router}/>
    </>
  )
}

export default App
