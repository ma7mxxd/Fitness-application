import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, User, Target, Activity, Calendar } from 'lucide-react';

interface QuizData {
  name: string;
  age: number;
  weight: number;
  height: number;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  preferences: string[];
  workoutFrequency: number;
}

interface OnboardingQuizProps {
  onComplete: (data: QuizData) => void;
}

const OnboardingQuiz: React.FC<OnboardingQuizProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [quizData, setQuizData] = useState<QuizData>({
    name: '',
    age: 25,
    weight: 70,
    height: 170,
    fitnessLevel: 'beginner',
    goals: [],
    preferences: [],
    workoutFrequency: 3
  });

  const steps = [
    {
      title: 'Personal Information',
      icon: User,
      component: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-2">Full Name</label>
            <input
              type="text"
              value={quizData.name}
              onChange={(e) => setQuizData({ ...quizData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all shadow-lg"
              placeholder="Enter your full name"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">Age</label>
              <input
                type="number"
                value={quizData.age}
                onChange={(e) => setQuizData({ ...quizData, age: parseInt(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all shadow-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">Weight (kg)</label>
              <input
                type="number"
                value={quizData.weight}
                onChange={(e) => setQuizData({ ...quizData, weight: parseInt(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all shadow-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">Height (cm)</label>
              <input
                type="number"
                value={quizData.height}
                onChange={(e) => setQuizData({ ...quizData, height: parseInt(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all shadow-lg"
              />
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Fitness Level',
      icon: Activity,
      component: (
        <div className="space-y-4">
          {[
            { value: 'beginner', title: 'Beginner', desc: 'New to fitness or returning after a break' },
            { value: 'intermediate', title: 'Intermediate', desc: 'Regular exerciser with some experience' },
            { value: 'advanced', title: 'Advanced', desc: 'Experienced athlete or fitness enthusiast' }
          ].map((level) => (
            <button
              key={level.value}
              onClick={() => setQuizData({ ...quizData, fitnessLevel: level.value as any })}
              className={`w-full p-6 rounded-xl border-2 text-left transition-all duration-300 hover:shadow-blue-glow ${
                quizData.fitnessLevel === level.value
                  ? 'border-navy-500 bg-gradient-to-br from-navy-50 to-navy-100 shadow-blue-glow'
                  : 'border-navy-200 hover:border-navy-300 bg-gradient-to-br from-white to-navy-50'
              }`}
            >
              <h3 className="font-semibold text-lg mb-2 text-navy-800">{level.title}</h3>
              <p className="text-navy-600">{level.desc}</p>
            </button>
          ))}
        </div>
      )
    },
    {
      title: 'Fitness Goals',
      icon: Target,
      component: (
        <div className="space-y-4">
          <p className="text-navy-600 mb-4">Select all that apply to you:</p>
          {[
            'Lose weight',
            'Build muscle',
            'Improve endurance',
            'Increase strength',
            'Better health',
            'Athletic performance',
            'Flexibility',
            'Stress relief'
          ].map((goal) => (
            <button
              key={goal}
              onClick={() => {
                const newGoals = quizData.goals.includes(goal)
                  ? quizData.goals.filter(g => g !== goal)
                  : [...quizData.goals, goal];
                setQuizData({ ...quizData, goals: newGoals });
              }}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 hover:shadow-blue-glow ${
                quizData.goals.includes(goal)
                  ? 'border-navy-500 bg-gradient-to-br from-navy-50 to-navy-100 shadow-blue-glow'
                  : 'border-navy-200 hover:border-navy-300 bg-gradient-to-br from-white to-navy-50'
              }`}
            >
              <span className="text-navy-800">{goal}</span>
            </button>
          ))}
        </div>
      )
    },
    {
      title: 'Workout Frequency',
      icon: Calendar,
      component: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-4">
              How many days per week do you want to workout?
            </label>
            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-navy-100 to-navy-200 p-2 rounded-xl shadow-lg">
                {[1, 2, 3, 4, 5, 6, 7].map((days) => (
                  <button
                    key={days}
                    onClick={() => setQuizData({ ...quizData, workoutFrequency: days })}
                    className={`px-6 py-3 mx-1 rounded-lg font-semibold transition-all duration-300 ${
                      quizData.workoutFrequency === days
                        ? 'bg-blue-shine text-white shadow-blue-glow transform scale-105'
                        : 'text-navy-600 hover:bg-white hover:shadow-lg'
                    }`}
                  >
                    {days}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-navy-600">{quizData.workoutFrequency} days/week</p>
            <p className="text-navy-600">Perfect for your fitness journey!</p>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(quizData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return quizData.name.trim() !== '' && quizData.age > 0 && quizData.weight > 0 && quizData.height > 0;
      case 1:
        return true;
      case 2:
        return quizData.goals.length > 0;
      case 3:
        return true;
      default:
        return true;
    }
  };

  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-gradient-to-br from-white to-navy-50 rounded-2xl shadow-blue-glow-lg p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-navy-800">Welcome to FitAI</h2>
              <span className="text-sm text-navy-500">{currentStep + 1} of {steps.length}</span>
            </div>
            <div className="w-full bg-navy-200 rounded-full h-2">
              <div
                className="bg-blue-shine h-2 rounded-full transition-all duration-300 shadow-blue-glow"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-navy-100 to-navy-200 p-3 rounded-xl mr-4 shadow-lg">
                <IconComponent className="w-6 h-6 text-navy-600" />
              </div>
              <h3 className="text-xl font-semibold text-navy-800">{currentStepData.title}</h3>
            </div>
            {currentStepData.component}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                currentStep === 0
                  ? 'text-navy-400 cursor-not-allowed'
                  : 'text-navy-600 hover:bg-gradient-to-r hover:from-navy-100 hover:to-navy-200 hover:shadow-lg'
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`flex items-center px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isStepValid()
                  ? 'bg-blue-shine text-white hover:shadow-blue-glow transform hover:-translate-y-0.5'
                  : 'bg-navy-300 text-navy-500 cursor-not-allowed'
              }`}
            >
              {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingQuiz;