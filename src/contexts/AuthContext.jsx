import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuthData, saveAuthData, clearAuthData, generateToken, validateToken } from '../utils/auth';
import { idbGet, idbSet } from '../utils/idb';
import bcrypt from 'bcryptjs';

const USERS_KEY = 'link_saver_users';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    token: null,
    isLoading: true
  });

  useEffect(() => {
    (async () => {
      const authData = await getAuthData();
      if (authData && validateToken(authData.token)) {
        setAuthState({
          user: authData.user,
          token: authData.token,
          isLoading: false
        });
      } else {
        await clearAuthData();
        setAuthState({
          user: null,
          token: null,
          isLoading: false
        });
      }
    })();
  }, []);

  const login = async (email, password) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const usersStr = await idbGet(USERS_KEY);
      const users = JSON.parse(usersStr || '[]');
      const user = users.find((u) => u.email === email);
      if (!user) {
        return { success: false, error: 'User not found' };
      }
      // Compare hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return { success: false, error: 'Invalid password' };
      }
      const token = generateToken(user);
      await saveAuthData(user, token);
      setAuthState({
        user,
        token,
        isLoading: false
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const register = async (name, email, password) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const usersStr = await idbGet(USERS_KEY);
      const users = JSON.parse(usersStr || '[]');
      if (users.some((u) => u.email === email)) {
        return { success: false, error: 'User already exists' };
      }
      // Hash the password before storing
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        createdAt: new Date().toISOString(),
        password: hashedPassword
      };
      users.push(newUser);
      await idbSet(USERS_KEY, JSON.stringify(users));
      const token = generateToken(newUser);
      await saveAuthData(newUser, token);
      setAuthState({
        user: newUser,
        token,
        isLoading: false
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };

  const logout = async () => {
    await clearAuthData();
    setAuthState({
      user: null,
      token: null,
      isLoading: false
    });
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};