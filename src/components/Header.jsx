import React, { useState, useEffect } from 'react';
import { BookmarkIcon, LogOutIcon, UserIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { idbGet, idbSet } from '../utils/idb';

const THEME_KEY = 'theme';

export const Header = () => {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const storedTheme = await idbGet(THEME_KEY);
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
        setDarkMode(true);
        document.documentElement.classList.add('dark');
      } else {
        setDarkMode(false);
        document.documentElement.classList.remove('dark');
      }
      setThemeLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!themeLoaded) return;
    (async () => {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        await idbSet(THEME_KEY, 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        await idbSet(THEME_KEY, 'light');
      }
    })();
  }, [darkMode, themeLoaded]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-14 sm:h-16 w-full">
          {/* Left: Title */}
          <div className="flex items-center space-x-2 group cursor-pointer hover:text-blue-700 transition-colors">
            <BookmarkIcon className="h-7 w-7 sm:h-8 sm:w-8 text-blue-600 group-hover:text-blue-800 transition-colors" />
            <span className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-blue-800 transition-colors">Link Saver</span>
          </div>
          {/* Center: (empty for spacing on mobile) */}
          <div className="flex-1 flex justify-center sm:hidden" />
          {/* Right: Dark mode toggle, User icon and Logout */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center justify-center p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5 text-yellow-500" />
              ) : (
                <MoonIcon className="h-5 w-5 text-gray-700" />
              )}
            </button>
          {user && (
              <>
                {/* Mobile: user icon and logout button side by side */}
                <div className="flex items-center sm:hidden">
                  <UserIcon className="h-5 w-5 text-gray-700 mr-2 hover:text-blue-700 transition-colors" />
                  <button
                    onClick={logout}
                    className="flex items-center space-x-1 text-white bg-red-500 hover:bg-red-600 transition-colors text-xs font-semibold px-2 py-1 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                    title="Logout"
                  >
                    <LogOutIcon className="h-4 w-4" />
                  </button>
                </div>
                {/* Desktop: user icon, name, and logout button */}
                <div className="hidden sm:flex items-center space-x-2 text-gray-700 dark:text-gray-200">
                  <UserIcon className="h-4 w-4 hover:text-blue-700 transition-colors" />
                  <span className="text-xs sm:text-sm font-medium group-hover:text-blue-700 transition-colors">{user.name}</span>
              </div>
              <button
                onClick={logout}
                  className="hidden sm:flex items-center space-x-1 text-white bg-red-500 hover:bg-red-600 transition-colors text-xs sm:text-sm font-semibold px-3 py-1.5 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  title="Logout"
              >
                <LogOutIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
              </button>
              </>
            )}
            </div>
        </div>
      </div>
    </header>
  );
};