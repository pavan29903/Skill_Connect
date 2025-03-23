import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Home from './pages/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element:<Signup/>
    },
    {
      path:'/signup',
      element:<Signup/>
    },
    {
      path:'/signin',
      element:<Signin/>

    },
    {
      path:'/Home',
      element:<Home/>
    }
  ])
  const [count, setCount] = useState(0)

  return (
    <>
     <RouterProvider router={router}></RouterProvider>
    {/* <Home/> */}
    {/* <Signin/> */}
    {/* <Signup/> */}
    </>
  )
}

export default App
