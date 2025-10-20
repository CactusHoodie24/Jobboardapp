import Image from 'next/image'
import React from 'react'

const Banner = () => {
  return (
    <div className='flex'>
    <div className='flex flex-col gap-8'>
        <h1 className='text-3xl md:text-6xl font-bold'>Find your dream Job</h1>
        <div className='flex flex-col justify-center items-center md:flex-row gap-4'>
        <input className='border-2 rounded-sm md:w-[450px] w-[300px] h-[45px]  px-5 ' placeholder='Search for jobs' />
        <button className='w-[100px] px-2.5 md:px-8 py-2.5 text-white bg-cyan-500 border rounded-sm cursor-pointer'>Search</button>
    </div>
    </div>
    </div>
  )
}

export default Banner