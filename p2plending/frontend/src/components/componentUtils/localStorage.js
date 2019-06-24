
const SESSIONS_KEY = "sessions";
const CSRF_KEY = "csrf_key";

export const setAuthKey = key => {
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(key));
};

export const getAuthKey = () => {
  return JSON.parse(localStorage.getItem(SESSIONS_KEY)) || null;
};

export const setCSRFToken = key => {
  localStorage.setItem(CSRF_KEY, JSON.stringify(key));
};

export const getCSRFToken = () => {
  return JSON.parse(localStorage.getItem(CSRF_KEY)) || null;
};
