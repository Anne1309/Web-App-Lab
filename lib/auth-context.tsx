'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from './types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role: 'user' | 'admin') => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'createdAt' | 'role'> & { password: string }) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@lifeflow.com',
    password: 'admin123',
    phone: '1234567890',
    bloodType: 'O+',
    role: 'admin',
    address: '123 Admin Street',
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'user@lifeflow.com',
    password: 'user123',
    phone: '0987654321',
    bloodType: 'A+',
    role: 'user',
    address: '456 User Lane',
    createdAt: new Date(),
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('bloodbank_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'user' | 'admin'): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundUser = mockUsers.find(
      u => u.email === email && u.password === password && u.role === role
    );
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('bloodbank_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = async (userData: Omit<User, 'id' | 'createdAt' | 'role'> & { password: string }): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      role: 'user',
      createdAt: new Date(),
    };
    
    setUser(newUser);
    localStorage.setItem('bloodbank_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bloodbank_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
