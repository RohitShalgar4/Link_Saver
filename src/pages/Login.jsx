import React, { useState, useEffect } from 'react';
import { BookmarkIcon, LoaderIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, user } = useAuth();
  // Force re-render on theme change
  const [, setThemeVersion] = useState(0);

  useEffect(() => {
    if (user) {
      window.location.href = '/dashboard';
    }
  }, [user]);

  // Listen for dark mode changes and force re-render
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setThemeVersion(v => v + 1);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const result = await login(email, password);
    if (result.success) {
      window.location.href = '/dashboard';
    } else {
      setError(result.error || 'Login failed');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-2 sm:px-4">
      <div className="max-w-xs sm:max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-8 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-6 sm:mb-8">
            <BookmarkIcon className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1 sm:mt-2 text-sm sm:text-base">Sign in to your Link Saver account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 sm:mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors text-xs sm:text-base bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 sm:mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors text-xs sm:text-base bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                required
                disabled={isLoading}
              />
            </div>
            {error && (
              <div className="text-red-600 text-xs sm:text-sm bg-red-50 dark:bg-gray-900 p-2 sm:p-3 rounded-lg">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 text-xs sm:text-base"
            >
              {isLoading ? (
                <>
                  <LoaderIcon className="h-4 w-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>
          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
              Don't have an account?{' '}
              <button
                onClick={() => window.location.href = '/register'}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};