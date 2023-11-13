import React from 'react';
import { HiChevronDoubleRight } from 'react-icons/hi';

export default function Features() {
  return (
    <div className='w-full bg-slate-100 py-16 px-10'>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
            <div className='flex flex-col justify-center'>
                <h1 className='font-bold text-3xl md:text-5xl lg:text-6xl'>Features</h1>
                <p className='py-4 font-semibold'>
                    Daily A helps you to organise and keep track of your goalds. We give you
                    space to create and manage goals and a daily card that allows you 
                    to prioritise and score goals for a given day.
                </p>
                <ul className='font-semibold'>
                    <div className='flex items-center'>
                        <HiChevronDoubleRight />
                        <li className='px-2'>Create, Update, and Delete your personlised goals.</li>
                    </div>
                    <div className='flex items-center'>
                        <HiChevronDoubleRight />
                        <li className='px-2'>Prioritise goals each day.</li>
                    </div>
                    <div className='flex items-center'>
                        <HiChevronDoubleRight />
                        <li className='px-2'>Rate your performance at the end of each day.</li>
                    </div>
                    <div className='flex items-center'>
                        <HiChevronDoubleRight />
                        <li className='px-2'>Look back at past performance to see how far you've come.</li>
                    </div>
                </ul>
            </div>
            <img src='/images/goal-tiles-page.png'
                className='sm:w-[500px] md:w-full my-4 py-7 px-10'
                alt='daily a goals page' />
        </div>
    </div>
  )
}
