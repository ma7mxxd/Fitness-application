import React, { useState } from 'react';
import AuthScreen from './components/AuthScreen';
import OnboardingQuiz from './components/OnboardingQuiz';
import Dashboard from './components/Dashboard';
import WorkoutSession from './components/WorkoutSession';
import RecoveryTracker from './components/RecoveryTracker';
import MealPlanner from './components/MealPlanner';
import AIAssistant from './components/AIAssistant';
import Navigation from './components/Navigation';
import WeeklyPlanner from './components/WeeklyPlanner';
import WorkoutLibrary from './components/WorkoutLibrary';
import { useWorkoutData } from './hooks/useWorkoutData';
import { useRecoveryData } from './hooks/useRecoveryData';
import { useAuth } from './hooks/useAuth';
import { User, Exercise } from './types';
import { getExerciseById } from './data/workoutLibrary';

function App() {
  const {
    isLoading: authLoading,
    isAuthenticated,
    user: authUser,
    signIn,
    signUp,
    signOut,
    completeOnboarding,
    getUserProfile
  } = useAuth();

  const [currentView, setCurrentView] = useState('dashboard');
  const [activeWorkout, setActiveWorkout] = useState<string | null>(null);
  const [workoutSubView, setWorkoutSubView] = useState<'planner' | 'library'>('planner');

  const {
    workoutSchedule,
    addExerciseToSchedule,
    removeExerciseFromSchedule,
    updateExerciseSchedule,
    getScheduledExercisesForDay,
    getAllScheduledExercises,
    isExerciseScheduled,
    getTotalScheduledExercises
  } = useWorkoutData();

  const { muscleGroups, recordWorkout, getOverallRecovery, getReadyToTrainCount, getNeedRecoveryCount } = useRecoveryData();

  // Find the exercise data for the active workout
  const activeExercise = activeWorkout
    ? (() => {
        const scheduled = getAllScheduledExercises().find(e => e.id === activeWorkout);
        if (scheduled) return scheduled;
        const fromLibrary = getExerciseById(activeWorkout);
        if (fromLibrary) {
          return {
            id: fromLibrary.id,
            name: fromLibrary.name,
            sets: fromLibrary.sets,
            reps: fromLibrary.reps,
            weight: fromLibrary.weight,
            duration: fromLibrary.duration,
            restTime: fromLibrary.restTime,
            targetMuscles: fromLibrary.targetMuscles,
            instructions: fromLibrary.instructions,
            image: fromLibrary.image,
          } as Exercise;
        }
        return null;
      })()
    : null;

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-blue-shine p-4 rounded-2xl inline-block mb-4 shadow-blue-glow">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-white text-lg">Loading FitAI...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !authUser) {
    return <AuthScreen onLogin={signIn} onSignUp={signUp} />;
  }

  if (authUser.needsOnboarding) {
    const handleQuizComplete = (quizData: any) => {
      const newUser: User = {
        id: authUser.id,
        name: quizData.name,
        age: quizData.age,
        weight: quizData.weight,
        height: quizData.height,
        fitnessLevel: quizData.fitnessLevel,
        goals: quizData.goals,
        preferences: quizData.preferences,
        calorieGoal: 2200,
        workoutFrequency: quizData.workoutFrequency
      };
      completeOnboarding(newUser);
    };
    return <OnboardingQuiz onComplete={handleQuizComplete} />;
  }

  const userProfile = getUserProfile();
  if (!userProfile) {
    const handleQuizComplete = (quizData: any) => {
      const newUser: User = {
        id: authUser.id,
        name: quizData.name,
        age: quizData.age,
        weight: quizData.weight,
        height: quizData.height,
        fitnessLevel: quizData.fitnessLevel,
        goals: quizData.goals,
        preferences: quizData.preferences,
        calorieGoal: 2200,
        workoutFrequency: quizData.workoutFrequency
      };
      completeOnboarding(newUser);
    };
    return <OnboardingQuiz onComplete={handleQuizComplete} />;
  }

  const handleStartWorkout = (workoutId: string) => {
    setActiveWorkout(workoutId);
  };

  const handleWorkoutComplete = (exerciseId: string, targetMuscles: string[]) => {
    recordWorkout(exerciseId, targetMuscles);
    setActiveWorkout(null);
  };

  const handleExitWorkout = () => {
    setActiveWorkout(null);
  };

  // Show workout session if one is active
  if (activeWorkout && activeExercise) {
    return (
      <WorkoutSession
        exercise={activeExercise}
        onComplete={handleWorkoutComplete}
        onExit={handleExitWorkout}
      />
    );
  }

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  const handleEditWorkout = (workoutId: string) => {
    console.log('Edit workout:', workoutId);
  };

  const handleDeleteWorkout = (workoutId: string) => {
    console.log('Delete workout:', workoutId);
  };

  const handleAddWorkout = (day: string) => {
    console.log('Add workout for:', day);
  };

  const handleAddExerciseToSchedule = (exercise: Exercise) => {
    addExerciseToSchedule(exercise);
  };

  const handleRemoveExerciseFromSchedule = (exerciseId: string) => {
    removeExerciseFromSchedule(exerciseId);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard
            user={userProfile}
            scheduledExercises={getAllScheduledExercises()}
            onStartWorkout={handleStartWorkout}
            onNavigate={handleNavigate}
            recoveryData={{
              overallRecovery: getOverallRecovery(),
              readyToTrain: getReadyToTrainCount(),
              needRecovery: getNeedRecoveryCount()
            }}
          />
        );
      case 'workouts':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-2xl shadow-lg p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-navy-800 mb-2">Workouts</h1>
                <p className="text-navy-600">Plan your training and access your workout library</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setWorkoutSubView('planner')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    workoutSubView === 'planner'
                      ? 'bg-blue-shine text-white shadow-blue-glow'
                      : 'bg-gradient-to-r from-navy-100 to-navy-200 text-navy-600 hover:shadow-lg'
                  }`}
                >
                  Weekly Planner
                </button>
                <button
                  onClick={() => setWorkoutSubView('library')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    workoutSubView === 'library'
                      ? 'bg-blue-shine text-white shadow-blue-glow'
                      : 'bg-gradient-to-r from-navy-100 to-navy-200 text-navy-600 hover:shadow-lg'
                  }`}
                >
                  Workout Library
                </button>
              </div>
            </div>

            {workoutSubView === 'planner' ? (
              <WeeklyPlanner
                workoutSchedule={workoutSchedule}
                getScheduledExercisesForDay={getScheduledExercisesForDay}
                onStartWorkout={handleStartWorkout}
                onEditWorkout={handleEditWorkout}
                onDeleteWorkout={handleDeleteWorkout}
                onAddWorkout={handleAddWorkout}
              />
            ) : (
              <WorkoutLibrary
                onStartExercise={(exercise) => {
                  handleStartWorkout(exercise.id);
                }}
                onAddToSchedule={handleAddExerciseToSchedule}
                onRemoveFromSchedule={handleRemoveExerciseFromSchedule}
                scheduledExercises={getAllScheduledExercises()}
                isExerciseScheduled={isExerciseScheduled}
                onUpdateSchedule={updateExerciseSchedule}
              />
            )}
          </div>
        );
      case 'recovery':
        return <RecoveryTracker muscleGroups={muscleGroups} />;
      case 'meals':
        return <MealPlanner />;
      case 'ai':
        return <AIAssistant />;
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="bg-blue-shine rounded-2xl p-6 text-white shadow-blue-glow">
              <h1 className="text-2xl font-bold mb-2">Profile Settings</h1>
              <p className="opacity-90">Manage your fitness profile and preferences</p>
            </div>
            <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-xl p-6 shadow-lg border border-navy-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-navy-800">Personal Information</h2>
                <button
                  onClick={signOut}
                  className="bg-gradient-to-r from-red-100 to-red-200 text-red-600 px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Sign Out
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy-600 mb-1">Name</label>
                  <p className="text-lg font-semibold text-navy-800">{userProfile.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-600 mb-1">Email</label>
                  <p className="text-lg font-semibold text-navy-800">{authUser.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-600 mb-1">Age</label>
                  <p className="text-lg font-semibold text-navy-800">{userProfile.age} years</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-600 mb-1">Weight</label>
                  <p className="text-lg font-semibold text-navy-800">{userProfile.weight} kg</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-600 mb-1">Height</label>
                  <p className="text-lg font-semibold text-navy-800">{userProfile.height} cm</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-600 mb-1">Fitness Level</label>
                  <p className="text-lg font-semibold text-navy-800 capitalize">{userProfile.fitnessLevel}</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 flex flex-col md:flex-row">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;
