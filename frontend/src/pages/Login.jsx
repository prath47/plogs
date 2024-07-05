import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const { setUser } = useContext(UserContext)

  const handleLogin = async () => {
    try {
      const res = await axios.post(URL + '/api/auth/login', { email, password }, { withCredentials: true })
      // console.log(res)
      setUser(res.data)
      navigate('/');
    } catch (error) {
      setError(true)
      console.log(error)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4 border-b">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">Plogs</Link>
        </h1>
        <h3><Link to='/register'>Register</Link></h3>
      </div>
      <div className="w-full flex justify-center items-center h-[80vh]">
        <div className="flex flex-col justify-center items-center space-y-4 w-80% md:w-[25%]">
          <h1 className="text-xl font-bold text-left">Login to your Account</h1>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            className="w-full px-4 py-2 border-2 border-black outline-0"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            className="w-full px-4 py-2 border-2 border-black outline-0"
            placeholder="Password"
          />
          <button
            onClick={handleLogin}
            className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black">
            Login
          </button>
          {error && <h3 className='text-red-500 text-sm '>Something Went Wrong</h3>}
          <div className="flex justify-center items-center space-x-3">
            <p>New Here ?</p>
            <p className="text-gray-500 hover:text-black">
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
