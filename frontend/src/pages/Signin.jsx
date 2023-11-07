import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Signin() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (event) => {
        setFormData({
                ...formData,
                [event.target.id]: event.target.value,
            });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const response = await fetch('/api/auth/sign-in',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            console.log(formData);
            const data = await response.json();
            console.log(data);
            if (data.success === false) {
                setError(data.message);
                setLoading(false);
                return;
            }
            setLoading(false);
            setError(null);
            navigate('/');
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };
  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <input type='text' placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
            <input type='text' placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
            <button disabled={loading} className='bg-orange-500 p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign In'}</button>
        </form>
        <div className='flex gap-2 mt-5'>
            <p>Dont have an account?</p>
            <Link to={ '/sign-up' }>
                <span className='text-blue-600'>Sign Up</span>
            </Link>
        </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
