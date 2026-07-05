import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  CheckCircle2,
  Clock,
  Dumbbell,
  RotateCcw,
  X,
  ChevronRight,
  Timer,
  Trophy,
  Flame,
  Target,
} from 'lucide-react';
import { Exercise } from '../types';

interface WorkoutSessionProps {
  exercise: Exercise;
  onComplete: (exerciseId: string, targetMuscles: string[]) => void;
  onExit: () => void;
}

type SessionPhase = 'active' | 'resting' | 'complete';

const WorkoutSession: React.FC<WorkoutSessionProps> = ({ exercise, onComplete, onExit }) => {
  const [currentSet, setCurrentSet] = useState(1);
  const [phase, setPhase] = useState<SessionPhase>('active');
  const [restTimeRemaining, setRestTimeRemaining] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [completedSets, setCompletedSets] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const restTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSets = exercise.sets;
  const progress = (completedSets / totalSets) * 100;

  // Elapsed time counter
  useEffect(() => {
    if (phase === 'complete') return;
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, phase]);

  // Rest timer
  useEffect(() => {
    if (phase !== 'resting' || isPaused) {
      if (restTimerRef.current) clearInterval(restTimerRef.current);
      return;
    }

    restTimerRef.current = setInterval(() => {
      setRestTimeRemaining(prev => {
        if (prev <= 1) {
          setPhase('active');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (restTimerRef.current) clearInterval(restTimerRef.current);
    };
  }, [phase, isPaused]);

  const handleCompleteSet = useCallback(() => {
    const newCompleted = completedSets + 1;
    setCompletedSets(newCompleted);

    if (newCompleted >= totalSets) {
      setPhase('complete');
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setCurrentSet(prev => prev + 1);
      setRestTimeRemaining(exercise.restTime);
      setPhase('resting');
    }
  }, [completedSets, totalSets, exercise.restTime]);

  const handleSkipRest = () => {
    setRestTimeRemaining(0);
    setPhase('active');
  };

  const handleFinishWorkout = () => {
    onComplete(exercise.id, exercise.targetMuscles);
  };

  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const formatRestTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (m > 0) return `${m}:${s.toString().padStart(2, '0')}`;
    return `${s}`;
  };

  const estimatedCalories = Math.round((completedSets * exercise.reps * (exercise.weight || 10)) / 150);

  // Completion screen
  if (phase === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 flex items-center justify-center p-4">
        <div className="max-w-lg w-full">
          <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-2xl shadow-2xl p-8 text-center">
            <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Trophy className="w-12 h-12 text-white" />
            </div>

            <h2 className="text-3xl font-bold text-navy-800 mb-2">Exercise Complete!</h2>
            <p className="text-navy-600 mb-8 text-lg">{exercise.name}</p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-white to-navy-50 rounded-xl p-4 shadow-md">
                <div className="text-2xl font-bold text-navy-800">{totalSets}</div>
                <div className="text-sm text-navy-500">Sets</div>
              </div>
              <div className="bg-gradient-to-br from-white to-navy-50 rounded-xl p-4 shadow-md">
                <div className="text-2xl font-bold text-navy-800">{exercise.reps}</div>
                <div className="text-sm text-navy-500">Reps/Set</div>
              </div>
              <div className="bg-gradient-to-br from-white to-navy-50 rounded-xl p-4 shadow-md">
                <div className="text-2xl font-bold text-navy-800">{formatTime(elapsedSeconds)}</div>
                <div className="text-sm text-navy-500">Duration</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl p-4 mb-8 border border-emerald-200">
              <div className="flex items-center justify-center space-x-2">
                <Flame className="w-5 h-5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">~{estimatedCalories} calories burned</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleFinishWorkout}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Finish & Save
              </button>
              <button
                onClick={onExit}
                className="w-full bg-gradient-to-r from-navy-100 to-navy-200 text-navy-700 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Rest screen
  if (phase === 'resting') {
    const restProgress = exercise.restTime > 0 ? ((exercise.restTime - restTimeRemaining) / exercise.restTime) * 100 : 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-2xl shadow-2xl p-8 text-center">
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <RotateCcw className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-2xl font-bold text-navy-800 mb-2">Rest Time</h2>
            <p className="text-navy-600 mb-2">
              Set {currentSet - 1} of {totalSets} complete
            </p>
            <p className="text-navy-500 text-sm mb-8">Next: Set {currentSet} of {totalSets}</p>

            {/* Circular timer */}
            <div className="relative w-48 h-48 mx-auto mb-8">
              <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 192 192">
                <circle
                  cx="96" cy="96" r="88"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-navy-200"
                />
                <circle
                  cx="96" cy="96" r="88"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - restProgress / 100)}`}
                  strokeLinecap="round"
                  className="text-amber-500 transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-navy-800">{formatRestTime(restTimeRemaining)}</div>
                <div className="text-sm text-navy-500">remaining</div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={togglePause}
                className="w-full bg-gradient-to-r from-navy-100 to-navy-200 text-navy-700 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center"
              >
                {isPaused ? <Play className="w-5 h-5 mr-2" /> : <Pause className="w-5 h-5 mr-2" />}
                {isPaused ? 'Resume Timer' : 'Pause Timer'}
              </button>

              <button
                onClick={handleSkipRest}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center"
              >
                <SkipForward className="w-5 h-5 mr-2" />
                Skip Rest
              </button>

              <button
                onClick={() => setShowExitConfirm(true)}
                className="w-full text-navy-500 py-2 text-sm hover:text-navy-700 transition-colors"
              >
                Exit Workout
              </button>
            </div>
          </div>

          {showExitConfirm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                <h3 className="text-lg font-bold text-navy-800 mb-2">Exit Workout?</h3>
                <p className="text-navy-600 mb-6">Your progress for this exercise will be lost.</p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowExitConfirm(false)}
                    className="flex-1 bg-gradient-to-r from-navy-100 to-navy-200 text-navy-700 py-2 rounded-xl font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onExit}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-xl font-semibold"
                  >
                    Exit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Active exercise screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Top bar */}
        <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-2xl shadow-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowExitConfirm(true)}
              className="p-2 rounded-xl bg-gradient-to-r from-navy-100 to-navy-200 text-navy-600 hover:shadow-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-navy-500" />
              <span className="text-lg font-bold text-navy-700">{formatTime(elapsedSeconds)}</span>
            </div>
            <button
              onClick={togglePause}
              className={`p-2 rounded-xl transition-all ${
                isPaused
                  ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-white'
                  : 'bg-gradient-to-r from-navy-100 to-navy-200 text-navy-600 hover:shadow-lg'
              }`}
            >
              {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-sm text-navy-600 mb-1">
              <span>Progress</span>
              <span>{completedSets}/{totalSets} sets</span>
            </div>
            <div className="w-full bg-navy-200 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Paused overlay */}
        {isPaused && (
          <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-2xl shadow-lg p-8 mb-4 text-center">
            <Pause className="w-12 h-12 text-navy-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-navy-800 mb-2">Workout Paused</h2>
            <p className="text-navy-600">Tap resume to continue</p>
          </div>
        )}

        {/* Exercise card */}
        <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-2xl shadow-lg p-6 mb-4">
          <div className="flex items-start mb-6">
            <div className="bg-gradient-to-br from-navy-200 to-navy-300 p-3 rounded-xl mr-4 shadow-md">
              <Dumbbell className="w-7 h-7 text-navy-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-navy-800">{exercise.name}</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                {exercise.targetMuscles.map((muscle, i) => (
                  <span key={i} className="px-3 py-1 bg-gradient-to-r from-navy-200 to-navy-300 text-navy-700 rounded-full text-xs font-medium">
                    {muscle}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Set tracker */}
          <div className="bg-gradient-to-br from-white to-navy-50 rounded-xl p-5 mb-6 shadow-inner border border-navy-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Timer className="w-5 h-5 text-navy-500 mr-2" />
                <span className="text-lg font-semibold text-navy-800">Set {currentSet} of {totalSets}</span>
              </div>
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalSets }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-2 rounded-full transition-all duration-300 ${
                      i < completedSets
                        ? 'bg-gradient-to-r from-emerald-400 to-emerald-500'
                        : i === completedSets
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                        : 'bg-navy-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-navy-100 to-navy-200 p-4 rounded-xl text-center shadow-sm">
                <div className="text-3xl font-bold text-navy-800">{exercise.reps}</div>
                <div className="text-sm text-navy-500 mt-1">Reps</div>
              </div>
              <div className="bg-gradient-to-br from-navy-100 to-navy-200 p-4 rounded-xl text-center shadow-sm">
                <div className="text-3xl font-bold text-navy-800">{exercise.weight || 'BW'}</div>
                <div className="text-sm text-navy-500 mt-1">{exercise.weight ? 'kg' : 'Weight'}</div>
              </div>
              <div className="bg-gradient-to-br from-navy-100 to-navy-200 p-4 rounded-xl text-center shadow-sm">
                <div className="text-3xl font-bold text-navy-800">{formatRestTime(exercise.restTime)}</div>
                <div className="text-sm text-navy-500 mt-1">Rest</div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          {exercise.instructions.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-navy-800 mb-3 flex items-center">
                <Target className="w-4 h-4 mr-2" />
                Instructions
              </h3>
              <div className="space-y-2">
                {exercise.instructions.map((step, i) => (
                  <div key={i} className="flex items-start">
                    <span className="bg-gradient-to-r from-navy-200 to-navy-300 text-navy-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-navy-700 text-sm leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Complete Set button */}
          {!isPaused && (
            <button
              onClick={handleCompleteSet}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center text-lg"
            >
              <CheckCircle2 className="w-6 h-6 mr-2" />
              Complete Set {currentSet}
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          )}
        </div>

        {/* Exercise image */}
        {exercise.image && (
          <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-2xl shadow-lg p-4 mb-4">
            <img
              src={exercise.image}
              alt={exercise.name}
              className="w-full max-h-64 object-contain rounded-xl"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Quick stats */}
        <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-2xl shadow-lg p-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <Flame className="w-5 h-5 text-amber-500 mx-auto mb-1" />
              <div className="text-sm font-bold text-navy-800">~{estimatedCalories}</div>
              <div className="text-xs text-navy-500">kcal</div>
            </div>
            <div>
              <Dumbbell className="w-5 h-5 text-navy-500 mx-auto mb-1" />
              <div className="text-sm font-bold text-navy-800">{completedSets * exercise.reps}</div>
              <div className="text-xs text-navy-500">total reps</div>
            </div>
            <div>
              <Clock className="w-5 h-5 text-navy-500 mx-auto mb-1" />
              <div className="text-sm font-bold text-navy-800">{formatTime(elapsedSeconds)}</div>
              <div className="text-xs text-navy-500">elapsed</div>
            </div>
          </div>
        </div>

        {/* Exit confirmation modal */}
        {showExitConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
              <h3 className="text-lg font-bold text-navy-800 mb-2">Exit Workout?</h3>
              <p className="text-navy-600 mb-6">
                You've completed {completedSets} of {totalSets} sets. Your progress will be lost.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowExitConfirm(false)}
                  className="flex-1 bg-gradient-to-r from-navy-100 to-navy-200 text-navy-700 py-2 rounded-xl font-semibold"
                >
                  Continue
                </button>
                <button
                  onClick={onExit}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-xl font-semibold"
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutSession;
