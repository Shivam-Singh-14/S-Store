import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import toast from 'react-hot-toast';

function ClearLocalStorage() {
  const { user } = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    const handleLogout = () => {
      console.log('ClearLocalStorage: Detected logout, before clearing localStorage:', { ...localStorage });
      localStorage.clear();
      console.log('ClearLocalStorage: localStorage cleared, after clearing:', { ...localStorage });
      toast.success('Logged out successfully, all local data cleared!');
    };

    // Listen for userLogout event from UserContext
    window.addEventListener('userLogout', handleLogout);

    return () => {
      window.removeEventListener('userLogout', handleLogout);
    };
  }, []);

  // Clear localStorage on route change if no user is logged in
  useEffect(() => {
    if (!user) {
      console.log(`ClearLocalStorage: Navigated to ${location.pathname}, no user, ensuring localStorage is clear`);
      if (localStorage.length > 0) {
        console.log('ClearLocalStorage: Found residual keys, clearing:', { ...localStorage });
        localStorage.clear();
        console.log('ClearLocalStorage: localStorage cleared on navigation');
      }
    }
  }, [location, user]);

  return null; // No UI, just logic
}

export default ClearLocalStorage;