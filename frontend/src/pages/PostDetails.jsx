import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import Comment from "../components/Comment";
import axios from "axios";
import { URL, IF } from "../url";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";

const PostDetails = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const postId = useParams().id
  const [post, setPost] = useState({})
  const [comment, setComment] = useState('')
  const [loader, setLoader] = useState(false)
  const [comments, setComments] = useState([])

  const fetchPost = async () => {
    setLoader(true)
    try {
      const res = await axios.get(URL + '/api/posts/' + postId, { withCredentials: true })
      setPost(res.data)
      // console.log(post)
    } catch (error) {
      console.log(error)
    }
    setLoader(false)
  }

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(URL + '/api/posts/' + postId, { withCredentials: true })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const fetchPostComments = async () => {
    try {
      const res = await axios.get(URL + '/api/comment/post/' + postId, { withCredentials: true })
      setComments(res.data)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const postComment = async (e) => {
    e.preventDefault()
    const res = await axios.post(URL + '/api/comment/create', { comment: comment, author: user.username, postId: postId, userId: user._id }, { withCredentials: true })
    const tempComment = comments;
    tempComment.push(res.data)
    setComments(tempComment)
    setComment('')
  }

  useEffect(() => {
    fetchPost()
  }, [postId])

  useEffect(() => {
    fetchPostComments()
  }, [postId])
  return (
    <div>
      {/* {!user && navigate('/')} */}
      <Navbar />
      {loader ? <div className="w-full j-[40vh] flex items-center justify-center"><Loader /></div> : <div className="px-8 md:px-[200px] mt-8 ">
        <div className="flex justify-between items-center ">
          <h1 className="text-2xl font-bold text-black md:text-3xl ">{post.title}</h1>
          {user?._id === post.userId ?
            <div className="flex items-center justify-center space-x-2">
              <p className="cursor-pointer" onClick={() => navigate('/edit/' + postId)}><BiEdit /></p>
              <p className="cursor-pointer" onClick={handleDeletePost}><MdDelete /></p>
            </div> : <></>
          }
        </div>
        <div className="flex items-center justify-between mt-2 md:mt-4">
          <p>{post.username}</p>
          <div className='flex space-x-2'>
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <img src={IF + post.photo}
          alt="img" className="w-full mx-auto mt-8" />
        <p className="mx-auto mt-8 ">{post.description}</p>
        {/* write a comment */}
        <div className="flex flex-col border mt-4 md:flex-row rounded-xl overflow-hidden">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text" className="md:w-[90%] outline py-2 px-4 mt-4 md:mt-0 " placeholder="write comment" />
          <button
            onClick={postComment}
            className="bg-black text-white h-full px-4 py-2 md:w-[10%]">Add</button>
        </div>
        <div className="flex items-center mt-8 space-x-4 font-semibold ">
          <p>Cartegories:</p>
          <div className="flex justify-center items-center space-x-2">
            {post.categories?.map((cat, ind) => (
              <div key={ind} className="bg-gray-300 rounded-lg px-3 py-1 ">{cat}</div>
            ))}
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
          {/* comment */}
          {comments && comments?.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>

      </div>
      }
      <Footer />
    </div>
  );
};

export default PostDetails;
