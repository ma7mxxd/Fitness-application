import { useState, useEffect } from 'react';
import { Exercise } from '../types';

interface ScheduledExercise extends Exercise {
  scheduledDays: string[]; // ['monday', 'wednesday', 'friday']
  timesPerWeek: number;
  isCustomized: boolean; // Whether user has modified the defaults
}

interface WorkoutSchedule {
  [day: string]: ScheduledExercise[];
}

const STORAGE_KEY = 'fitai_workout_schedule';

// Smart scheduling recommendations based on muscle groups and recovery
const getRecommendedSchedule = (exercise: Exercise): { days: string[], timesPerWeek: number } => {
  const muscleGroup = exercise.targetMuscles[0]?.toLowerCase() || '';
  
  // Large muscle groups need more recovery time
  const largeGroups = ['chest', 'back', 'quads', 'hamstrings', 'glutes'];
  // Small muscle groups can be trained more frequently
  const smallGroups = ['biceps', 'triceps', 'calves', 'forearms'];
  // Core can be trained almost daily
  const coreGroups = ['abs', 'core'];
  
  if (coreGroups.includes(muscleGroup)) {
    return {
      days: ['monday', 'wednesday', 'friday', 'sunday'],
      timesPerWeek: 4
    };
  } else if (smallGroups.includes(muscleGroup)) {
    return {
      days: ['monday', 'wednesday', 'friday'],
      timesPerWeek: 3
    };
  } else if (largeGroups.includes(muscleGroup)) {
    return {
      days: ['monday', 'thursday'],
      timesPerWeek: 2
    };
  } else {
    // Default for shoulders and other muscle groups
    return {
      days: ['tuesday', 'friday'],
      timesPerWeek: 2
    };
  }
};

export const useWorkoutData = () => {
  const [workoutSchedule, setWorkoutSchedule] = useState<WorkoutSchedule>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading workout schedule:', error);
    }
    
    return {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    };
  });

  // Save to localStorage whenever schedule changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(workoutSchedule));
    } catch (error) {
      console.error('Error saving workout schedule:', error);
    }
  }, [workoutSchedule]);

  const addExerciseToSchedule = (exercise: Exercise) => {
    const recommendation = getRecommendedSchedule(exercise);
    
    const scheduledExercise: ScheduledExercise = {
      ...exercise,
      scheduledDays: recommendation.days,
      timesPerWeek: recommendation.timesPerWeek,
      isCustomized: false
    };

    setWorkoutSchedule(prev => {
      const newSchedule = { ...prev };
      
      // Add exercise to recommended days
      recommendation.days.forEach(day => {
        // Check if exercise is already scheduled on this day
        const existingIndex = newSchedule[day].findIndex(e => e.id === exercise.id);
        if (existingIndex === -1) {
          newSchedule[day] = [...newSchedule[day], scheduledExercise];
        }
      });
      
      return newSchedule;
    });
  };

  const removeExerciseFromSchedule = (exerciseId: string) => {
    setWorkoutSchedule(prev => {
      const newSchedule = { ...prev };
      
      // Remove from all days
      Object.keys(newSchedule).forEach(day => {
        newSchedule[day] = newSchedule[day].filter(exercise => exercise.id !== exerciseId);
      });
      
      return newSchedule;
    });
  };

  const updateExerciseSchedule = (exerciseId: string, updates: Partial<ScheduledExercise>) => {
    setWorkoutSchedule(prev => {
      const newSchedule = { ...prev };
      
      // First, remove exercise from all days
      Object.keys(newSchedule).forEach(day => {
        newSchedule[day] = newSchedule[day].filter(exercise => exercise.id !== exerciseId);
      });
      
      // Find the exercise to update
      const allExercises = getAllScheduledExercises();
      const exerciseToUpdate = allExercises.find(e => e.id === exerciseId);
      
      if (exerciseToUpdate) {
        const updatedExercise = {
          ...exerciseToUpdate,
          ...updates,
          isCustomized: true
        };
        
        // Add to new scheduled days
        const scheduledDays = updates.scheduledDays || exerciseToUpdate.scheduledDays;
        scheduledDays.forEach(day => {
          newSchedule[day] = [...newSchedule[day], updatedExercise];
        });
      }
      
      return newSchedule;
    });
  };

  const getScheduledExercisesForDay = (day: string): ScheduledExercise[] => {
    return workoutSchedule[day] || [];
  };

  const getAllScheduledExercises = (): ScheduledExercise[] => {
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

  const isExerciseScheduled = (exerciseId: string): boolean => {
    return getAllScheduledExercises().some(exercise => exercise.id === exerciseId);
  };

  const getExerciseScheduleInfo = (exerciseId: string): ScheduledExercise | null => {
    return getAllScheduledExercises().find(exercise => exercise.id === exerciseId) || null;
  };

  const getTotalScheduledExercises = (): number => {
    return getAllScheduledExercises().length;
  };

  return {
    workoutSchedule,
    addExerciseToSchedule,
    removeExerciseFromSchedule,
    updateExerciseSchedule,
    getScheduledExercisesForDay,
    getAllScheduledExercises,
    isExerciseScheduled,
    getExerciseScheduleInfo,
    getTotalScheduledExercises
  };
};