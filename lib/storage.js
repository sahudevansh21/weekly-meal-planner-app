"use client";

const APP_PREFIX = "weeklyMealPlanner_";

export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(APP_PREFIX + key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to local storage:", error);
  }
};

export const loadFromLocalStorage = (key, defaultValue) => {
  try {
    if (typeof window === 'undefined') return defaultValue; // Server-side check
    const item = localStorage.getItem(APP_PREFIX + key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Error loading from local storage:", error);
    return defaultValue;
  }
};

export const removeFromLocalStorage = (key) => {
  try {
    if (typeof window === 'undefined') return; // Server-side check
    localStorage.removeItem(APP_PREFIX + key);
  } catch (error) {
    console.error("Error removing from local storage:", error);
  }
};
