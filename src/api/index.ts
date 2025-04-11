import axios , { isAxiosError } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.data.error === 'Refresh token required') {
      window.location.href = '/sign-in';
      return Promise.reject(error.response.data.error);
    }
    
    if (error.response?.status === 401) {
      try {
        // Пытаемся обновить токены
        await api.post('/auth/refresh');
        
        // Повторяем оригинальный запрос
        return api(originalRequest);
      } catch (refreshError) {
        // Очищаем куки и перенаправляем на логин
        console.log("refreshError")
        window.location.href = '/sign-in';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export {
    api,
    isAxiosError
};