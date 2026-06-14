"use client";

import { useState, useEffect } from 'react';
import { loadFromLocalStorage, saveToLocalStorage, removeFromLocalStorage } from '../../lib/storage';

export default function SavedPlansPage() {
  const [savedPlans, setSavedPlans] = useState([]);
  const [currentPlanName, setCurrentPlanName] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const loadedSavedPlans = loadFromLocalStorage("savedPlans", []);
    setSavedPlans(loadedSavedPlans);
  }, []);

  const saveCurrentPlan = () => {
    if (!currentPlanName.trim()) {
      alert("Please enter a name for your meal plan.");
      return;
    }

    const currentPlan = loadFromLocalStorage("currentPlan", {});
    if (Object.keys(currentPlan).length === 0 || Object.values(currentPlan).every(day => Object.values(day).every(meal => meal === '')) ) {
      alert("Your current meal plan is empty. Please add some meals before saving.");
      return;
    }

    const newPlanEntry = {
      id: Date.now().toString(),
      name: currentPlanName.trim(),
      plan: currentPlan,
      savedAt: new Date().toLocaleString(),
    };

    setSavedPlans(prevPlans => {
      const updatedPlans = [...prevPlans, newPlanEntry];
      saveToLocalStorage("savedPlans", updatedPlans);
      return updatedPlans;
    });
    setCurrentPlanName('');
    alert(`Meal plan '${newPlanEntry.name}' saved!`);
  };

  const loadSavedPlan = (planToLoad) => {
    if (window.confirm(`Are you sure you want to load '${planToLoad.name}'? This will overwrite your current meal plan.`)) {
      saveToLocalStorage("currentPlan", planToLoad.plan);
      // Clear current shopping list as it might be based on a different plan
      removeFromLocalStorage("shoppingList"); 
      alert(`Meal plan '${planToLoad.name}' loaded! Go to the Meal Plan Editor to see it.`);
      // Force a reload of the currentPlan in MealPlanEditor if it's open (though Next.js client-side navigation handles state)
      // A simple redirect or refresh could ensure this, but generally, components reacting to local storage changes handle it.
    }
  };

  const deleteSavedPlan = (planId, planName) => {
    if (window.confirm(`Are you sure you want to delete '${planName}'?`)) {
      setSavedPlans(prevPlans => {
        const updatedPlans = prevPlans.filter(plan => plan.id !== planId);
        saveToLocalStorage("savedPlans", updatedPlans);
        return updatedPlans;
      });
      alert(`Meal plan '${planName}' deleted.`);
    }
  };

  if (!isClient) {
    return <div className="loading-message">Loading Saved Plans...</div>;
  }

  return (
    <div className="saved-plans-page">
      <h1 className="gradient-text">Saved Meal Plans</h1>
      <p>Save your favorite weekly meal plans here and load them whenever you need!</p>

      <div className="glass-card">
        <h2>Save Current Meal Plan</h2>
        <div className="shopping-list-input-group">
          <input
            type="text"
            value={currentPlanName}
            onChange={(e) => setCurrentPlanName(e.target.value)}
            placeholder="Enter a name for your plan (e.g., 'Summer Meals', 'Keto Week 1')"
          />
          <button onClick={saveCurrentPlan} className="btn">
            Save Plan
          </button>
        </div>
      </div>

      <div className="glass-card">
        <h2>Your Saved Plans</h2>
        {savedPlans.length === 0 ? (
          <p>You haven't saved any plans yet. Plan a week and save it above!</p>
        ) : (
          <div className="saved-plans-list">
            {savedPlans.map(plan => (
              <div key={plan.id} className="saved-plan-card">
                <div>
                  <h3>{plan.name}</h3>
                  <p>Saved: {plan.savedAt}</p>
                </div>
                <div className="btn-group">
                  <button onClick={() => loadSavedPlan(plan)} className="btn btn-secondary">
                    Load Plan
                  </button>
                  <button onClick={() => deleteSavedPlan(plan.id, plan.name)} className="btn btn-secondary">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
