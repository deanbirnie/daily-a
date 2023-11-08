import React, { useState } from 'react';
import { useSelector } from 'react-redux';



export default function Goals() {
    const [showForm, setShowForm] = useState(false);
    const [ error, setError ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        category: '',
        title: '',
        description: '',
        unit: '',
        completionBool: false,
    });

    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };

    // const handleCategoryClick = (category) => {
    //     setExpandedCategories({
    //         ...expandedCategories,
    //         [category]: !expandedCategories[category],
    //     });
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userID = currentUser._id;
        try {
            const response = await fetch(`api/goals/create-goal/${userID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                }),
            });
            const data = await response.json();
            setLoading(false);
            toggleFormVisibility();
            if (data.success === false) {
                setError(data.message);
            }
            console.log('Goal created successfully!');
        } catch (error) {
            setError(error.message);
            setLoading(false);
            console.log('Error creating goal.');
        }
    };

    const handleChange = (e) => {
        if (e.target.type === 'text' ||
            e.target.type === 'textarea') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value,
            });
        }
        
        if (e.target.id === 'completionBool') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked,
            });
        }
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-3xl font-semibold mb-4 p-3'>Your Goals</h1>
            <button
                className='mb-4 bg-blue-500 test-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none'
                type='button'
                onClick={toggleFormVisibility}
            >
                {showForm ? 'Hide Form' : 'Add New Goal'}
            </button>
            {showForm && (
                <div className='p-3 max-w-2xl mx-auto'>
                    <h1 className='text-3xl font-semibold text-center my-7'>Create a new goal</h1>
                    <form className='mb-8' onSubmit={handleSubmit}>
                        <input
                            className='mt-4 w-full shadow appearance-none border rounded p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type='text'
                            placeholder='Category'
                            id='category'
                            onChange={handleChange}
                            value={formData.category}
                            required
                            />
                        <input
                            className='mt-4 w-full shadow appearance-none border rounded p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type='text'
                            placeholder='Title'
                            id='title'
                            onChange={handleChange}
                            value={formData.title}
                            required
                            />
                        <textarea
                            className='mt-4 w-full shadow appearance-none border rounded p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            placeholder='Description'
                            id='description'
                            onChange={handleChange}
                            value={formData.description}
                            required
                            ></textarea>
                        <input
                            className='mt-4 w-full shadow appearance-none border rounded p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type='text'
                            placeholder='Unit of Measure'
                            id='unit'
                            onChange={handleChange}
                            value={formData.unit}
                            />
                        <div className='flex gap-2 mt-4'>
                            <input className='w-5'
                                type='checkbox'
                                id='completionBool'
                                onChange={handleChange}
                                value={formData.completionBool}/>
                            <span>Use completion status instead of unit.</span>
                        </div>
                        <button
                            className='mt-6 bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none'
                            type='submit'
                            >Submit Goal</button>
                    </form>
                </div>
            )}
        </div>
    );
};
