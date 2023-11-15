import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

export default function LeftPane({ hiddenGoals, addToHiddenGoals }) {
    const [ loading, setLoading ] = useState(false);
    const [ showGoalsError, setShowGoalsError ] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const [ userGoals, setUserGoals ] = useState([]);

    // Auto-load all goals from db and display in LeftPane
    useEffect(() => {
        getUserGoals();
      }, []);
    
      const getUserGoals = async () => {
        try {
          setLoading(true);
          setShowGoalsError(false);
          const response = await fetch(`/api/goals/get-goals/${currentUser._id}`);
          const data = await response.json();
          if (data.success === false) {
            setShowGoalsError(true);
            setLoading(false);
            return;
          }
          setUserGoals(data.goals);
          setLoading(false);
        } catch (error) {
          setShowGoalsError(true);
          setLoading(false);
          console.log("Error getting user goals.");
          console.log(error.message);
        }
      };

      const handleAddToCard = async (goalId) => {
        addToHiddenGoals(goalId);
      };

  return (
    <div className='h-screen overflow-y-scroll w-1/4 flex justify-center'>
        <p className='mx-auto'>{showGoalsError ? "There was an error, please try again." : ""}</p>
        <p className='mx-auto text-xl font-bold'>{loading ? "Loading..." : ""}</p>
        {userGoals && (
        // use two cols for mobile, 4 for md and up
        <div className="p-2">
          {userGoals.map((goal) => (
            <div
              key={goal._id}
              className={`goal-item ${hiddenGoals.includes(goal._id) ? "hidden" : "border rounded-lg flex justify-between h-auto bg-white shadow-md min-h-100 p-2 m-2 mt-3"}`}>
              <div className="flex flex-col justify-between min-w-full p-2">
                <div className="">
                  <p className="font-semibold text-lg">{goal.title}</p>
                  <p className="text-slate-500">{goal.category}</p>
                  <p className="mt-7 font-semibold">Description:</p>
                  <p>{goal.description}</p>
                </div>
                <div className="mt-5 p-3 gap-4 flex justify-center items-center">
                    <button className="p-1 uppercase text-white font-semibold rounded-lg bg-green-500 w-40 shadow-sm hover:shadow-lg"
                        onClick={() => handleAddToCard(goal._id)}>
                      Add to card
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
