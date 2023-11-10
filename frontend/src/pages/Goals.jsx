import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Goals() {
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showGoalsError, setShowGoalsError] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [userGoals, setUserGoals] = useState([]);
  const [goalId, setGoalId] = useState("");
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    unit: "",
    completionBool: false,
  });

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
      // console.log('Got goals.');
      // console.log(data.goals);
      // console.log(userGoals);
      // console.log(userGoals.length);
    } catch (error) {
      setShowGoalsError(true);
      setLoading(false);
      console.log("Error getting user goals.");
      console.log(error.message);
    }
  };

  // const handleEditGoal = async (goalId) => {
  //     try {

  //     } catch (error) {
  //         console.log('Error redirecting with goalId.');
  //     }
  // };

  const handleDeleteGoal = async (goalId) => {
    try {
      const response = await fetch(
        `/api/goals/delete-goal/${currentUser._id}/${goalId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (data.success === false) {
        console.log("Error deleting goal.");
        console.log(data.message);
        return;
      } else {
        window.location.reload(true);
        console.log("Goal deleted successfully!");
      }
    } catch (error) {
      console.log("Error deleting goal.");
      console.log(error.message);
    }
  };

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
    try {
      setLoading(true);
      setError(false);
      const response = await fetch(`api/goals/create-goal/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await response.json();
      setLoading(false);
      if (data.success) {
        // Reset form data if goal creation was successful
        setFormData({
          category: "",
          title: "",
          description: "",
          unit: "",
          completionBool: false,
        });
        window.location.reload(true);
      } else {
        setError(true);
      }
      toggleFormVisibility();
      console.log("Goal created successfully!");
    } catch (error) {
      setError(true);
      setLoading(false);
      console.log("Error creating goal.");
    }
  };

  const handleChange = (e) => {
    if (
      e.target.type === "text" ||
      e.target.type === "textarea" ||
      e.target.type === "checkbox"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mb-4 p-3">Your Goals</h1>
      <button
        className="mb-4 bg-green-800 text-white active:bg-green-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
        type="button"
        onClick={toggleFormVisibility}
      >
        {showForm ? "Hide Form" : "Add New Goal"}
      </button>
      {showForm && (
        <div className="p-3 max-w-2xl mx-auto">
          <h1 className="text-3xl font-semibold text-center my-7">
            Create a new goal
          </h1>
          <form className="mb-8" onSubmit={handleSubmit}>
            <input
              className="mt-4 w-full shadow appearance-none border rounded p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Category"
              id="category"
              onChange={handleChange}
              value={formData.category}
              required
            />
            <input
              className="mt-4 w-full shadow appearance-none border rounded p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Title"
              id="title"
              onChange={handleChange}
              value={formData.title}
              required
            />
            <textarea
              className="mt-4 w-full shadow appearance-none border rounded p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Description"
              id="description"
              onChange={handleChange}
              value={formData.description}
              required
            ></textarea>
            <input
              className="mt-4 w-full shadow appearance-none border rounded p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Unit of Measure"
              id="unit"
              onChange={handleChange}
              value={formData.unit}
            />
            <div className="flex gap-2 mt-4">
              <input
                className="w-5"
                type="checkbox"
                id="completionBool"
                onChange={handleChange}
                value={formData.completionBool}
              />
              <span>Use completion status instead of unit.</span>
            </div>
            <button
              className="mt-6 bg-green-800 text-white active:bg-green-700 font-bold uppercase text-xs font-white px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
              type="submit"
            >
              Submit Goal
            </button>
          </form>
        </div>
      )}
      <p>{showGoalsError ? "There was an error, please try again." : ""}</p>
      <p>{loading ? "Loading..." : ""}</p>
      {userGoals && (
        // use two cols for mobile, 4 for md and up
        <div className="p-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {userGoals.map((goal) => (
            <div
              key={goal._id}
              className="border rounded-lg p-4 flex justify-between bg-white shadow-md min-h-100"
            >
              <div className="flex flex-col justify-between min-w-full">
                <div className="">
                  <p className="font-semibold text-lg">{goal.title}</p>
                  <p className="text-slate-500">{goal.category}</p>
                  <p className="mt-7 font-semibold">Description:</p>
                  <p>{goal.description}</p>
                </div>
                <div className="mt-5 p-3 gap-4 flex justify-between items-center">
                  <Link to="/goal" state={{ goalId: goal._id }}>
                    <button className="p-1 uppercase text-white font-semibold rounded-lg bg-green-500 w-20 shadow-sm hover:shadow-lg">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteGoal(goal._id)}
                    className="p-1 uppercase text-white font-semibold rounded-lg bg-red-500 w-20 shadow-sm hover:shadow-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
