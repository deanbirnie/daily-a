// import { FaSearch } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useState } from "react";
import Typed from "react-typed";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-end max-w-7xl mx-auto p-3">
        {currentUser ? (
          <Link to="/daily-card">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-orange-600">Daily</span>
              <span className="text-orange-700">A</span>
            </h1>
          </Link>
        ) : (
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-orange-600">Daily</span>
              <span className="text-orange-700">A</span>
            </h1>
          </Link>
        )}
        <nav className="flex flex-col justify-center">
          <ul className="flex gap-4">
            {currentUser ? (
              <div className="hidden"></div>
            ) : (
              <li className="sm:inline text-slate-800 hover:underline hover:opacity-70">
                <a href="/">
                  DailyA
                </a>
              </li>
            )}
            {currentUser ? (
              <Link to="/daily-card">
                <li className="sm:inline text-slate-800 hover:underline hover:opacity-70">
                  daily card
                </li>
              </Link>
            ) : (
              <div className="hidden"></div>
            )}
            {currentUser ? (
              <Link to="/goals">
                <li className="sm:inline text-slate-800 hover:underline hover:opacity-70">
                  my goals
                </li>
              </Link>
            ) : (
              <div className="hidden"></div>
            )}
            <div></div>
            <div>
              <Link to="/profile">
                {currentUser ? (
                  <img
                    className="rounded-full h-7 w-7 object-cover hover:opacity-80"
                    src={currentUser.profilePhoto}
                    alt="profile"
                  />
                ) : (
                  <li className="sm:inline text-slate-800 hover:underline">
                    Sign In
                  </li>
                )}
              </Link>
            </div>
            {currentUser ? (
              <div className="hidden"></div>
            ) : (
              <div className="flex">
                <p>|</p>
                <Link to="/sign-up">
                  <li className="ml-4 sm:inline text-slate-800 hover:underline">
                    Sign Up
                  </li>
                </Link>
              </div>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
