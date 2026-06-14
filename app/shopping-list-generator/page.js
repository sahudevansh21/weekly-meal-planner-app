"use client";

import { useState, useEffect } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '../../lib/storage';

const parseMealsForIngredients = (mealPlan) => {
  if (!mealPlan) return [];

  const allIngredients = new Set();
  const commonDelimiters = /,| and | with | & |\s+/; // improved delimiter list

  Object.values(mealPlan).forEach(dayMeals => {
    Object.values(dayMeals).forEach(mealDescription => {
      if (mealDescription && typeof mealDescription === 'string') {
        const items = mealDescription.toLowerCase()
          .split(commonDelimiters)
          .map(item => item.trim())
          .filter(item => item.length > 2 && !['a', 'an', 'the', 'for', 'of', 'some', 'fresh'].includes(item)); // Basic filter for common short words
        items.forEach(item => allIngredients.add(item));
      }
    });
  });
  return Array.from(allIngredients).sort();
};

export default function ShoppingListGeneratorPage() {
  const [mealPlan, setMealPlan] = useState({});
  const [shoppingList, setShoppingList] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const currentPlan = loadFromLocalStorage("currentPlan", {});
    setMealPlan(currentPlan);
    
    const savedShoppingList = loadFromLocalStorage("shoppingList", []);
    if (savedShoppingList.length > 0) {
      setShoppingList(savedShoppingList);
    } else {
      // If no saved list, generate from meal plan
      const generatedList = parseMealsForIngredients(currentPlan);
      setShoppingList(generatedList);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      saveToLocalStorage("shoppingList", shoppingList);
    }
  }, [shoppingList, isClient]);

  const generateListFromPlan = () => {
    const currentPlan = loadFromLocalStorage("currentPlan", {});
    setMealPlan(currentPlan); // Update current meal plan in state
    const generatedItems = parseMealsForIngredients(currentPlan);
    setShoppingList(generatedItems);
  };

  const addItem = () => {
    if (newItem.trim()) {
      setShoppingList(prevList => {
        const updatedList = [...prevList, newItem.trim()];
        return [...new Set(updatedList)].sort(); // Ensure unique and sorted
      });
      setNewItem('');
    }
  };

  const removeItem = (itemToRemove) => {
    setShoppingList(prevList => prevList.filter(item => item !== itemToRemove));
  };

  const clearList = () => {
    if (window.confirm("Are you sure you want to clear the entire shopping list?")) {
      setShoppingList([]);
    }
  };

  const printList = () => {
    window.print();
  };

  if (!isClient) {
    return <div className="loading-message">Loading Shopping List Generator...</div>;
  }

  return (
    <div className="shopping-list-generator-page">
      <h1 className="gradient-text">Shopping List Generator</h1>
      <p>Automatically generate a shopping list from your current meal plan. Add custom items, remove unneeded ones, then save or print!</p>

      <div className="glass-card">
        <h2>Current List</h2>
        <div className="shopping-list-area">
          {shoppingList.length === 0 ? (
            <p>Your shopping list is empty. Start by generating from your meal plan or adding items manually!</p>
          ) : (
            <ul>
              {shoppingList.map((item, index) => (
                <li key={item + index} className="shopping-list-item">
                  <span>{item}</span>
                  <button onClick={() => removeItem(item)} className="btn btn-secondary">
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="shopping-list-input-group">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new item (e.g., milk, eggs)"
            onKeyDown={(e) => e.key === 'Enter' && addItem()}
          />
          <button onClick={addItem} className="btn">
            Add Item
          </button>
        </div>

        <div className="btn-group shopping-list-controls">
          <button onClick={generateListFromPlan} className="btn">
            Generate from Meal Plan
          </button>
          <button onClick={clearList} className="btn btn-secondary">
            Clear List
          </button>
          <button onClick={printList} className="btn btn-secondary">
            Print List
          </button>
        </div>
      </div>
    </div>
  );
}
