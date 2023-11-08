import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUserStart,
    signOutUserSuccess,
    signOutUserFailure } from '../redux/user/user.slice.js';
// import { useNavigate } from 'react-router-dom';


export default function Profile() {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            dispatch(signOutUserStart());
            const response = await fetch('/api/auth/sign-out');
            const data = await response.json();
            if (data.success === false) {
                dispatch(signOutUserFailure(data.message));
                return;
            }
            dispatch(signOutUserSuccess());
        } catch (error) {
            dispatch(signOutUserFailure(error.message));
        };
    };
    return (
        <div className='p-3 max-w-lg mx-auto flex flex-col'>
            <h1 className='text-3xl text-center font-semibold my-7'>Profile</h1>
            <img src={ currentUser.profilePhoto }
                alt='profile'
                className='rounded-full h-24 w-24 object-cover cursor-pointer self-center my-2'
            />
            <h3 className='text-3xl text-center font-semibold my-7'>User: { currentUser.username }</h3>
            <h3 className='text-3xl text-center font-semibold my-7'>Email: { currentUser.email }</h3>
            <form className='flex flex-col gap-4'>
                <button onClick={handleSignOut} className='bg-red-700 uppercase text-white p-3 mt-7 rounded-lg text-center hover:opacity-90'>Sign Out</button>
            </form>
            {/* <div className='flex mt-5'>
                <span className='text-red-700 cursor-pointer'>Sign Out</span>
            </div> */}
        </div>
    )
};
