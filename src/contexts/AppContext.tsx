'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Club } from '@/types';

interface AppContextType {
  // Auth state
  isAuthenticated: boolean;
  user: User | null;
  
  // Saved clubs
  savedClubs: Club[];
  
  // Auth actions
  login: (user: User) => void;
  logout: () => void;
  
  // Saved clubs actions
  addSavedClub: (club: Club) => void;
  removeSavedClub: (clubId: string) => void;
  isClubSaved: (clubId: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// localStorage keys
const STORAGE_KEY_USER = 'clubFinder_user';
const STORAGE_KEY_SAVED_CLUBS = 'clubFinder_savedClubs';

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [savedClubs, setSavedClubs] = useState<Club[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      // Load user
      const storedUser = localStorage.getItem(STORAGE_KEY_USER);
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      }

      // Load saved clubs
      const storedClubs = localStorage.getItem(STORAGE_KEY_SAVED_CLUBS);
      if (storedClubs) {
        const clubsData = JSON.parse(storedClubs);
        setSavedClubs(clubsData);
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      if (user) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    }
  }, [user, isLoaded]);

  // Save saved clubs to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY_SAVED_CLUBS, JSON.stringify(savedClubs));
    }
  }, [savedClubs, isLoaded]);

  // Auth actions
  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // Optionally clear saved clubs on logout
    // setSavedClubs([]);
  };

  // Saved clubs actions
  const addSavedClub = (club: Club) => {
    setSavedClubs((prev) => {
      // Check if club already exists
      if (prev.some((c) => c.id === club.id)) {
        return prev;
      }
      return [...prev, club];
    });
  };

  const removeSavedClub = (clubId: string) => {
    setSavedClubs((prev) => prev.filter((club) => club.id !== clubId));
  };

  const isClubSaved = (clubId: string) => {
    return savedClubs.some((club) => club.id === clubId);
  };

  const value: AppContextType = {
    isAuthenticated,
    user,
    savedClubs,
    login,
    logout,
    addSavedClub,
    removeSavedClub,
    isClubSaved,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
