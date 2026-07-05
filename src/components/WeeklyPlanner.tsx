import React, { useState } from 'react';
import { Calendar, Edit3, Plus, Trash2, Clock, Target, Dumbbell, RotateCcw } from 'lucide-react';
import { Exercise } from '../types';

interface ScheduledExercise extends Exercise {
  scheduledDays: string[];
  timesPerWeek: number;
  isCustomized: boolean;
}

interface WeeklyPlannerProps {
  workoutSchedule: { [day: string]: ScheduledExercise[] };
  getScheduledExercisesForDay: (day: string) => ScheduledExercise[];
  onStartWorkout: (workoutId: string) => void;
  onEditWorkout?: (workoutId: string) => void;
  onDeleteWorkout?: (workoutId: string) => void;
  onAddWorkout?: (day: string) => void;
}

const WeeklyPlanner: React.FC<WeeklyPlannerProps> = ({ 
  workoutSchedule,
  getScheduledExercisesForDay,
  onStartWorkout,
  onEditWorkout,
  onDeleteWorkout,
  onAddWorkout
}) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);

  const daysOfWeek = [
    { key: 'sunday', name: 'Sunday', short: 'Sun' },
    { key: 'monday', name: 'Monday', short: 'Mon' },
    { key: 'tuesday', name: 'Tuesday', short: 'Tue' },
    { key: 'wednesday', name: 'Wednesday', short: 'Wed' },
    { key: 'thursday', name: 'Thursday', short: 'Thu' },
    { key: 'friday', name: 'Friday', short: 'Fri' },
    { key: 'saturday', name: 'Saturday', short: 'Sat' }
  ];

  const getAllScheduledExercises = () => {
    const allExercises: ScheduledExercise[] = [];
    const seen = new Set<string>();
    
    Object.values(workoutSchedule).forEach(dayExercises => {
      dayExercises.forEach(exercise => {
        if (!seen.has(exercise.id)) {
          seen.add(exercise.id);
          allExercises.push(exercise);
        }
      });
    });
    
    return allExercises;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-navy-800 flex items-center">
              <Calendar className="w-8 h-8 mr-3" />
              Weekly Planner
            </h2>
            <p className="text-navy-600">Plan and track your weekly workout schedule</p>
          </div>
          
          <button
            onClick={() => setEditMode(!editMode)}
            className={`flex items-center px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
              editMode
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-blue-shine text-white hover:shadow-blue-glow'
            }`}
          >
            <Edit3 className="w-4 h-4 mr-2" />
            {editMode ? 'Exit Edit' : 'Edit Mode'}
          </button>
        </div>

      {/* Scheduled Exercises Overview */}
      <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-navy-800">Scheduled Exercises</h2>
            <p className="text-navy-600">Exercises you've added to your schedule</p>
          </div>
        </div>

        {getAllScheduledExercises().length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gradient-to-br from-navy-100 to-navy-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Dumbbell className="w-10 h-10 text-navy-400" />
            </div>
            <h3 className="text-xl font-semibold text-navy-800 mb-2">No Exercises Scheduled</h3>
            <p className="text-navy-600 mb-6">Add exercises from the workout library to build your routine</p>
          </div>
        ) : (
          <div className="space-y-4">
            {getAllScheduledExercises().map((exercise) => (
              <div
                key={exercise.id}
                className="border border-navy-200 rounded-xl p-6 hover:shadow-blue-glow transition-all duration-300 bg-gradient-to-r from-white to-navy-50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-navy-800">{exercise.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-navy-600 mt-1">
                      <div className="flex items-center">
                        <Target className="w-4 h-4 mr-1" />
                        {exercise.sets} sets × {exercise.reps} reps
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {exercise.timesPerWeek}x/week
                      </div>
                      <div className="flex items-center">
                        <Target className="w-4 h-4 mr-1" />
                        {exercise.targetMuscles.slice(0, 2).join(', ')}{exercise.targetMuscles.length > 2 ? ` +${exercise.targetMuscles.length - 2}` : ''}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onStartWorkout(exercise.id)}
                      className="bg-blue-shine text-white px-6 py-2 rounded-xl font-semibold hover:shadow-blue-glow transform hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Start Exercise
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

        {/* Weekly Calendar */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {daysOfWeek.map((day) => {
            const dayExercises = getScheduledExercisesForDay(day.key);
            const isRestDay = dayExercises.length === 0;
            
            return (
              <div
                key={day.key}
                className={`border-2 rounded-xl p-4 transition-all duration-300 hover:shadow-blue-glow cursor-pointer ${
                  selectedDay === day.key
                    ? 'border-navy-500 bg-gradient-to-br from-navy-100 to-navy-200 shadow-blue-glow'
                    : 'border-navy-200 hover:border-navy-300 bg-gradient-to-br from-white to-navy-50'
                }`}
                onClick={() => setSelectedDay(selectedDay === day.key ? null : day.key)}
              >
                <div className="text-center mb-3">
                  <h3 className="font-semibold text-navy-800">{day.name}</h3>
                  <p className="text-xs text-navy-500">{new Date().toLocaleDateString()}</p>
                </div>

                {isRestDay ? (
                  <div className="text-center py-4">
                    <RotateCcw className="w-8 h-8 text-navy-400 mx-auto mb-2" />
                    <p className="text-sm text-navy-500">Rest Day</p>
                    {editMode && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddWorkout?.(day.key);
                        }}
                        className="mt-2 flex items-center justify-center w-full py-2 bg-gradient-to-r from-navy-100 to-navy-200 text-navy-600 rounded-lg hover:shadow-lg transition-all duration-300"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Workout
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {dayExercises.map((exercise) => (
                      <div
                        key={exercise.id}
                        className="bg-gradient-to-r from-navy-50 to-navy-100 border border-navy-200 rounded-lg p-3 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-navy-800 text-sm">{exercise.name}</h4>
                          {editMode && (
                            <div className="flex space-x-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onEditWorkout?.(exercise.id);
                                }}
                                className="p-1 text-navy-500 hover:text-navy-700 hover:bg-navy-200 rounded transition-all duration-300"
                              >
                                <Edit3 className="w-3 h-3" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDeleteWorkout?.(exercise.id);
                                }}
                                className="p-1 text-navy-500 hover:text-red-600 hover:bg-red-100 rounded transition-all duration-300"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-navy-600 mb-2">
                          <span className="flex items-center">
                            <Target className="w-3 h-3 mr-1" />
                            {exercise.sets}×{exercise.reps}
                          </span>
                          <span className="px-2 py-1 bg-gradient-to-r from-navy-100 to-navy-200 text-navy-600 rounded-full text-xs">
                            {exercise.timesPerWeek}x/week
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-2">
                          {exercise.targetMuscles.slice(0, 2).map((muscle, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gradient-to-r from-navy-100 to-navy-200 text-navy-600 rounded-full text-xs"
                            >
                              {muscle}
                            </span>
                          ))}
                          {exercise.targetMuscles.length > 2 && (
                            <span className="px-2 py-1 bg-gradient-to-r from-navy-100 to-navy-200 text-navy-600 rounded-full text-xs">
                              +{exercise.targetMuscles.length - 2}
                            </span>
                          )}
                        </div>

                        {!editMode && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onStartWorkout(exercise.id);
                            }}
                            className="w-full bg-blue-shine text-white py-1.5 rounded-lg text-xs font-semibold hover:shadow-blue-glow transform hover:-translate-y-0.5 transition-all duration-300"
                          >
                            Start Exercise
                          </button>
                        )}
                      </div>
                    ))}
                    
                    {editMode && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddWorkout?.(day.key);
                        }}
                        className="w-full flex items-center justify-center py-2 bg-gradient-to-r from-navy-100 to-navy-200 text-navy-600 rounded-lg hover:shadow-lg transition-all duration-300"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Workout
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Day Details */}
      {selectedDay && getScheduledExercisesForDay(selectedDay).length > 0 && (
        <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-navy-800 mb-4">
            {daysOfWeek.find(d => d.key === selectedDay)?.name} Exercises
          </h3>
          
          <div className="space-y-4">
            {getScheduledExercisesForDay(selectedDay).map((exercise) => (
              <div
                key={exercise.id}
                className="border border-navy-200 rounded-xl p-6 hover:shadow-blue-glow transition-all duration-300 bg-gradient-to-r from-white to-navy-50"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-navy-800">{exercise.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-navy-600 mt-1">
                      <div className="flex items-center">
                        <Target className="w-4 h-4 mr-1" />
                        {exercise.sets} sets × {exercise.reps} reps
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {exercise.timesPerWeek}x per week
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {editMode && (
                      <>
                        <button
                          onClick={() => onEditWorkout?.(exercise.id)}
                          className="flex items-center px-3 py-2 bg-gradient-to-r from-navy-100 to-navy-200 text-navy-600 rounded-lg hover:shadow-lg transition-all duration-300"
                        >
                          <Edit3 className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => onDeleteWorkout?.(exercise.id)}
                          className="flex items-center px-3 py-2 bg-gradient-to-r from-red-100 to-red-200 text-red-600 rounded-lg hover:shadow-lg transition-all duration-300"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </>
                    )}
                    {!editMode && (
                      <button
                        onClick={() => onStartWorkout(exercise.id)}
                        className="bg-blue-shine text-white px-6 py-2 rounded-xl font-semibold hover:shadow-blue-glow transform hover:-translate-y-0.5 transition-all duration-300"
                      >
                        Start Exercise
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-r from-navy-100 to-navy-200 p-3 rounded-lg">
                    <h5 className="font-medium text-navy-800 mb-2">Target Muscles</h5>
                    <div className="flex flex-wrap gap-1">
                      {exercise.targetMuscles.map((muscle, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gradient-to-r from-navy-200 to-navy-300 text-navy-700 rounded-full text-xs"
                        >
                          {muscle}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-navy-100 to-navy-200 p-3 rounded-lg">
                    <h5 className="font-medium text-navy-800 mb-2">Volume</h5>
                    <p className="text-lg font-bold text-navy-600">{exercise.sets} × {exercise.reps}</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-navy-100 to-navy-200 p-3 rounded-lg">
                    <h5 className="font-medium text-navy-800 mb-2">Frequency</h5>
                    <p className="text-lg font-bold text-navy-600">{exercise.timesPerWeek}x/week</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Recommendations */}
      <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-navy-800 mb-4">AI Weekly Recommendations</h3>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-navy-100 to-navy-200 border border-navy-200 rounded-xl p-4 shadow-lg">
            <h4 className="font-semibold text-navy-800 mb-2">💡 Balance Optimization</h4>
            <p className="text-navy-700 text-sm">
              Your exercise schedule shows good muscle group distribution. The AI has automatically spaced exercises for optimal recovery.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-navy-100 to-navy-200 border border-navy-200 rounded-xl p-4 shadow-lg">
            <h4 className="font-semibold text-navy-800 mb-2">🎯 Recovery Focus</h4>
            <p className="text-navy-700 text-sm">
              Large muscle groups are scheduled with 48-72 hour recovery periods, while smaller muscles can be trained more frequently.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-navy-100 to-navy-200 border border-navy-200 rounded-xl p-4 shadow-lg">
            <h4 className="font-semibold text-navy-800 mb-2">⚡ Intensity Distribution</h4>
            <p className="text-navy-700 text-sm">
              Exercise frequency is automatically optimized based on muscle group size and recovery requirements for maximum progress.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyPlanner;