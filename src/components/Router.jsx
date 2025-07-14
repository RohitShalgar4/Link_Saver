import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Dashboard } from '../pages/Dashboard';
import { LoadingSpinner } from './LoadingSpinner';

export const Router = () => {
  const { user, isLoading } = useAuth();
  const [currentPath, setCurrentPath] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Auto-redirect based on auth state
  if (user && (currentPath === '/login' || currentPath === '/register' || currentPath === '/')) {
    window.history.replaceState(null, '', '/dashboard');
    return <Dashboard />;
  }

  if (!user && currentPath === '/dashboard') {
    window.history.replaceState(null, '', '/login');
    return <Login />;
  }

  switch (currentPath) {
    case '/register':
      return <Register />;
    case '/dashboard':
      return <Dashboard />;
    case '/login':
    case '/':
    default:
      return <Login />;
  }
};