import React, { useState, useEffect } from "react";
import LeftPane from "../components/daily_card/LeftPane";
import Card from "../components/daily_card/Card";

export default function DailyCard() {
  const [showPane, setShowPane] = useState(true);
  const [ hiddenGoals, setHiddenGoals] = useState([]);

  const togglePane = () => {
    setShowPane(!showPane);
  };

  useEffect(() => {
    const storedHiddenGoals = JSON.parse(localStorage.getItem('hiddenGoals')) || [];
    setHiddenGoals(storedHiddenGoals);
  }, []);

  const addToHiddenGoals = (goalId) => {
    setHiddenGoals(prevState => {
      const newState = [...prevState, goalId];
      localStorage.setItem('hiddenGoals', JSON.stringify(newState));
      return newState;
    });
  };

  const removeFromHiddenGoals = (goalId) => {
    setHiddenGoals(prevState => {
      const newState = prevState.filter(id => id !== goalId);
      localStorage.setItem('hiddenGoals', JSON.stringify(newState));
      return newState;
    });
  };

  // if Pane is expanded then adjust page proportions starting with the div
  const cardStyle = showPane ? 
    "flex flex-grow px-4 py-4 gap-4 overflow-x-hidden" :
    "flex flex-grow px-4 py-4 gap-4 w-full";

  // if Pane is expanded then adjust page proportions for the card component
  const cardStyleCols = showPane ?
  "flex" :
  "";

  return (
    <div className="">
        <div className={cardStyle}>
          {showPane && <LeftPane className=""
            hiddenGoals={hiddenGoals}
            addToHiddenGoals={addToHiddenGoals} />}
          <Card className={cardStyleCols}
            showPane={showPane}
            togglePane={togglePane}
            hiddenGoals={hiddenGoals}
            removeFromHiddenGoals={removeFromHiddenGoals}/>
        </div>
    </div>
  )
}
