import { useLocation } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "./../components/Header";
import { useNavigate } from "react-router-dom";

export default function Goal() {
  const location = useLocation();
  const navigate = useNavigate();
  const goalID = location.state.goalId;
  const { currentUser } = useSelector((state) => state.user);
  const [getGoalError, setGetGoalError] = useState(null);
  const [showGetGoalError, setShowGetGoalError] = useState(false);
  const [loading, setLoading] = useState(null);
  const [goal, setGoal] = useState({});
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    getGoal();
  }, [currentUser._id, goalID]);

  const getGoal = async () => {
    try {
      setLoading(true);
      setShowGetGoalError(false);
      const response = await fetch(
        `/api/goals/get-goal/${currentUser._id}/${goalID}`
      );
      const data = await response.json();
      if (data.success === false) {
        setLoading(false);
        setShowGetGoalError(true);
        return;
      }
      setGoal(data.goal);
      setLoading(false);
    } catch (error) {
      console.log("OOPS");
      setLoading(false);
      setGetGoalError(error.message);
      setShowGetGoalError(true);
    }
  };

  const handleChange = (e) => {
    setUpdatedData({
      ...updatedData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/goals/update-goal/${currentUser._id}/${goalID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success === false) {
        console.log("Error updating goal.");
        return;
      }
      navigate("/goals");
      console.log("Goal updated successfully.");
    } catch (error) {
      console.log("Error capturing form data.");
    }
  };

  return (
    <section>
      <div className="flex flex-col justify-center mx-auto max-w-2xl">
        <h1 className="text-3xl mx-auto p-3">Update Goal</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-3">
          <input
            className="border p-3 rounded-lg"
            type="text"
            placeholder="Category"
            defaultValue={goal.category}
            id="category"
            onChange={handleChange}
          />
          <input
            className="border p-3 rounded-lg"
            type="text"
            placeholder="title"
            defaultValue={goal.title}
            id="title"
            onChange={handleChange}
          />
          <textarea
            className="border p-3 rounded-lg"
            type="text"
            placeholder="description"
            defaultValue={goal.description}
            id="description"
            onChange={handleChange}
          />
          <input
            className="border p-3 rounded-lg"
            type="text"
            placeholder="unit"
            defaultValue={goal.unit}
            id="unit"
            onChange={handleChange}
          />
          <input
            className="border p-3 rounded-lg"
            type="checkbox"
            placeholder="completionBool"
            defaultValue={goal.completionBool}
            id="completionBool"
            onChange={handleChange}
          />
          <button className="p-3 rounded-lg uppercase bg-green-500">
            Update
          </button>
        </form>
      </div>
    </section>
  );
}
