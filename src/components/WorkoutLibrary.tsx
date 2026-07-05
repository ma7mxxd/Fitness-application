import React, { useState } from 'react';
import { Search, Filter, Clock, Target, Dumbbell, Star, Play, Plus, Minus, Calendar, Settings } from 'lucide-react';
import { workoutLibrary, ExerciseDetail, WorkoutCategory } from '../data/workoutLibrary';
import { Exercise } from '../types';

interface ScheduledExercise extends Exercise {
  scheduledDays: string[];
  timesPerWeek: number;
  isCustomized: boolean;
}

interface WorkoutLibraryProps {
  onStartExercise?: (exercise: ExerciseDetail) => void;
  onAddToSchedule?: (exercise: Exercise) => void;
  onRemoveFromSchedule?: (exerciseId: string) => void;
  scheduledExercises?: ScheduledExercise[];
  isExerciseScheduled?: (exerciseId: string) => boolean;
  onUpdateSchedule?: (exerciseId: string, updates: any) => void;
}

const WorkoutLibrary: React.FC<WorkoutLibraryProps> = ({ 
  onStartExercise, 
  onAddToSchedule, 
  onRemoveFromSchedule,
  scheduledExercises = [],
  isExerciseScheduled,
  onUpdateSchedule
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [editingExercise, setEditingExercise] = useState<string | null>(null);

  
  // Add "My Workouts" category if user has scheduled exercises
  const allCategories = scheduledExercises.length > 0 
    ? [
        {
          id: 'my-workouts',
          name: 'My Workouts',
          icon: '⭐',
          description: 'Your scheduled exercises',
          exercises: []
        },
        ...workoutLibrary
      ]
    : workoutLibrary;

  const filteredCategories = allCategories.filter(category => {
    if (selectedCategory !== 'all' && category.id !== selectedCategory) return false;
    
    const categoryExercises = category.exercises.filter(exercise => {
      const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           exercise.targetMuscles.some(muscle => muscle.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDifficulty = difficultyFilter === 'all' || exercise.difficulty === difficultyFilter;
      return matchesSearch && matchesDifficulty;
    });
    
    return categoryExercises.length > 0;
  }).map(category => ({
    ...category,
    exercises: category.exercises.filter(exercise => {
      const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           exercise.targetMuscles.some(muscle => muscle.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDifficulty = difficultyFilter === 'all' || exercise.difficulty === difficultyFilter;
      return matchesSearch && matchesDifficulty;
    })
  }));

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-gradient-to-r from-green-100 to-green-200 text-green-700';
      case 'intermediate': return 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700';
      case 'advanced': return 'bg-gradient-to-r from-red-100 to-red-200 text-red-700';
      default: return 'bg-gradient-to-r from-navy-100 to-navy-200 text-navy-600';
    }
  };

  const getDayName = (day: string) => {
    const days = {
      monday: 'Mon', tuesday: 'Tue', wednesday: 'Wed', thursday: 'Thu',
      friday: 'Fri', saturday: 'Sat', sunday: 'Sun'
    };
    return days[day as keyof typeof days] || day;
  };

  const handleAddToSchedule = (exercise: ExerciseDetail) => {
    if (onAddToSchedule) {
      const exerciseToAdd: Exercise = {
        id: exercise.id,
        name: exercise.name,
        sets: exercise.sets,
        reps: exercise.reps,
        weight: exercise.weight,
        duration: exercise.duration,
        restTime: exercise.restTime,
        targetMuscles: exercise.targetMuscles,
        instructions: exercise.instructions
      };
      onAddToSchedule(exerciseToAdd);
    }
  };

  const handleRemoveFromSchedule = (exerciseId: string) => {
    if (onRemoveFromSchedule) {
      onRemoveFromSchedule(exerciseId);
    }
  };

  const handleUpdateSchedule = (exerciseId: string, updates: any) => {
    if (onUpdateSchedule) {
      onUpdateSchedule(exerciseId, updates);
      setEditingExercise(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-blue-shine rounded-2xl p-6 text-white shadow-blue-glow">
        <h1 className="text-2xl font-bold mb-2">Exercise Library 📚</h1>
        <p className="opacity-90">Discover exercises organized by muscle groups</p>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-navy-400" />
            <input
              type="text"
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-navy-200 focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all shadow-lg"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 rounded-xl border border-navy-200 focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all shadow-lg"
          >
            <option value="all">All Categories</option>
            {workoutLibrary.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-navy-200 focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all shadow-lg"
          >
            <option value="all">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          {/* Create Workout Button */}
          <div className="flex items-center">
            <span className="text-sm text-navy-600">
              {scheduledExercises.length} exercise{scheduledExercises.length !== 1 ? 's' : ''} scheduled
            </span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-2xl shadow-lg p-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-blue-shine text-white shadow-blue-glow'
                : 'bg-gradient-to-r from-navy-100 to-navy-200 text-navy-600 hover:shadow-lg'
            }`}
          >
            All Categories
          </button>
          {allCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center ${
                selectedCategory === category.id
                  ? 'bg-blue-shine text-white shadow-blue-glow'
                  : 'bg-gradient-to-r from-navy-100 to-navy-200 text-navy-600 hover:shadow-lg'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Exercise Categories */}
      <div className="space-y-8">
        {filteredCategories.map(category => (
          <div key={category.id} className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <span className="text-3xl mr-4">{category.icon}</span>
              <div>
                <h2 className="text-2xl font-bold text-navy-800">{category.name}</h2>
                <p className="text-navy-600">{category.description}</p>
              </div>
            </div>

            {category.id === 'my-workouts' ? (
              // Special rendering for My Workouts category
              scheduledExercises.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-gradient-to-br from-navy-100 to-navy-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Star className="w-10 h-10 text-navy-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-navy-800 mb-2">No Scheduled Exercises</h3>
                  <p className="text-navy-600">Add exercises from other categories to build your routine</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {scheduledExercises.map(exercise => {
                    const isEditing = editingExercise === exercise.id;
                    
                    return (
                      <div
                        key={exercise.id}
                        className="border-2 border-navy-500 bg-gradient-to-br from-navy-100 to-navy-200 rounded-xl p-6 shadow-blue-glow"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-navy-800 mb-2">{exercise.name}</h3>
                            
                            {/* Target Muscles */}
                            <div className="mb-3">
                              <div className="flex flex-wrap gap-1">
                                {exercise.targetMuscles.map((muscle, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-blue-shine text-white rounded-full text-xs font-medium"
                                  >
                                    {muscle}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            {/* Schedule Info */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div className="bg-gradient-to-r from-navy-200 to-navy-300 p-3 rounded-lg">
                                <div className="flex items-center mb-1">
                                  <Calendar className="w-4 h-4 text-navy-600 mr-1" />
                                  <span className="text-sm font-medium text-navy-600">Schedule</span>
                                </div>
                                <div className="text-sm text-navy-700">
                                  {exercise.timesPerWeek}x/week on {exercise.scheduledDays.map(getDayName).join(', ')}
                                </div>
                              </div>
                              
                              <div className="bg-gradient-to-r from-navy-200 to-navy-300 p-3 rounded-lg">
                                <div className="flex items-center mb-1">
                                  <Target className="w-4 h-4 text-navy-600 mr-1" />
                                  <span className="text-sm font-medium text-navy-600">Volume</span>
                                </div>
                                <div className="text-sm text-navy-700">
                                  {exercise.sets} sets × {exercise.reps} reps
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2 ml-4">
                            <button
                              onClick={() => setEditingExercise(isEditing ? null : exercise.id)}
                              className="flex items-center px-3 py-2 bg-gradient-to-r from-navy-100 to-navy-200 text-navy-700 rounded-lg hover:shadow-lg transition-all duration-300"
                            >
                              <Settings className="w-4 h-4 mr-1" />
                              {isEditing ? 'Cancel' : 'Edit'}
                            </button>
                            <button
                              onClick={() => handleRemoveFromSchedule(exercise.id)}
                              className="flex items-center px-3 py-2 bg-gradient-to-r from-red-100 to-red-200 text-red-700 rounded-lg hover:shadow-lg transition-all duration-300"
                            >
                              <Minus className="w-4 h-4 mr-1" />
                              Remove
                            </button>
                          </div>
                        </div>
                        
                        {/* Edit Form */}
                        {isEditing && (
                          <div className="border-t border-navy-300 pt-4 mt-4">
                            <h4 className="font-semibold text-navy-800 mb-3">Customize Schedule</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-navy-700 mb-2">Sets</label>
                                <input
                                  type="number"
                                  defaultValue={exercise.sets}
                                  className="w-full px-3 py-2 border border-navy-300 rounded-lg focus:ring-2 focus:ring-navy-500"
                                  onChange={(e) => {
                                    const newSets = parseInt(e.target.value);
                                    handleUpdateSchedule(exercise.id, { sets: newSets });
                                  }}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-navy-700 mb-2">Reps</label>
                                <input
                                  type="number"
                                  defaultValue={exercise.reps}
                                  className="w-full px-3 py-2 border border-navy-300 rounded-lg focus:ring-2 focus:ring-navy-500"
                                  onChange={(e) => {
                                    const newReps = parseInt(e.target.value);
                                    handleUpdateSchedule(exercise.id, { reps: newReps });
                                  }}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-navy-700 mb-2">Times per Week</label>
                                <select
                                  defaultValue={exercise.timesPerWeek}
                                  className="w-full px-3 py-2 border border-navy-300 rounded-lg focus:ring-2 focus:ring-navy-500"
                                  onChange={(e) => {
                                    const newFreq = parseInt(e.target.value);
                                    // Auto-adjust days based on frequency
                                    let newDays = [];
                                    if (newFreq === 1) newDays = ['monday'];
                                    else if (newFreq === 2) newDays = ['monday', 'thursday'];
                                    else if (newFreq === 3) newDays = ['monday', 'wednesday', 'friday'];
                                    else if (newFreq === 4) newDays = ['monday', 'tuesday', 'thursday', 'friday'];
                                    else newDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
                                    
                                    handleUpdateSchedule(exercise.id, { 
                                      timesPerWeek: newFreq,
                                      scheduledDays: newDays
                                    });
                                  }}
                                >
                                  <option value={1}>1x per week</option>
                                  <option value={2}>2x per week</option>
                                  <option value={3}>3x per week</option>
                                  <option value={4}>4x per week</option>
                                  <option value={5}>5x per week</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )
            ) : (
              // Regular exercise library rendering
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.exercises.map(exercise => {
                  const isScheduled = isExerciseScheduled ? isExerciseScheduled(exercise.id) : false;
                  
                  return (
                    <div
                      key={exercise.id}
                      className={`border-2 rounded-xl p-4 transition-all duration-300 hover:shadow-blue-glow ${
                        isScheduled
                          ? 'border-navy-500 bg-gradient-to-br from-navy-100 to-navy-200 shadow-blue-glow'
                          : 'border-navy-200 hover:border-navy-300 bg-gradient-to-br from-white to-navy-50'
                      }`}
                    >
                      {/* Exercise Image */}
                      <div className="mb-3 relative">
                        {exercise.image ? (
                          <img 
                            src={exercise.image} 
                            alt={exercise.name}
                            className="w-full aspect-square object-cover rounded-lg shadow-sm"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-full aspect-square bg-gradient-to-br from-navy-100 via-navy-200 to-navy-300 rounded-lg shadow-sm flex items-center justify-center">
                            <div className="text-center">
                              <Dumbbell className="w-12 h-12 text-navy-400 mx-auto mb-2" />
                              <p className="text-navy-600 text-sm font-medium">Exercise</p>
                            </div>
                          </div>
                        )}
                        
                        {isScheduled && (
                          <div className="absolute top-2 right-2 bg-blue-shine text-white p-1.5 rounded-full shadow-lg">
                            <Star className="w-3 h-3" />
                          </div>
                        )}
                        <div className="absolute bottom-2 right-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold shadow-lg ${getDifficultyColor(exercise.difficulty)}`}>
                            {exercise.difficulty}
                          </span>
                        </div>
                      </div>

                      {/* Exercise Name */}
                      <div className="mb-3">
                        <h3 className="text-lg font-semibold text-navy-800 leading-tight">{exercise.name}</h3>
                      </div>

                    {/* Target Muscles */}
                      {/* Target Muscles */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {exercise.targetMuscles.map((muscle, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-shine text-white rounded-full text-xs font-medium"
                            >
                              {muscle}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div>
                        {isScheduled ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveFromSchedule(exercise.id);
                            }}
                            className="w-full bg-gradient-to-r from-red-100 to-red-200 text-red-700 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center text-sm"
                          >
                            <Minus className="w-4 h-4 mr-2" />
                            Remove from Schedule
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToSchedule(exercise);
                            }}
                            className="w-full bg-blue-shine text-white py-2 rounded-lg font-medium hover:shadow-blue-glow transition-all duration-300 flex items-center justify-center text-sm"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add to Schedule
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-2xl shadow-lg p-12 text-center">
          <div className="bg-gradient-to-br from-navy-100 to-navy-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-navy-400" />
          </div>
          <h3 className="text-xl font-semibold text-navy-800 mb-2">No exercises found</h3>
          <p className="text-navy-600">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
};

export default WorkoutLibrary;