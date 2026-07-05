import React, { useState } from 'react';
import { Coffee, Sun, Moon, Apple, Clock, Target, TrendingUp, Plus, Check } from 'lucide-react';
import { Meal } from '../types';
import { useMealData } from '../hooks/useMealData';

const MealPlanner: React.FC = () => {
  const {
    hasStartedNutrition,
    completedMeals,
    selectedDay,
    startNutritionPlan,
    toggleMealCompletion,
    setSelectedDay
  } = useMealData();

  // Only show meals if user has started their nutrition plan
  const todaysMeals: Meal[] = hasStartedNutrition ? [
    {
      id: '1',
      name: 'Protein Power Bowl',
      calories: 420,
      protein: 35,
      carbs: 25,
      fat: 18,
      ingredients: ['Greek yogurt', 'Berries', 'Granola', 'Almonds', 'Honey'],
      instructions: ['Mix yogurt with berries', 'Top with granola and almonds', 'Drizzle with honey'],
      mealType: 'breakfast'
    },
    {
      id: '2',
      name: 'Grilled Chicken Salad',
      calories: 380,
      protein: 42,
      carbs: 15,
      fat: 16,
      ingredients: ['Chicken breast', 'Mixed greens', 'Cherry tomatoes', 'Avocado', 'Olive oil'],
      instructions: ['Grill chicken breast', 'Toss greens with tomatoes', 'Add sliced avocado', 'Drizzle with olive oil'],
      mealType: 'lunch'
    },
    {
      id: '3',
      name: 'Salmon & Sweet Potato',
      calories: 520,
      protein: 38,
      carbs: 45,
      fat: 22,
      ingredients: ['Salmon fillet', 'Sweet potato', 'Broccoli', 'Lemon', 'Herbs'],
      instructions: ['Bake salmon with herbs', 'Roast sweet potato', 'Steam broccoli', 'Serve with lemon'],
      mealType: 'dinner'
    },
    {
      id: '4',
      name: 'Protein Smoothie',
      calories: 250,
      protein: 28,
      carbs: 20,
      fat: 5,
      ingredients: ['Protein powder', 'Banana', 'Almond milk', 'Spinach', 'Peanut butter'],
      instructions: ['Blend all ingredients', 'Add ice if desired', 'Serve immediately'],
      mealType: 'snack'
    }
  ] : [];

  // Calculate nutrition based on completed meals only
  const completedMealData = todaysMeals.filter(meal => completedMeals.includes(meal.id));
  const totalCalories = completedMealData.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = completedMealData.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = completedMealData.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFat = completedMealData.reduce((sum, meal) => sum + meal.fat, 0);

  const calorieGoal = 2200; // Match dashboard calorie goal
  const proteinGoal = 150;
  const carbGoal = 200;
  const fatGoal = 70;

  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case 'breakfast': return Coffee;
      case 'lunch': return Sun;
      case 'dinner': return Moon;
      case 'snack': return Apple;
      default: return Coffee;
    }
  };

  const getMealTime = (mealType: string) => {
    switch (mealType) {
      case 'breakfast': return '7:00 AM';
      case 'lunch': return '12:30 PM';
      case 'dinner': return '7:00 PM';
      case 'snack': return '3:00 PM';
      default: return '';
    }
  };

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-blue-shine rounded-2xl p-6 text-white shadow-blue-glow">
        <h1 className="text-2xl font-bold mb-2">Meal Planner 🍽️</h1>
        <p className="opacity-90">AI-powered nutrition to hit your calorie goals</p>
      </div>

      {/* Day Selection */}
      <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-2xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-navy-800 mb-4">Select Day</h2>
        <div className="flex flex-wrap gap-2">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDay(index)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex-shrink-0 ${
                selectedDay === index
                  ? 'bg-blue-shine text-white shadow-blue-glow'
                  : 'bg-gradient-to-r from-navy-100 to-navy-200 text-navy-600 hover:shadow-lg'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Nutrition Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-xl p-4 shadow-lg border border-navy-200 hover:shadow-blue-glow transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-navy-600">Calories</span>
            <Target className="w-4 h-4 text-navy-400" />
          </div>
          <div className="text-xl font-bold text-navy-800 mb-1">{hasStartedNutrition ? totalCalories : 0}</div>
          <div className="text-xs text-navy-500 mb-2">of {calorieGoal} goal</div>
          <div className="w-full bg-navy-200 rounded-full h-2">
            <div
              className="bg-blue-shine h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((totalCalories / calorieGoal) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-xl p-4 shadow-lg border border-navy-200 hover:shadow-blue-glow transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-navy-600">Protein</span>
            <TrendingUp className="w-4 h-4 text-navy-400" />
          </div>
          <div className="text-xl font-bold text-navy-800 mb-1">{hasStartedNutrition ? totalProtein : 0}g</div>
          <div className="text-xs text-navy-500 mb-2">of {proteinGoal}g goal</div>
          <div className="w-full bg-navy-200 rounded-full h-2">
            <div
              className="bg-blue-shine h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((totalProtein / proteinGoal) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-xl p-4 shadow-lg border border-navy-200 hover:shadow-blue-glow transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-navy-600">Carbs</span>
            <TrendingUp className="w-4 h-4 text-navy-400" />
          </div>
          <div className="text-xl font-bold text-navy-800 mb-1">{hasStartedNutrition ? totalCarbs : 0}g</div>
          <div className="text-xs text-navy-500 mb-2">of {carbGoal}g goal</div>
          <div className="w-full bg-navy-200 rounded-full h-2">
            <div
              className="bg-blue-shine h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((totalCarbs / carbGoal) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-xl p-4 shadow-lg border border-navy-200 hover:shadow-blue-glow transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-navy-600">Fat</span>
            <TrendingUp className="w-4 h-4 text-navy-400" />
          </div>
          <div className="text-xl font-bold text-navy-800 mb-1">{hasStartedNutrition ? totalFat : 0}g</div>
          <div className="text-xs text-navy-500 mb-2">of {fatGoal}g goal</div>
          <div className="w-full bg-navy-200 rounded-full h-2">
            <div
              className="bg-blue-shine h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((totalFat / fatGoal) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Meal Schedule */}
      <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-navy-800">Today's Meals</h2>
          <button 
            onClick={startNutritionPlan}
            className="flex items-center px-4 py-2 bg-blue-shine text-white rounded-xl hover:shadow-blue-glow transition-all duration-300">
            <Plus className="w-4 h-4 mr-2" />
            {hasStartedNutrition ? 'Add Meal' : 'Start Meal Plan'}
          </button>
        </div>

        {!hasStartedNutrition ? (
          <div className="text-center py-12">
            <div className="bg-gradient-to-br from-navy-100 to-navy-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Apple className="w-10 h-10 text-navy-400" />
            </div>
            <h3 className="text-xl font-semibold text-navy-800 mb-2">Start Your Nutrition Journey</h3>
            <p className="text-navy-600 mb-6 max-w-md mx-auto">
              Get AI-powered meal recommendations tailored to your fitness goals and dietary preferences.
            </p>
            <button 
              onClick={startNutritionPlan}
              className="bg-blue-shine text-white px-8 py-3 rounded-xl font-semibold hover:shadow-blue-glow transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Generate My Meal Plan
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {todaysMeals.map((meal) => {
              const MealIcon = getMealIcon(meal.mealType);
              const isCompleted = completedMeals.includes(meal.id);
              
              return (
                <div
                  key={meal.id}
                  className={`border-2 rounded-xl p-6 transition-all duration-300 hover:shadow-blue-glow ${
                    isCompleted 
                      ? 'border-navy-500 bg-gradient-to-br from-navy-100 to-navy-200' 
                      : 'border-navy-200 hover:border-navy-300 bg-gradient-to-br from-white to-navy-50'
                  }`}
                >
                  {/* Meal Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`p-3 rounded-xl shadow-lg flex-shrink-0 ${
                        isCompleted ? 'bg-blue-shine text-white' : 'bg-gradient-to-br from-navy-100 to-navy-200 text-navy-600'
                      }`}>
                        <MealIcon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-navy-800 truncate">{meal.name}</h3>
                          <div className="flex items-center text-sm text-navy-500 mt-1 sm:mt-0">
                            <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
                            <span>{getMealTime(meal.mealType)}</span>
                          </div>
                        </div>
                        
                        {/* Nutrition Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                          <div className="text-center bg-gradient-to-r from-navy-100 to-navy-200 rounded-lg p-2">
                            <div className="text-lg font-bold text-navy-600">{meal.calories}</div>
                            <div className="text-xs text-navy-500">Calories</div>
                          </div>
                          <div className="text-center bg-gradient-to-r from-navy-100 to-navy-200 rounded-lg p-2">
                            <div className="text-lg font-bold text-navy-600">{meal.protein}g</div>
                            <div className="text-xs text-navy-500">Protein</div>
                          </div>
                          <div className="text-center bg-gradient-to-r from-navy-100 to-navy-200 rounded-lg p-2">
                            <div className="text-lg font-bold text-navy-600">{meal.carbs}g</div>
                            <div className="text-xs text-navy-500">Carbs</div>
                          </div>
                          <div className="text-center bg-gradient-to-r from-navy-100 to-navy-200 rounded-lg p-2">
                            <div className="text-lg font-bold text-navy-600">{meal.fat}g</div>
                            <div className="text-xs text-navy-500">Fat</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Complete Button */}
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => toggleMealCompletion(meal.id)}
                        className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                          isCompleted
                            ? 'bg-blue-shine text-white hover:shadow-blue-glow'
                            : 'bg-gradient-to-r from-navy-100 to-navy-200 text-navy-600 hover:shadow-lg'
                        }`}
                      >
                        <Check className="w-4 h-4 mr-2" />
                        {isCompleted ? 'Completed' : 'Mark Done'}
                      </button>
                    </div>
                  </div>

                  {/* Meal Details */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Ingredients */}
                    <div>
                      <h4 className="font-medium text-navy-800 mb-2">Ingredients</h4>
                      <div className="flex flex-wrap gap-2">
                        {meal.ingredients.map((ingredient, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gradient-to-r from-navy-100 to-navy-200 text-navy-700 rounded-full text-sm shadow-sm"
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Instructions */}
                    <div>
                      <h4 className="font-medium text-navy-800 mb-2">Instructions</h4>
                      <ol className="list-decimal list-inside space-y-1">
                        {meal.instructions.map((instruction, index) => (
                          <li key={index} className="text-sm text-navy-600 leading-relaxed">{instruction}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* AI Recommendations */}
      <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-navy-800 mb-4">AI Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-navy-100 to-navy-200 border border-navy-200 rounded-xl p-4 shadow-lg">
            <h3 className="font-semibold text-navy-800 mb-2">💡 Optimization Tip</h3>
            <p className="text-navy-700 text-sm leading-relaxed">
              Consider adding more fiber-rich vegetables to your lunch to improve satiety and digestive health.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-navy-100 to-navy-200 border border-navy-200 rounded-xl p-4 shadow-lg">
            <h3 className="font-semibold text-navy-800 mb-2">🎯 Goal Progress</h3>
            <p className="text-navy-700 text-sm leading-relaxed">
              You're on track to meet your protein goals! Your current intake supports muscle recovery and growth.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-navy-100 to-navy-200 border border-navy-200 rounded-xl p-4 shadow-lg">
            <h3 className="font-semibold text-navy-800 mb-2">⚡ Energy Timing</h3>
            <p className="text-navy-700 text-sm leading-relaxed">
              Try eating your largest carb portion 2-3 hours before your workout for optimal energy levels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;