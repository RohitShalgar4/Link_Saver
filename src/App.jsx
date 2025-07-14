import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { Router } from './components/Router';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
    <AuthProvider>
      <Router />
    </AuthProvider>
    </div>
  );
}

export default App;