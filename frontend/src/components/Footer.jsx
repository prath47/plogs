import React from 'react'

const Footer = () => {
  return (
    <>
      <div className="mt-8 w-full bg-black px-8 md:px-[300px] flex md:flex-row flex-col items-start space-y-4 md:space-y-0 md:justify-between text-sm md:text-md py-8">
        <div className="flex flex-col text-white ">
          <p>Lorem</p>
          <p>Lorem</p>
          <p>Lorem</p>
        </div>
        <div className="flex flex-col text-white ">
          <p>Lorem</p>
          <p>Lorem</p>
          <p>Lorem</p>
        </div>
        <div className="flex flex-col text-white ">
          <p>Lorem</p>
          <p>Lorem</p>
          <p>Lorem</p>
        </div>
      </div>
      <p className="py-2 pb-6 w-full text-white bg-black text-center text-sm">
        All rights reserved @plogs
      </p>
    </>
  );
}

export default Footer