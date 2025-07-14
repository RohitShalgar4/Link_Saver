import { idbGet, idbSet, idbRemove } from './idb';
import Cookies from 'js-cookie';

export const AUTH_TOKEN_KEY = 'link_saver_token';
export const USER_KEY = 'link_saver_user';

export const saveAuthData = async (user, token) => {
  Cookies.set(AUTH_TOKEN_KEY, token, { expires: 7, sameSite: 'strict' });
  await idbSet(USER_KEY, JSON.stringify(user));
};

export const getAuthData = async () => {
  const token = Cookies.get(AUTH_TOKEN_KEY);
  const userStr = await idbGet(USER_KEY);
  if (!token || !userStr) return null;
  try {
    const user = JSON.parse(userStr);
    return { user, token };
  } catch {
    return null;
  }
};

export const clearAuthData = async () => {
  Cookies.remove(AUTH_TOKEN_KEY);
  await idbRemove(USER_KEY);
};

export const generateToken = (user) => {
  // Simulate JWT token generation
  return btoa(JSON.stringify({ userId: user.id, exp: Date.now() + 24 * 60 * 60 * 1000 }));
};

export const validateToken = (token) => {
  try {
    const decoded = JSON.parse(atob(token));
    return decoded.exp > Date.now();
  } catch {
    return false;
  }
};