import React, { useState } from 'react';
import { Send, Bot, User, Sparkles, MessageCircle, Target, Activity, Apple } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  category?: 'workout' | 'nutrition' | 'recovery' | 'general';
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI fitness coach. I'm here to help you with workouts, nutrition, recovery, and achieving your fitness goals. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
      category: 'general'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    { text: "Suggest a workout for today", category: 'workout', icon: Activity },
    { text: "What should I eat pre-workout?", category: 'nutrition', icon: Apple },
    { text: "How to improve recovery?", category: 'recovery', icon: Target },
    { text: "Modify my meal plan", category: 'nutrition', icon: Apple }
  ];

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('workout') || message.includes('exercise')) {
      return "Based on your recent activity and recovery status, I recommend a moderate intensity upper body workout today. Your chest and shoulders are at 85% recovery, making it perfect for strength training. Would you like me to create a specific routine for you?";
    }
    
    if (message.includes('nutrition') || message.includes('eat') || message.includes('meal')) {
      return "For optimal performance, I suggest eating a balanced meal with 30g protein and 40g carbs about 2 hours before your workout. Based on your goals, a grilled chicken with sweet potato would be perfect. Your current calorie intake is on track!";
    }
    
    if (message.includes('recovery') || message.includes('rest') || message.includes('sore')) {
      return "Your overall recovery is at 84%. I notice your quads need more attention - they're at 75% recovery. I recommend light stretching, foam rolling, and ensuring you get 7-8 hours of sleep tonight. Would you like specific recovery exercises?";
    }
    
    if (message.includes('goal') || message.includes('progress')) {
      return "You're making excellent progress! You've completed 4 workouts this week and hit 92% of your nutrition goals. To accelerate your muscle building goal, consider increasing your protein intake by 10g daily and adding one more strength session per week.";
    }
    
    return "I'm here to help with all aspects of your fitness journey! I can assist with workout planning, nutrition advice, recovery optimization, and tracking your progress. What specific area would you like to focus on today?";
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputText),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700">
      {/* Header */}
      <div className="bg-blue-shine text-white p-6 shadow-blue-glow">
        <div className="flex items-center">
          <div className="bg-white bg-opacity-20 p-3 rounded-xl mr-4 shadow-lg">
            <Bot className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">AI Fitness Coach</h1>
            <p className="opacity-90">Your personalized training assistant</p>
          </div>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="p-4 bg-gradient-to-r from-navy-50 to-navy-100 border-b border-navy-200">
        <h3 className="text-sm font-medium text-navy-600 mb-3">Quick Questions</h3>
        <div className="grid grid-cols-2 gap-2">
          {quickQuestions.map((question, index) => {
            const IconComponent = question.icon;
            return (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question.text)}
                className="flex items-center p-3 bg-gradient-to-r from-white to-navy-50 hover:shadow-blue-glow rounded-xl text-left transition-all duration-300 group"
              >
                <IconComponent className="w-4 h-4 text-navy-400 group-hover:text-navy-600 mr-2" />
                <span className="text-sm text-navy-700 group-hover:text-navy-800">{question.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
              message.isUser ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              <div className={`p-2 rounded-xl shadow-lg ${
                message.isUser ? 'bg-blue-shine' : 'bg-gradient-to-br from-navy-50 to-navy-100 border border-navy-200'
              }`}>
                {message.isUser ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-navy-600" />
                )}
              </div>
              <div className={`rounded-2xl p-4 shadow-lg ${
                message.isUser 
                  ? 'bg-blue-shine text-white' 
                  : 'bg-gradient-to-br from-navy-50 to-navy-100 border border-navy-200 text-navy-800'
              }`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-2 ${
                  message.isUser ? 'text-navy-200' : 'text-navy-500'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3 max-w-xs lg:max-w-md">
              <div className="p-2 rounded-xl bg-gradient-to-br from-navy-50 to-navy-100 border border-navy-200 shadow-lg">
                <Bot className="w-5 h-5 text-navy-600" />
              </div>
              <div className="bg-gradient-to-br from-navy-50 to-navy-100 border border-navy-200 rounded-2xl p-4 shadow-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-navy-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-navy-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-navy-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-gradient-to-r from-navy-50 to-navy-100 border-t border-navy-200">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about fitness, nutrition, or recovery..."
              className="w-full px-4 py-3 bg-white border border-navy-200 rounded-xl focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all shadow-lg"
            />
            <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-navy-400" />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="bg-blue-shine text-white p-3 rounded-xl hover:shadow-blue-glow transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;