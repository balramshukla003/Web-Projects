import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Register new user
  const register = async (userData) => {
    try {
      // Get existing users
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if email already exists
      if (existingUsers.some(u => u.email === userData.email)) {
        throw new Error('Email already registered');
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString(),
        orders: []
      };

      // Save to users array
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      // Set as current user (without password)
      const { password, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));

      console.log('✅ User Registration Successful:', {
        userId: newUser.id,
        email: newUser.email,
        name: newUser.name,
        timestamp: new Date().toISOString()
      });

      return { success: true, user: userWithoutPassword };
    } catch (error) {
      console.error('❌ Registration Error:', error.message);
      return { success: false, error: error.message };
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      // Get existing users
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Find user by email and password
      const foundUser = existingUsers.find(
        u => u.email === email && u.password === password
      );

      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      // Set as current user (without password)
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));

      console.log('✅ User Login Successful:', {
        userId: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        timestamp: new Date().toISOString()
      });

      return { success: true, user: userWithoutPassword };
    } catch (error) {
      console.error('❌ Login Error:', error.message);
      return { success: false, error: error.message };
    }
  };

  // Logout user
  const logout = () => {
    console.log('🔓 User Logout:', {
      userId: user?.id,
      email: user?.email,
      timestamp: new Date().toISOString()
    });
    
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  // Update user profile
  const updateProfile = async (updates) => {
    try {
      const updatedUser = { ...user, ...updates };
      
      // Update in users array
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = existingUsers.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        existingUsers[userIndex] = { ...existingUsers[userIndex], ...updates };
        localStorage.setItem('users', JSON.stringify(existingUsers));
      }

      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      console.log('✅ Profile Updated:', {
        userId: user.id,
        updates,
        timestamp: new Date().toISOString()
      });

      return { success: true };
    } catch (error) {
      console.error('❌ Profile Update Error:', error.message);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    register,
    login,
    logout,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
