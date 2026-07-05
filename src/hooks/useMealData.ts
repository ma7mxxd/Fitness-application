import { useState, useEffect } from 'react';

interface MealState {
  hasStartedNutrition: boolean;
  completedMeals: string[];
  selectedDay: number;
}

const STORAGE_KEY = 'fitai_meal_state';

export const useMealData = () => {
  const [mealState, setMealState] = useState<MealState>(() => {
    // Initialize state from localStorage immediately
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsed = JSON.parse(savedState);
        console.log('Loaded meal state from localStorage:', parsed);
        return parsed;
      }
    } catch (error) {
      console.error('Error loading meal state:', error);
    }
    
    // Default state if nothing in localStorage
    return {
      hasStartedNutrition: false,
      completedMeals: [],
      selectedDay: new Date().getDay()
    };
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      console.log('Saving meal state to localStorage:', mealState);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mealState));
    } catch (error) {
      console.error('Error saving meal state:', error);
    }
  }, [mealState]);

  const startNutritionPlan = () => {
    console.log('Starting nutrition plan');
    setMealState(prev => ({
      ...prev,
      hasStartedNutrition: true
    }));
  };

  const toggleMealCompletion = (mealId: string) => {
    console.log('Toggling meal completion for:', mealId);
    setMealState(prev => ({
      ...prev,
      completedMeals: prev.completedMeals.includes(mealId)
        ? prev.completedMeals.filter(id => id !== mealId)
        : [...prev.completedMeals, mealId]
    }));
  };

  const setSelectedDay = (day: number) => {
    console.log('Setting selected day to:', day);
    setMealState(prev => ({
      ...prev,
      selectedDay: day
    }));
  };

  const getCompletedMealsCount = () => {
    return mealState.completedMeals.length;
  };

  const resetMealPlan = () => {
    console.log('Resetting meal plan');
    const newState = {
      hasStartedNutrition: false,
      completedMeals: [],
      selectedDay: new Date().getDay()
    };
    setMealState(newState);
  };

  // Debug function to check localStorage
  const debugStorage = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    console.log('Current localStorage value:', saved);
    console.log('Current state:', mealState);
  };

  return {
    ...mealState,
    startNutritionPlan,
    toggleMealCompletion,
    setSelectedDay,
    getCompletedMealsCount,
    resetMealPlan,
    debugStorage
  };
};