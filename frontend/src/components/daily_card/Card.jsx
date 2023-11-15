import React, { useState, useEffect } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Card({ showPane, togglePane, hiddenGoals, removeFromHiddenGoals }) {
    const [loading, setLoading] = useState(false);
    const [showGoalsError, setShowGoalsError] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const [ scorecardGoals, setScorecardGoals ] = useState([]);

   useEffect(() => {
    getScorecardGoals();
   }, [hiddenGoals]);
   
    const handleRemoveFromCard = async (goalId) => {
        removeFromHiddenGoals(goalId);
    };

    const getScorecardGoals = async () => {
        if (!hiddenGoals || hiddenGoals.length === 0) {
            return;
        }

        try {
            setLoading(true);
            const goalsData = await Promise.all(
                hiddenGoals.map(async (goalId) => {
                    const response = await fetch (`/api/goals/get-goal/${currentUser._id}/${goalId}`);
                    if (!response.ok) {
                        throw new Error("Error getting goal");
                    }
                    return await response.json();
                })
            );
            setScorecardGoals(goalsData.map(data => data.goal));
        } catch (error) {
            console.log("Error getting scorecard goals: ", error);
            setShowGoalsError(true);
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className="w-screen h-screen overflow-y-scroll overflow-x-clip">
      <div>
        {/* Top portion with collapse button and header text */}
        <div>
          {showPane ? (
            <FaAngleDoubleLeft size={25} onClick={togglePane} />
          ) : (
            <FaAngleDoubleRight size={25} onClick={togglePane} />
          )}
        </div>
        <div className="flex justify-center">
          <h1 className="uppercase text-3xl font-bold">Plan your day</h1>
        </div>
        {/* testing remove function */}
        {/* <button
            className="p-3 uppercase bg-red-500 rounded"
            onClick={() => handleRemoveFromCard("654bdd30eb017c0361a5d575")}
        >Remove</button> */}
      </div>
      {/* Primary section where goal tiles are displayed */}
      <div>
        <div className="h-screen">
          <p className="mx-auto">
            {showGoalsError ? "There was an error, please try again." : ""}
          </p>
          <p className="mx-auto text-xl font-bold">
            {loading ? "Loading..." : ""}
          </p>
          {scorecardGoals && (
            <div className="p-2">
              {scorecardGoals.map((goal) => (
                hiddenGoals.includes(goal._id) && (
                <div
                  key={goal._id}
                  className="border rounded-lg flex justify-between h-auto bg-white shadow-md min-h-100 p-2 m-2 mt-3"
                >
                  <div className="flex flex-col justify-between min-w-full p-2">
                    <div className="">
                      <p className="font-semibold text-lg">{goal.title}</p>
                      <p className="text-slate-500">{goal.category}</p>
                      <p className="mt-7 font-semibold">Description:</p>
                      <p>{goal.description}</p>
                    </div>
                    <div className="mt-5 p-3 gap-4 flex justify-center items-center">
                      <button
                        className="p-1 uppercase text-white font-semibold rounded-lg bg-red-500 w-60 shadow-sm hover:shadow-lg"
                        onClick={() => handleRemoveFromCard(goal._id)}
                      >
                        Remove from card
                      </button>
                    </div>
                  </div>
                </div>
              )))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
