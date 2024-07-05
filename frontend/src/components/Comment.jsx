import React, { useContext } from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { URL } from '../url'
import { useNavigate } from 'react-router-dom'

const Comment = ({ comment }) => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const handleDeleteComment = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.delete(URL + "/api/comment/" + comment._id, { withCredentials: true })
            console.log(res.data)
            navigate('/posts/post/' + comment.postId)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-600">{comment.author}</h3>
                <div className="flex justify-center items-center space-x-4">
                    <p className="text-gray-500 text-sm">{new Date(comment.updatedAt).toString().slice(0, 15)}</p>
                    <p className="text-gray-500 text-sm">{new Date(comment.updatedAt).toString().slice(16, 24)}</p>
                    {user?._id === comment?.userId && <div className="flex items-center justify-center space-x-2">
                        <p><BiEdit /></p>
                        <p onClick={handleDeleteComment} className='cursor-pointer'><MdDelete /></p>
                    </div>}
                </div>
            </div>
            <p className="mt-2 px-4 ">{comment.comment}</p>
        </div>
    )
}

export default Comment