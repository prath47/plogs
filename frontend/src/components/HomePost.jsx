import React from 'react'
import { IF } from '../url'

const HomePost = ({ post }) => {
  return (
    <div className="w-full flex mt-8 itmes-center space-x-4">
      {/* Left */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img
          className='object-cover h-full w-full'
          src={IF+post.photo}
          alt="img"
        />
      </div>
      {/* right */}
      <div className='flex flex-col w-[65%]'>
        <h1 className='text-xl font-bold md:mb-2 mb-1 md:text-2xl'>{post.title}</h1>
        <div className='flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4'>
          <p>{post.username}</p>
          <div className='flex space-x-2'>
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className='text-sm md:text-base overflow-hidden'>{post.description.slice(0, 400) + "...Read More"}</p>

      </div>
    </div>
  );
}

export default HomePost