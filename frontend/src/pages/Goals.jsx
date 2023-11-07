import React, { useState } from 'react';

const mockCategories = {
    Fitness: ["Run 5km", "Do 10 pushups", "Do 10 situps"],
    Education: ["Read 10 pages", "Watch a documentary"],
};

export default function Goals() {
    const [showForm, setShowForm] = useState(false);
    const [categories, setCategories] = useState([mockCategories]);
    const [expandedCategories, setExpandedCategories] = useState({});

    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };

    const handleCategoryClick = (category) => {
        setExpandedCategories({
            ...expandedCategories,
            [category]: !expandedCategories[category],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted");
        setShowForm(false);
    };

  return (
    <div className='flex flex-col items-center justify-center'>
        <h1 className='text-3xl font-semibold mb-4'>Your Goals</h1>
        <button
            className='mb-4 bg-blue-500 test-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none'
            type='button'
            onClick={toggleFormVisibility}
        >
            {showForm ? 'Hide Form' : 'Add New Goal'}
        </button>
        {showForm && (
            <form className='mb-8' onSubmit={handleSubmit}>
                <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    type='text'
                    placeholder='Title'
                    required
                />
                <textarea
                    className='mt-2 w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    placeholder='Description'
                    required
                ></textarea>
                <button
                    className='mt-4 bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none'
                    type='submit'
                >Submit Goal</button>
            </form>
        )}

        {Object.keys(categories).map((category) => (
            <div key={category} className='w-full'>
                <button
                    className="w-full text-left font-semibold py-2 px-4 border-b border-gray-200"
                    onClick={() => handleCategoryClick(category)}
                >{category}</button>
                {expandedCategories[category] && (
                <div className="flex flex-col items-start pl-4 pb-4">
                    {categories[category].map((goal, index) => (
                    <p key={index} className="text-gray-700 py-1">{goal}</p>
                    ))}
                </div>
                )}
            </div>
        ))}
    </div>
  );
};
