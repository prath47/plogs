import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import EditPost from './pages/EditPost'
import CreatePost from './pages/CreatePost'
import PostDetails from './pages/PostDetails'
import { Routes, Route } from 'react-router-dom'
import Myblogs from './pages/Myblogs'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/myblogs/:id' element={<Myblogs />} />
        <Route path='/write' element={<CreatePost />} />
        <Route path='/register' element={<Register />} />
        <Route path='/edit/:id' element={<EditPost />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/posts/post/:id' element={<PostDetails />} />
      </Routes>
    </div>
  )
}

export default App