import React, { useEffect, useState } from 'react';
import { Search, Dumbbell, Star, Play, Plus, Minus, Calendar } from 'lucide-react';
import { workoutLibrary, ExerciseDetail, getAllExercises } from '../data/workoutLibrary';
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

const FAVORITE_WORKOUTS_STORAGE_KEY = 'fitai_favorite_workouts';

const WorkoutLibrary: React.FC<WorkoutLibraryProps> = ({ 
  onStartExercise, 
  onAddToSchedule, 
  onRemoveFromSchedule,
  scheduledExercises = [],
  isExerciseScheduled
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [favoriteWorkoutIds, setFavoriteWorkoutIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITE_WORKOUTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading favorite workouts:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITE_WORKOUTS_STORAGE_KEY, JSON.stringify(favoriteWorkoutIds));
    } catch (error) {
      console.error('Error saving favorite workouts:', error);
    }
  }, [favoriteWorkoutIds]);

  const favoriteWorkouts = getAllExercises().filter(exercise => favoriteWorkoutIds.includes(exercise.id));

  const allCategories = [
    {
      id: 'my-workouts',
      name: 'My Workouts',
      icon: '*',
      description: 'Your favorite workouts',
      exercises: favoriteWorkouts
    },
    ...workoutLibrary
  ];

  const filteredCategories = allCategories.filter(category => {
    if (selectedCategory !== 'all' && category.id !== selectedCategory) return false;
    
    const categoryExercises = category.exercises.filter(exercise => {
      const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           exercise.targetMuscles.some(muscle => muscle.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDifficulty = difficultyFilter === 'all' || exercise.difficulty === difficultyFilter;
      return matchesSearch && matchesDifficulty;
    });
    
    if (category.id === 'my-workouts' && selectedCategory === 'my-workouts') return true;
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
        instructions: exercise.instructions,
        image: exercise.image
      };
      onAddToSchedule(exerciseToAdd);
    }
  };

  const handleRemoveFromSchedule = (exerciseId: string) => {
    if (onRemoveFromSchedule) {
      onRemoveFromSchedule(exerciseId);
    }
  };

  const toggleFavoriteWorkout = (exerciseId: string) => {
    setFavoriteWorkoutIds(prev => (
      prev.includes(exerciseId)
        ? prev.filter(id => id !== exerciseId)
        : [...prev, exerciseId]
    ));
  };

  const renderExerciseCard = (exercise: ExerciseDetail) => {
    const isScheduled = isExerciseScheduled ? isExerciseScheduled(exercise.id) : false;
    const isFavorite = favoriteWorkoutIds.includes(exercise.id);

    return (
      <div
        key={exercise.id}
        className={`border-2 rounded-xl p-4 transition-all duration-300 hover:shadow-blue-glow ${
          isScheduled
            ? 'border-navy-500 bg-gradient-to-br from-navy-100 to-navy-200 shadow-blue-glow'
            : 'border-navy-200 hover:border-navy-300 bg-gradient-to-br from-white to-navy-50'
        }`}
      >
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

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavoriteWorkout(exercise.id);
            }}
            aria-label={isFavorite ? `Remove ${exercise.name} from My Workouts` : `Save ${exercise.name} to My Workouts`}
            title={isFavorite ? 'Remove from My Workouts' : 'Save to My Workouts'}
            className={`absolute top-2 right-2 p-2 rounded-full shadow-lg transition-all duration-300 ${
              isFavorite
                ? 'bg-blue-shine text-white shadow-blue-glow'
                : 'bg-white/95 text-navy-500 hover:text-yellow-500 hover:shadow-blue-glow'
            }`}
          >
            <Star className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
          </button>

          {isScheduled && (
            <div className="absolute top-2 left-2 bg-blue-shine text-white p-1.5 rounded-full shadow-lg">
              <Calendar className="w-3 h-3" />
            </div>
          )}
          <div className="absolute bottom-2 right-2">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold shadow-lg ${getDifficultyColor(exercise.difficulty)}`}>
              {exercise.difficulty}
            </span>
          </div>
        </div>

        <div className="mb-3">
          <h3 className="text-lg font-semibold text-navy-800 leading-tight">{exercise.name}</h3>
        </div>

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

        <div className="grid grid-cols-1 gap-2">
          {onStartExercise && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStartExercise(exercise);
              }}
              className="w-full bg-gradient-to-r from-navy-100 to-navy-200 text-navy-700 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center text-sm"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Workout
            </button>
          )}
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
            {allCategories.map(category => (
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

            {category.id === 'my-workouts' && category.exercises.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gradient-to-br from-navy-100 to-navy-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-10 h-10 text-navy-400" />
                </div>
                <h3 className="text-xl font-semibold text-navy-800 mb-2">No Favorite Workouts</h3>
                <p className="text-navy-600">Click the star on any workout to save it here</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.exercises.map(renderExerciseCard)}
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
