import React, { createContext, useState, useEffect } from 'react';

// Utility function to get current user from local storage
const getCurrentUser = () => {
  const userData = localStorage.getItem('currentUser');
  const user = userData ? JSON.parse(userData) : null;
  if (user && !user.userId) {
    user.userId = user.email || user.username || 'default-user';
  }
  return user;
};

// Create and export UserContext
export const UserContext = createContext({
  user: null,
  setUser: () => {},
  logout: () => {},
});

// Export UserProvider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getCurrentUser());

  // Sync user state with local storage on mount
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const logout = () => {
    // Clear all user-related data from localStorage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('users');
    
    // Clear user-specific data
    if (user?.userId) {
      localStorage.removeItem(`cart_${user.userId}`);
      localStorage.removeItem(`wishlist_${user.userId}`);
      localStorage.removeItem(`compareList_${user.userId}`);
    }
    
    // Clear any other user-related data
    localStorage.removeItem('compareList');
    
    // Reset user state
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};