import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ImCross } from 'react-icons/im'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { URL } from '../url'
import { useNavigate, useParams } from 'react-router-dom'


const EditPost = () => {
    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])
    const postId = useParams().id

    const fetchPost = async () => {
        try {
            const res = await axios.get(URL + '/api/posts/' + postId, { withCredentials: true })
            console.log(res.data)
            setTitle(res.data.title)
            setDescription(res.data.description)
            setCategories(res.data.categories)
            setFile(res.data.photo)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPost()
    }, [postId])

    const addCategory = () => {
        const updatedCats = [...categories]
        updatedCats.push(category)
        setCategories(updatedCats)
        setCategory('')
    }

    const deleteCategory = (ind) => {
        console.log(ind)
        var updatedCats = [...categories]
        updatedCats.splice(ind, 1);
        setCategories(updatedCats)
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const post = {
            title,
            description,
            username: user.username,
            userId: user._id,
            categories,
        }

        if (file) {
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append('img', filename)
            data.append('file', file)
            post.photo = filename
            try {
                const imgUpload = await axios.post(URL + '/api/upload', data, { withCredentials: true })
                console.log(imgUpload.data)

            } catch (error) {
                console.log(error)
            }
        }
        //post upload
        try {
            const res = await axios.put(URL + '/api/posts/'+postId, post, { withCredentials: true })
            console.log(res.data)
            navigate('/posts/post/' + res.data._id)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <Navbar />
            <div className='px-6 md:px-[200px] mt-8 '>
                <h1 className='font-bold md:text-2xl text-xl'>Update a post</h1>
                <form className='w-full flex flex-col space-y-4 mt-4 md:space-y-8'>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text" className='px-4 py-2 outline-none ' placeholder='Enter Post Title..' />
                    <input
                        onChange={(e) => setFile(e.target.files[0])}
                        type="file" className='px-4' />

                    <div className='flex flex-col'>
                        <div className='flex items-center space-x-4 md:space-x-8'>
                            <input value={category} onChange={(e) => setCategory(e.target.value)} type="text" className='px-4 py-3 outline-none' placeholder='post category...' />
                            <div onClick={addCategory} className='bg-black text-white px-4 py-2 font-semibold cursor-pointer'>Add</div>
                        </div>

                        {/* Categories */}
                        <div className='flex p-4 mt-3' >
                            {categories.map((category, ind) => (
                                <div key={ind} className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-lg'>
                                    <p>{category}</p>
                                    <p onClick={() => deleteCategory(ind)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm '><ImCross /></p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <textarea
                        value={description}
                        onChange={(e) => setTitle(e.target.value)}
                        className='px-4 py-2 outline-none' placeholder='post description' rows={15} cols={30}></textarea>
                    <button
                        onClick={handleUpdate}
                        className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Update Post</button>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default EditPost