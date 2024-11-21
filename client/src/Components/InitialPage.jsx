import React from 'react'
import bot from "./../assets/bot.png"
import { Link } from 'react-router-dom'

const InitialPage = () => {
  return (
    <div className='grid grid-cols-2 justify-items-center w-full items-center text-center min-h-[100vh] relative max-md:grid-cols-1 max-md:gap-8 py-10 overflow-hidden'>
        <div className=' index-bg absolute w-[100vw] h-[100vh] opacity-15'/>
        <div className='flex flex-col items-center gap-3 z-10'>
            <h1 className='bg-gradient-to-r from-[#217bfe] to-[#e55571] text-transparent bg-clip-text text-6xl font-bold bottom-to-top'>VITNest</h1>
            <div className='font-bold text-lg mt-2 bottom-to-top'>Supercharge your creativity and productivity</div>
            <p className='bottom-to-top'>Experience seamless conversations with our AI chat app. Connect effortlessly, get instant responses.</p>
            <Link to={"/login"} className="bg-[#217bfe]
            bg-gradient-to-r from-[#217bfe] to-[#e55571]
            font-semibold space-x-2 px-4 py-2 rounded-lg my-5 text-inherit bottom-to-top">Get Started</Link>
        </div>
        <div className="bg-[#140e2d] bg-img z-10 max-md:hidden">
            <img src={bot} alt="" loading='eager'/>
        </div>
    </div>
  )
}

export default InitialPage