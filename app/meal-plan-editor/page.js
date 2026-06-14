"use client";

import { useState, useEffect } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '../../lib/storage';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snacks"];

const defaultMealPlan = Object.fromEntries(daysOfWeek.map(day => [
  day, Object.fromEntries(mealTypes.map(mealType => [mealType, ""])) ]
));

export default function MealPlanEditorPage() {
  const [mealPlan, setMealPlan] = useState({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedPlan = loadFromLocalStorage("currentPlan", defaultMealPlan);
    setMealPlan(savedPlan);
  }, []);

  useEffect(() => {
    if (isClient) {
      saveToLocalStorage("currentPlan", mealPlan);
    }
  }, [mealPlan, isClient]);

  const handleMealChange = (day, mealType, value) => {
    setMealPlan(prevPlan => ({
      ...prevPlan,
      [day]: {
        ...prevPlan[day],
        [mealType]: value,
      },
    }));
  };

  const clearMealPlan = () => {
    if (window.confirm("Are you sure you want to clear the entire meal plan?")) {
      setMealPlan(defaultMealPlan);
    }
  };

  if (!isClient) {
    return <div className="loading-message">Loading Meal Plan Editor...</div>;
  }

  return (
    <div className="meal-plan-editor-page">
      <h1 className="gradient-text">Weekly Meal Plan Editor</h1>
      <p>Input your meals for each day of the week. Your changes are automatically saved.</p>

      <div className="glass-card">
        <div className="meal-plan-grid">
          <div className="meal-plan-grid-header"></div> {/* Empty corner */}
          {mealTypes.map(mealType => (
            <div key={mealType} className="meal-plan-grid-header">{mealType}</div>
          ))}

          {daysOfWeek.map(day => (
            <div key={day} className="meal-plan-grid-row">
              <div className="meal-plan-grid-header day-header">{day}</div>
              {mealTypes.map(mealType => (
                <div key={`${day}-${mealType}`} className="meal-plan-grid-cell">
                  <input
                    type="text"
                    value={mealPlan[day]?.[mealType] || ''}
                    onChange={(e) => handleMealChange(day, mealType, e.target.value)}
                    placeholder={`Add ${mealType}`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="btn-group">
          <button onClick={clearMealPlan} className="btn btn-secondary">
            Clear All Meals
          </button>
        </div>
      </div>
    </div>
  );
}
