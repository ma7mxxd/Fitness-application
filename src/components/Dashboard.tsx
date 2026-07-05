import React from 'react';
import { Calendar, Clock, Target, TrendingUp, Award, Flame } from 'lucide-react';
import { User, Exercise } from '../types';
import { useMealData } from '../hooks/useMealData';

interface RecoveryData {
  overallRecovery: number;
  readyToTrain: number;
  needRecovery: number;
}

interface DashboardProps {
  user: User;
  scheduledExercises: Exercise[];
  onStartWorkout: (workoutId: string) => void;
  onNavigate: (view: string) => void;
  recoveryData: RecoveryData;
}

const Dashboard: React.FC<DashboardProps> = ({ user, scheduledExercises, onStartWorkout, onNavigate, recoveryData }) => {
  const { getCompletedMealsCount, hasStartedNutrition, completedMeals } = useMealData();
  
  // For now, show all scheduled exercises as today's exercises
  const todaysExercises = scheduledExercises;

  const completedThisWeek = 0; // No workouts yet
  const totalCaloriesBurned = 0;
  const completedMealsToday = getCompletedMealsCount();
  
  // Calculate actual calories consumed from completed meals
  const todaysMeals = hasStartedNutrition ? [
    { id: '1', calories: 420 },
    { id: '2', calories: 380 },
    { id: '3', calories: 520 },
    { id: '4', calories: 250 }
  ] : [];
  
  const actualCaloriesConsumed = todaysMeals
    .filter(meal => completedMeals.includes(meal.id))
    .reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-blue-shine rounded-2xl p-6 text-white shadow-blue-glow">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
        <p className="opacity-90">Ready to crush your fitness goals today?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-xl p-6 shadow-lg border border-navy-200 hover:shadow-blue-glow transition-all duration-300">
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-navy-400 to-navy-500 p-3 rounded-xl shadow-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-navy-800">{completedThisWeek}</p>
              <p className="text-sm text-navy-600">Workouts This Week</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-xl p-6 shadow-lg border border-navy-200 hover:shadow-blue-glow transition-all duration-300">
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-navy-400 to-navy-500 p-3 rounded-xl shadow-lg">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-navy-800">{totalCaloriesBurned}</p>
              <p className="text-sm text-navy-600">Calories Burned</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-xl p-6 shadow-lg border border-navy-200 hover:shadow-blue-glow transition-all duration-300">
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-navy-400 to-navy-500 p-3 rounded-xl shadow-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-navy-800">{actualCaloriesConsumed}</p>
              <p className="text-sm text-navy-600">Calories Consumed</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-xl p-6 shadow-lg border border-navy-200 hover:shadow-blue-glow transition-all duration-300">
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-navy-400 to-navy-500 p-3 rounded-xl shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-navy-800">{recoveryData.overallRecovery}%</p>
              <p className="text-sm text-navy-600">Overall Recovery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Workouts */}
      <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-2xl shadow-lg border border-navy-200">
        <div className="flex items-center justify-between mb-6">
          <div className="p-6 pb-0">
            <h2 className="text-xl font-bold text-navy-800">Scheduled Exercises</h2>
          </div>
          <div className="p-6 pb-0">
            <Calendar className="w-5 h-5 text-navy-400" />
          </div>
        </div>

        {todaysExercises.length > 0 ? (
          <div className="px-6 pb-6 space-y-4">
            {todaysExercises.map((exercise) => (
              <div key={exercise.id} className="border border-navy-300 rounded-xl p-6 hover:shadow-blue-glow transition-all duration-300 bg-gradient-to-r from-white to-navy-50">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-navy-800 mb-1">{exercise.name}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-navy-600 mb-3">
                      <div className="flex items-center">
                        <Target className="w-4 h-4 mr-1" />
                        {exercise.sets} sets × {exercise.reps} reps
                      </div>
                      <div className="flex items-center">
                        <Target className="w-4 h-4 mr-1" />
                        <span className="truncate">{exercise.targetMuscles.slice(0, 2).join(', ')}{exercise.targetMuscles.length > 2 ? ` +${exercise.targetMuscles.length - 2}` : ''}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onStartWorkout(exercise.id)}
                    className="bg-blue-shine text-white px-6 py-2 rounded-xl font-semibold hover:shadow-blue-glow transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Start Exercise
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 pb-6 text-center py-8">
            <div className="bg-gradient-to-br from-navy-100 to-navy-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-navy-400" />
            </div>
            <p className="text-navy-600">No exercises scheduled</p>
            <p className="text-sm text-navy-500 mt-1">Add exercises from the workout library to get started</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-2xl shadow-lg p-6 border border-navy-200">
        <h2 className="text-xl font-bold text-navy-800 mb-4">Quick Actions</h2>
        <p className="text-navy-600 mb-6">Jump to different sections of your fitness journey</p>
        
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button 
          onClick={() => onNavigate('meals')}
          className="bg-gradient-to-br from-navy-500 to-navy-600 text-white p-6 rounded-xl text-left hover:shadow-blue-glow transform hover:-translate-y-0.5 transition-all duration-300"
        >
          <h3 className="font-semibold mb-2">View Meal Plan</h3>
          <p className="text-sm opacity-90">{completedMealsToday > 0 ? `${completedMealsToday} meals completed today` : 'Check today\'s nutrition goals'}</p>
        </button>

        <button 
          onClick={() => onNavigate('recovery')}
          className="bg-gradient-to-br from-navy-600 to-navy-700 text-white p-6 rounded-xl text-left hover:shadow-blue-glow transform hover:-translate-y-0.5 transition-all duration-300"
        >
          <h3 className="font-semibold mb-2">Recovery Status</h3>
          <p className="text-sm opacity-90">{recoveryData.readyToTrain} muscles ready • {recoveryData.needRecovery} need recovery</p>
        </button>

        <button 
          onClick={() => onNavigate('ai')}
          className="bg-gradient-to-br from-navy-700 to-navy-800 text-white p-6 rounded-xl text-left hover:shadow-blue-glow transform hover:-translate-y-0.5 transition-all duration-300"
        >
          <h3 className="font-semibold mb-2">AI Coaching</h3>
          <p className="text-sm opacity-90">Get personalized advice</p>
        </button>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;