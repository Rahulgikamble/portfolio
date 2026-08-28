import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// attach admin JWT (if logged in) to every request automatically
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem('adminInfo');
  if (stored) {
    const { token } = JSON.parse(stored);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
