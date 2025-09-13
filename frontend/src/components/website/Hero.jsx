import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className='text-center  flex-col items-center justify-between mx-40 lg:px-80 gap-9 space-y-5'>
        <h1 className='font-extrabold  text-5xl leading-14 lg:text-[60px] mt-16'>
          <span className='text-[#f56551]'>  Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips
        </h1>
        <p className='text-xl text-gray-500 '>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
        <Link to="/create-trip">  
        
        <Button>Get Started, It's Free</Button>
        </Link>
    </section>
  )
}

export default Hero