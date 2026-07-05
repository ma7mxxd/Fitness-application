import { useState, useEffect } from 'react';
import { User } from '../types';

interface AuthUser {
  id: string;
  email: string;
  name: string;
  needsOnboarding: boolean;
}

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  });

  // Check for existing session on app load
  useEffect(() => {
    checkExistingSession();
  }, []);

  const checkExistingSession = () => {
    try {
      const savedUser = localStorage.getItem('fitai_user');
      const savedProfile = localStorage.getItem('fitai_user_profile');
      
      if (savedUser) {
        const user = JSON.parse(savedUser);
        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: true
        });
      } else {
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false
        });
      }
    } catch (error) {
      console.error('Error checking existing session:', error);
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false
      });
    }
  };

  const signIn = (userData: AuthUser) => {
    try {
      // Save user to localStorage
      localStorage.setItem('fitai_user', JSON.stringify(userData));
      
      setAuthState({
        user: userData,
        isLoading: false,
        isAuthenticated: true
      });
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const signUp = (userData: AuthUser) => {
    try {
      // Save user to localStorage
      localStorage.setItem('fitai_user', JSON.stringify(userData));
      
      setAuthState({
        user: userData,
        isLoading: false,
        isAuthenticated: true
      });
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const completeOnboarding = (profileData: User) => {
    try {
      // Save complete profile
      localStorage.setItem('fitai_user_profile', JSON.stringify(profileData));
      
      // Update user to mark onboarding as complete
      const updatedUser = {
        ...authState.user!,
        needsOnboarding: false
      };
      
      localStorage.setItem('fitai_user', JSON.stringify(updatedUser));
      
      setAuthState(prev => ({
        ...prev,
        user: updatedUser
      }));
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const getUserProfile = (): User | null => {
    try {
      const savedProfile = localStorage.getItem('fitai_user_profile');
      return savedProfile ? JSON.parse(savedProfile) : null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  };

  const signOut = () => {
    try {
      localStorage.removeItem('fitai_user');
      localStorage.removeItem('fitai_user_profile');
      
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false
      });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateProfile = (profileData: Partial<User>) => {
    try {
      const currentProfile = getUserProfile();
      if (currentProfile) {
        const updatedProfile = { ...currentProfile, ...profileData };
        localStorage.setItem('fitai_user_profile', JSON.stringify(updatedProfile));
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return {
    ...authState,
    signIn,
    signUp,
    signOut,
    completeOnboarding,
    getUserProfile,
    updateProfile
  };
};