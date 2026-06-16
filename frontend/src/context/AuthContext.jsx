import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('derma_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password, role) => {
    // Mock login logic
    const userData = {
      id: role === 'doctor' ? 'DOC001' : 'PAT001',
      name: role === 'doctor' ? 'Dr. Sarah Wilson' : 'John Doe',
      email: email,
      role: role, // 'patient' or 'doctor'
    };
    setUser(userData);
    localStorage.setItem('derma_user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('derma_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
