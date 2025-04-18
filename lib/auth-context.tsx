"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the authentication context type
interface AuthContextType {
  isAuthenticated: boolean;
  userName: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple admin credentials (in a real app, these would be stored securely)
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        setIsAuthenticated(true);
        setUserName(authData.email);
      } catch (error) {
        console.error('Error parsing auth data:', error);
        localStorage.removeItem('auth');
      }
    }
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple authentication check
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setUserName(email);
      
      // Store auth state in localStorage
      localStorage.setItem('auth', JSON.stringify({ email }));
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUserName(null);
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
