export interface User {
  id: string;
  name: string;
  age: number;
  weight: number;
  height: number;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  preferences: string[];
  calorieGoal: number; // This should be 2200 to match meal planner
  workoutFrequency: number;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
  restTime: number;
  targetMuscles: string[];
  instructions: string[];
  image?: string;
}

export interface Workout {
  id: string;
  name: string;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  targetMuscles: string[];
  exercises: Exercise[];
  completed: boolean;
  scheduledDate?: Date;
}

export interface MuscleGroup {
  id: string;
  name: string;
  recovery: number;
  lastWorked?: Date;
  position: { x: number; y: number };
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  instructions: string[];
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface WorkoutSession {
  currentExercise: number;
  currentSet: number;
  isResting: boolean;
  restTimeRemaining: number;
  startTime: Date;
  completedExercises: string[];
}