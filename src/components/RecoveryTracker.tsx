import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, Clock, Zap, Heart, Target } from 'lucide-react';
import { MuscleGroup } from '../types';

interface RecoveryTrackerProps {
  muscleGroups: MuscleGroup[];
}

const RecoveryTracker: React.FC<RecoveryTrackerProps> = ({ muscleGroups }) => {
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  // Force re-render when muscle groups change
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [muscleGroups]);

  const recoveryExercises = {
    chest: ['Push-up holds', 'Chest stretches', 'Foam rolling'],
    shoulders: ['Arm circles', 'Shoulder shrugs', 'Wall slides'],
    biceps: ['Light bicep curls', 'Arm stretches', 'Massage'],
    triceps: ['Tricep stretches', 'Light dips', 'Foam rolling'],
    abs: ['Cat-cow stretches', 'Dead bugs', 'Breathing exercises'],
    back: ['Child\'s pose', 'Cat stretches', 'Foam rolling'],
    forearms: ['Wrist stretches', 'Light grips', 'Massage'],
    glutes: ['Hip circles', 'Glute bridges', 'Pigeon pose'],
    quads: ['Quad stretches', 'Light squats', 'Foam rolling'],
    hamstrings: ['Hamstring stretches', 'Good mornings', 'Massage'],
    calves: ['Calf stretches', 'Calf raises', 'Massage']
  };

  // Recovery time mapping for display
  const getRecoveryTimeInfo = (muscleId: string, recovery: number, lastWorked?: Date) => {
    const recoveryTimes: { [key: string]: number } = {
      chest: 48, shoulders: 36, biceps: 24, triceps: 24, abs: 24,
      back: 72, forearms: 18, glutes: 48, quads: 72, hamstrings: 48, calves: 24
    };

    if (!lastWorked || recovery >= 100) {
      return 'Fully recovered';
    }

    const totalRecoveryTime = recoveryTimes[muscleId] || 48;
    const recoveryNeeded = 100 - recovery;
    const recoveryRatePerHour = 100 / totalRecoveryTime;
    const hoursRemaining = recoveryNeeded / recoveryRatePerHour;

    if (hoursRemaining < 1) {
      return `${Math.round(hoursRemaining * 60)} min remaining`;
    } else if (hoursRemaining < 24) {
      return `${Math.round(hoursRemaining)} hours remaining`;
    } else {
      const days = Math.floor(hoursRemaining / 24);
      const hours = Math.round(hoursRemaining % 24);
      return `${days}d ${hours}h remaining`;
    }
  };

  const getRecoveryColor = (recovery: number) => {
    if (recovery >= 90) return 'text-green-700 bg-gradient-to-r from-green-100 to-green-200';
    if (recovery >= 70) return 'text-yellow-700 bg-gradient-to-r from-yellow-100 to-yellow-200';
    return 'text-red-700 bg-gradient-to-r from-red-100 to-red-200';
  };

  const getRecoveryStatus = (recovery: number) => {
    if (recovery >= 90) return 'Fully Recovered';
    if (recovery >= 70) return 'Partially Recovered';
    return 'Needs Recovery';
  };

  const getRecoveryDotColor = (recovery: number) => {
    if (recovery >= 90) return 'bg-green-500 border-green-400 shadow-green-300';
    if (recovery >= 70) return 'bg-yellow-500 border-yellow-400 shadow-yellow-300';
    return 'bg-red-500 border-red-400 shadow-red-300';
  };

  const selectedMuscleData = selectedMuscle 
    ? muscleGroups.find(m => m.id === selectedMuscle)
    : null;

  const overallRecovery = Math.round(muscleGroups.reduce((sum, m) => sum + m.recovery, 0) / muscleGroups.length);
  const readyToTrain = muscleGroups.filter(m => m.recovery >= 90).length;
  const needRecovery = muscleGroups.filter(m => m.recovery < 70).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-blue-shine rounded-2xl p-6 text-white shadow-blue-glow">
        <h1 className="text-2xl font-bold mb-2">Recovery Tracker 🔄</h1>
        <p className="opacity-90">Monitor your muscle recovery and optimize your training</p>
      </div>

      {/* Recovery Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-xl p-6 shadow-lg border border-navy-200 hover:shadow-blue-glow transition-all duration-300">
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-navy-400 to-navy-500 p-3 rounded-xl shadow-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-3xl font-bold text-navy-800">{overallRecovery}%</p>
              <p className="text-sm text-navy-600">Overall Recovery</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-xl p-6 shadow-lg border border-navy-200 hover:shadow-blue-glow transition-all duration-300">
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-green-400 to-green-500 p-3 rounded-xl shadow-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-3xl font-bold text-green-600">{readyToTrain}</p>
              <p className="text-sm text-navy-600">Ready to Train</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-xl p-6 shadow-lg border border-navy-200 hover:shadow-blue-glow transition-all duration-300">
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-red-400 to-red-500 p-3 rounded-xl shadow-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-3xl font-bold text-red-600">{needRecovery}</p>
              <p className="text-sm text-navy-600">Need Recovery</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Body Visualization with Anatomy Image */}
        <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-navy-800 mb-6">Muscle Recovery Map</h2>
          
          <div className="relative flex justify-center">
            {/* Anatomy Image Container */}
            <div className="relative inline-block" key={animationKey}>
              <img 
                src="/src/assets/detailed-representation-of-human-anatomy-vector-54924405 copy.jpg"
                alt="Human Anatomy Diagram"
                className="w-80 h-auto rounded-lg shadow-lg bg-white max-h-96 object-contain"
              />
              
              {/* Recovery Indicators Overlaid on Anatomy Image */}
              {muscleGroups.map((muscle) => (
                <div 
                  key={`${muscle.id}-${muscle.recovery}-${animationKey}`} 
                  className="absolute z-10"
                  style={{
                    left: `${muscle.position.x}%`,
                    top: `${muscle.position.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <button
                    onClick={() => setSelectedMuscle(muscle.id)}
                    className={`w-8 h-8 rounded-full border-2 border-white shadow-lg transition-all duration-500 hover:scale-125 flex items-center justify-center text-white text-xs font-bold ${
                      selectedMuscle === muscle.id ? 'scale-150 ring-4 ring-white ring-opacity-50' : ''
                    } ${getRecoveryDotColor(muscle.recovery)}`}
                    title={`${muscle.name}: ${muscle.recovery}%`}
                  >
                    {muscle.recovery}
                  </button>
                  
                  {/* Recovery Status Tooltip */}
                  {selectedMuscle === muscle.id && (
                    <div
                      className="absolute pointer-events-none transition-all duration-300 z-20 mt-2"
                      style={{
                        left: '50%',
                        transform: 'translateX(-50%)'
                      }}
                    >
                      <div className="bg-white bg-opacity-95 px-3 py-2 rounded-lg shadow-lg text-sm font-semibold text-navy-800 whitespace-nowrap">
                        <div className="text-center">
                          <div className="font-bold">{muscle.name}</div>
                          <div className="text-xs">{muscle.recovery}% Recovery</div>
                          <div className="text-xs text-navy-600">
                            {getRecoveryStatus(muscle.recovery)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 space-y-3">
            <h3 className="font-semibold text-navy-800 text-center">Recovery Status Legend</h3>
            <div className="flex justify-center space-x-6">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2 shadow-sm border border-green-400"></div>
                <span className="text-sm text-navy-600">Fully Recovered (90%+)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2 shadow-sm border border-yellow-400"></div>
                <span className="text-sm text-navy-600">Partial (70-89%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-2 shadow-sm border border-red-400"></div>
                <span className="text-sm text-navy-600">Needs Recovery (&lt;70%)</span>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-navy-600">Click on muscle groups to view detailed recovery information</p>
            <p className="text-xs text-navy-500 mt-1">Recovery updates every 30 seconds (simulated time)</p>
          </div>
        </div>

        {/* Muscle Details */}
        <div className="space-y-6">
          {selectedMuscleData ? (
            <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-navy-800 mb-4">{selectedMuscleData.name}</h3>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-navy-600">Recovery Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getRecoveryColor(selectedMuscleData.recovery)}`}>
                    {getRecoveryStatus(selectedMuscleData.recovery)}
                  </span>
                </div>
                <div className="w-full bg-navy-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all duration-500 ${
                      selectedMuscleData.recovery >= 90 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                      selectedMuscleData.recovery >= 70 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 'bg-gradient-to-r from-red-400 to-red-500'
                    }`}
                    style={{ width: `${selectedMuscleData.recovery}%` }}
                  ></div>
                </div>
                <div className="text-right mt-2">
                  <span className="text-3xl font-bold text-navy-800">{selectedMuscleData.recovery}%</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="bg-gradient-to-r from-navy-100 to-navy-200 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center mb-2">
                    <Clock className="w-4 h-4 text-navy-600 mr-2" />
                    <span className="text-sm font-medium text-navy-600">Last Worked</span>
                  </div>
                  <p className="text-lg font-semibold text-navy-800">
                    {selectedMuscleData.lastWorked ? 
                      Math.floor((new Date().getTime() - selectedMuscleData.lastWorked.getTime()) / (1000 * 60)) + ' min ago'
                      : 'Never'
                    }
                  </p>
                </div>
                <div className="bg-gradient-to-r from-navy-100 to-navy-200 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="w-4 h-4 text-navy-600 mr-2" />
                    <span className="text-sm font-medium text-navy-600">Recovery Time</span>
                  </div>
                  <p className="text-lg font-semibold text-navy-800">
                    {getRecoveryTimeInfo(selectedMuscleData.id, selectedMuscleData.recovery, selectedMuscleData.lastWorked)}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-navy-800 mb-3">Recovery Exercises</h4>
                <div className="space-y-2">
                  {recoveryExercises[selectedMuscleData.id as keyof typeof recoveryExercises]?.map((exercise, index) => (
                    <div key={index} className="flex items-center p-3 bg-gradient-to-r from-navy-100 to-navy-200 rounded-lg shadow-sm">
                      <Zap className="w-4 h-4 text-navy-600 mr-3" />
                      <span className="text-navy-700">{exercise}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-2xl shadow-lg p-6">
              <div className="text-center py-8">
                <div className="bg-gradient-to-br from-navy-100 to-navy-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Activity className="w-8 h-8 text-navy-400" />
                </div>
                <p className="text-navy-600">Select a muscle group to view details</p>
                <p className="text-sm text-navy-500 mt-1">Click on the colored dots on the anatomy diagram</p>
              </div>
            </div>
          )}

          {/* Recovery Tips */}
          <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-navy-800 mb-4">Recovery Tips</h3>
            <div className="space-y-3">
              <div className="flex items-start p-3 bg-gradient-to-r from-navy-100 to-navy-200 rounded-lg shadow-sm">
                <Heart className="w-5 h-5 text-navy-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-navy-800">Prioritize Sleep</p>
                  <p className="text-sm text-navy-600">7-9 hours of quality sleep accelerates recovery</p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-gradient-to-r from-navy-100 to-navy-200 rounded-lg shadow-sm">
                <Zap className="w-5 h-5 text-navy-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-navy-800">Stay Hydrated</p>
                  <p className="text-sm text-navy-600">Proper hydration supports muscle repair</p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-gradient-to-r from-navy-100 to-navy-200 rounded-lg shadow-sm">
                <Activity className="w-5 h-5 text-navy-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-navy-800">Active Recovery</p>
                  <p className="text-sm text-navy-600">Light movement promotes blood flow</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recovery Science Info */}
          <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-navy-800 mb-4">Recovery Science</h3>
            <div className="space-y-3 text-sm text-navy-700">
              <p><strong>Large Muscles (Back, Quads):</strong> 48-72 hours for full recovery</p>
              <p><strong>Medium Muscles (Chest, Glutes):</strong> 36-48 hours for full recovery</p>
              <p><strong>Small Muscles (Biceps, Calves):</strong> 18-24 hours for full recovery</p>
              <p className="text-xs text-navy-500 mt-2">
                *Demo uses accelerated time: 30 seconds = 1 hour for demonstration purposes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecoveryTracker;