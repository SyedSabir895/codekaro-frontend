import axios from "axios";

// Express backend (backend/server.js)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://codekaro-backend-6yb4.onrender.com/api",
});

// Send the app's JWT with every backend request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Store what the backend returns after register/login/Google login
export const saveSession = ({ user, token }) => {
  localStorage.setItem("token", token);
  localStorage.setItem("userName", user.fullName);
};

export const clearSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("userName");
};

// True while a stored JWT exists and has not expired
export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const { exp } = JSON.parse(atob(base64));
    return !exp || exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export default api;
