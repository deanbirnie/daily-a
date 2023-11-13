import React from 'react'

export default function Watch() {
  return (
    <div className='w-full bg-slate-100'>
        <div className='flex flex-col justify-center'>
            <h2 className='font-bold text-3xl md:text-5xl lg:text-6xl py-7 px-10 mx-auto'>Behind the Code</h2>
            <iframe
            className='sm:w-[560px] md:w-[840px] sm:h-[315px] md:h-[472px] py-7 px-10 mx-auto'
            width="560"
            height="315"
            src="https://www.youtube.com/embed/MEkaqZecpUQ?si=W4uWruGcBL9q67nW"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen
            ></iframe>
        </div>
    </div>
  )
}
