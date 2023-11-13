import React from 'react';
import { Link } from 'react-router-dom';
import Typed from 'react-typed';

export default function Hero() {

    const backgroundImage = {
        backgroundImage: `url('/images/Hero.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
    }
  return (
    <div style={backgroundImage}>
        <div className='max-w-4xl w-full h-screen mx-auto text-center flex flex-col justify-center items-center'>
            <h1 className='flex text-9xl'>
                <span className='text-orange-600 font-semibold'>Daily</span>
                <Typed
                className='text-orange-800 font-semibold'
                strings={['B','A','A+']}
                typeSpeed={200}
                backSpeed={200}
                loop 
                />
            </h1>
            <p className='pt-16 pb-7 p-3 font-semibold text-3xl'>Get your goals.</p>
            <Link to='/sign-up'>
            <button className='rounded-lg w-40 p-3 font-semibold bg-orange-500 uppercase hover:opacity-90'>Sign Up</button>
            </Link>
        </div>
    </div>
  )
}
