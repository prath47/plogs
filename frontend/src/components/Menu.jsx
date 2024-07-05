import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';
import { URL } from '../url';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Menu = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate()

    const handleLogout = async () => {
        const res = await axios.get(URL + '/api/auth/logout', { withCredentials: true })
        setUser(null)
        navigate('/')
    }
    return (
        <div className='bg-black z-10 w-[200px] flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-md p-4 space-y-4'>
            {!user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer w-full'><Link className='w-full block' to='/login'>Login</Link></h3>}
            {!user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer w-full'><Link to='/register'>Register</Link></h3>}

            {user && <>
                <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer w-full'><Link className='w-full block' to={'/profile/' + user._id}>Profile</Link></h3>
                <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer w-full'><Link className='w-full block' to={'/write'}>Crete Blog</Link></h3>
                <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer w-full'><Link className='w-full block' to={'/myblogs/' + user._id}>My Blogs</Link></h3>
                <h3
                    onClick={handleLogout}
                    className='text-white text-sm hover:text-gray-500 cursor-pointer w-full'><Link className='w-full block' to={'/'}>Logout</Link></h3>
            </>}
        </div>
    )
}

export default Menu