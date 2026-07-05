import React from 'react';
import { Home, Dumbbell, Activity, Apple, Bot, User, Calendar } from 'lucide-react';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'workouts', icon: Dumbbell, label: 'Workouts' },
    { id: 'recovery', icon: Activity, label: 'Recovery' },
    { id: 'meals', icon: Apple, label: 'Meals' },
    { id: 'ai', icon: Bot, label: 'AI Coach' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="bg-gradient-to-b from-navy-800 via-navy-900 to-navy-800 border-t border-navy-600 md:border-t-0 md:border-r md:w-64 md:h-screen shadow-blue-glow">
      <div className="p-4 hidden md:block">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-blue-shine p-2 rounded-xl shadow-blue-glow">
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">FitAI</span>
        </div>
      </div>
      
      <div className="flex md:flex-col md:space-y-1 md:px-4 overflow-x-auto md:overflow-x-visible">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 whitespace-nowrap ${
                isActive
                  ? 'bg-blue-shine text-white shadow-blue-glow transform scale-105'
                  : 'text-navy-300 hover:bg-gradient-to-r hover:from-navy-700 hover:to-navy-600 hover:text-white hover:shadow-blue-glow'
              }`}
            >
              <IconComponent className="w-5 h-5" />
              <span className="hidden md:block font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;