// import { FaSearch } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useState } from "react";

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-end max-w-7xl mx-auto p-3'>
                <Link to='/'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-[#FFE5B4]'>Daily</span>
                    <span className='text-[#FFAD60]'>A</span>
                </h1>
                </Link>
                <nav>
                    <ul className="flex gap-4">
                        <Link to='/'>
                            <li className="hidden sm:inline text-slate-800 hover:underline">Landing Page</li>
                        </Link>
                        <Link to='/daily-card'>
                            <li className="hidden sm:inline text-slate-800 hover:underline">Daily Card</li>
                        </Link>
                        <Link to='/about'>
                            <li className="hidden sm:inline text-slate-800 hover:underline">About</li>
                        </Link>
                        <Link to='/profile'>
                        {currentUser ? (
                            <img className="rounded-full h-7 w-7 object-cover" src={ currentUser.profilePhoto } alt='profile' />
                        ) : (
                            <li className="sm:inline text-slate-800 hover:underline">Sign In</li>
                            )}
                        </Link>
                    </ul>
                </nav>
            </div>
        </header>
    )
};
