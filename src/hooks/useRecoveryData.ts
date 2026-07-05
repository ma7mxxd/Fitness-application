import { useState, useEffect } from 'react';
import { MuscleGroup } from '../types';

interface WorkoutHistory {
  workoutId: string;
  completedAt: Date;
  targetMuscles: string[];
}

export const useRecoveryData = () => {
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroup[]>([
    { id: 'chest', name: 'Chest', recovery: 100, lastWorked: undefined, position: { x: 50, y: 25 } },
    { id: 'shoulders', name: 'Shoulders', recovery: 100, lastWorked: undefined, position: { x: 35, y: 20 } },
    { id: 'biceps', name: 'Biceps', recovery: 100, lastWorked: undefined, position: { x: 25, y: 35 } },
    { id: 'triceps', name: 'Triceps', recovery: 100, lastWorked: undefined, position: { x: 75, y: 35 } },
    { id: 'abs', name: 'Abs', recovery: 100, lastWorked: undefined, position: { x: 50, y: 45 } },
    { id: 'back', name: 'Back', recovery: 100, lastWorked: undefined, position: { x: 50, y: 30 } },
    { id: 'forearms', name: 'Forearms', recovery: 100, lastWorked: undefined, position: { x: 20, y: 50 } },
    { id: 'glutes', name: 'Glutes', recovery: 100, lastWorked: undefined, position: { x: 50, y: 60 } },
    { id: 'quads', name: 'Quadriceps', recovery: 100, lastWorked: undefined, position: { x: 45, y: 70 } },
    { id: 'hamstrings', name: 'Hamstrings', recovery: 100, lastWorked: undefined, position: { x: 55, y: 75 } },
    { id: 'calves', name: 'Calves', recovery: 100, lastWorked: undefined, position: { x: 50, y: 85 } }
  ]);

  const [workoutHistory, setWorkoutHistory] = useState<WorkoutHistory[]>([]);

  // REALISTIC RECOVERY RATES
  // Recovery rate per hour (much more realistic)
  const RECOVERY_RATE_PER_HOUR = 2; // 2% per hour for demo (in real life would be even slower)
  
  // Different muscle groups have different fatigue levels after workouts
  const MUSCLE_FATIGUE_MAP: { [key: string]: number } = {
    chest: 45,      // Heavy compound movements
    shoulders: 40,  // Moderate fatigue
    biceps: 35,     // Smaller muscle, recovers faster
    triceps: 35,    // Smaller muscle, recovers faster
    abs: 30,        // Core recovers relatively quickly
    back: 50,       // Large muscle group, high fatigue
    forearms: 25,   // Small muscle, quick recovery
    glutes: 45,     // Large muscle group
    quads: 50,      // Large muscle group, high fatigue
    hamstrings: 45, // Large muscle group
    calves: 30      // Smaller muscle, moderate fatigue
  };

  // Different recovery times for different muscle groups (in hours)
  const FULL_RECOVERY_TIME: { [key: string]: number } = {
    chest: 48,      // 48 hours for full recovery
    shoulders: 36,  // 36 hours
    biceps: 24,     // 24 hours (smaller muscle)
    triceps: 24,    // 24 hours (smaller muscle)
    abs: 24,        // 24 hours (core recovers faster)
    back: 72,       // 72 hours (large muscle group)
    forearms: 18,   // 18 hours (small muscle)
    glutes: 48,     // 48 hours (large muscle group)
    quads: 72,      // 72 hours (large muscle group)
    hamstrings: 48, // 48 hours
    calves: 24      // 24 hours
  };

  // Update recovery every 30 seconds for demo purposes (represents 1 hour of real time)
  useEffect(() => {
    const interval = setInterval(() => {
      updateRecovery();
    }, 30000); // Update every 30 seconds (represents 1 hour)

    return () => clearInterval(interval);
  }, []);

  const updateRecovery = () => {
    setMuscleGroups(prevMuscles => 
      prevMuscles.map(muscle => {
        if (!muscle.lastWorked || muscle.recovery >= 100) return muscle;

        // Calculate hours since worked (for demo: 30 seconds = 1 hour)
        const realTimeMinutes = (new Date().getTime() - muscle.lastWorked.getTime()) / (1000 * 60);
        const simulatedHours = realTimeMinutes / 0.5; // 30 seconds = 1 hour
        
        // Get muscle-specific recovery rate
        const muscleRecoveryTime = FULL_RECOVERY_TIME[muscle.id] || 48;
        const recoveryRatePerHour = 100 / muscleRecoveryTime; // Percentage per hour for full recovery
        
        const recoveryGain = simulatedHours * recoveryRatePerHour;
        const newRecovery = Math.min(100, muscle.recovery + recoveryGain);

        return {
          ...muscle,
          recovery: Math.round(newRecovery)
        };
      })
    );
  };

  const recordWorkout = (workoutId: string, targetMuscles: string[]) => {
    const now = new Date();
    
    console.log('🏋️ Recording workout:', { workoutId, targetMuscles, timestamp: now });
    
    // Add to workout history
    setWorkoutHistory(prev => [...prev, {
      workoutId,
      completedAt: now,
      targetMuscles
    }]);

    // Update muscle recovery immediately
    setMuscleGroups(prevMuscles =>
      prevMuscles.map(muscle => {
        if (targetMuscles.includes(muscle.id)) {
          const fatigueAmount = MUSCLE_FATIGUE_MAP[muscle.id] || 40;
          const newRecovery = Math.max(20, 100 - fatigueAmount); // Minimum 20% recovery
          
          console.log(`💪 Updating ${muscle.name}: ${muscle.recovery}% -> ${newRecovery}%`);
          
          return {
            ...muscle,
            recovery: newRecovery,
            lastWorked: now
          };
        }
        return muscle;
      })
    );
  };

  const getOverallRecovery = () => {
    const totalRecovery = muscleGroups.reduce((sum, muscle) => sum + muscle.recovery, 0);
    return Math.round(totalRecovery / muscleGroups.length);
  };

  const getReadyToTrainCount = () => {
    return muscleGroups.filter(muscle => muscle.recovery >= 90).length;
  };

  const getNeedRecoveryCount = () => {
    return muscleGroups.filter(muscle => muscle.recovery < 70).length;
  };

  // Get muscles that were worked in the last workout
  const getRecentlyWorkedMuscles = () => {
    if (workoutHistory.length === 0) return [];
    const lastWorkout = workoutHistory[workoutHistory.length - 1];
    return lastWorkout.targetMuscles;
  };

  // Get estimated recovery time for a muscle
  const getEstimatedRecoveryTime = (muscleId: string): string => {
    const muscle = muscleGroups.find(m => m.id === muscleId);
    if (!muscle || !muscle.lastWorked || muscle.recovery >= 100) {
      return 'Fully recovered';
    }

    const recoveryTimeHours = FULL_RECOVERY_TIME[muscleId] || 48;
    const recoveryNeeded = 100 - muscle.recovery;
    const recoveryRatePerHour = 100 / recoveryTimeHours;
    const hoursRemaining = recoveryNeeded / recoveryRatePerHour;

    if (hoursRemaining < 1) {
      return `${Math.round(hoursRemaining * 60)} minutes`;
    } else if (hoursRemaining < 24) {
      return `${Math.round(hoursRemaining)} hours`;
    } else {
      const days = Math.floor(hoursRemaining / 24);
      const hours = Math.round(hoursRemaining % 24);
      return `${days}d ${hours}h`;
    }
  };

  // Force immediate recovery update when called
  const forceRecoveryUpdate = () => {
    updateRecovery();
  };

  return {
    muscleGroups,
    workoutHistory,
    recordWorkout,
    getOverallRecovery,
    getReadyToTrainCount,
    getNeedRecoveryCount,
    getRecentlyWorkedMuscles,
    getEstimatedRecoveryTime,
    forceRecoveryUpdate
  };
};