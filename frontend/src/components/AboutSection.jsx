import React from 'react'
import { BsGithub, BsLinkedin } from 'react-icons/bs';

export default function AboutSection() {
  return (
    <div className='w-full bg-white py-16 px-10'>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
            <img src='/images/dean-web-profile.jpg'
                className='w-[400px] mx-auto my-4 py-7'
                alt='daily a goals page' />
            <div className='flex flex-col justify-center'>
                <h1 className='font-bold text-3xl md:text-5xl lg:text-6xl'>About</h1>
                <p className='py-4 font-semibold'>
                I came up with the idea after trying to find something that would help motivate me enough to stick to my goals.
                I had no problem setting goals but soon after they'd fall by the wayside. I wanted to make something that would force me
                to engage with them at the start of every day and then rate my performance over time. It's more the constant engagement
                that helps you than actually keeping track of your goals. If you're interested in following the development you can check
                out the GitHub repository below. Follow me on LinkedIn if you'd like to connect.
                </p>
                <ul>
                    <div className='flex items-center py-2'>
                        <BsGithub size={25} />
                        <li className='px-2 font-semibold'><a href='https://github.com/deanbirnie' target='_blank'>My GitHub Portfolio</a></li>
                    </div>
                    <div className='flex items-center py-2'>
                        <BsLinkedin size={25} />
                        <li className='px-2 font-semibold'><a href='https://www.linkedin.com/in/dean-birnie/' target='_blank'>My LinkedIn Page</a></li>
                    </div>
                </ul>
            </div>
        </div>
    </div>
  )
}
