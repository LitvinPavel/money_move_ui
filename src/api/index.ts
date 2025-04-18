import axios, { AxiosError, isAxiosError } from 'axios';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useAuth } from '@/composables/useAuth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { getAccessToken } = useAuth();
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    
    // Проверяем, что это не запрос на обновление токена и нет флага _retry
    if (error.response?.status === 401 && 
        originalRequest?.url !== '/auth/refresh' && 
        !originalRequest?._retry) {
      const { refreshTokens, clearTokens, getAccessToken } = useAuth();
      try {
        // Помечаем запрос как повторный
        if (originalRequest) {
          originalRequest._retry = true;
        }

        
        const success = await refreshTokens();
        
        if (success && originalRequest) {
          const token = getAccessToken();
          if (token) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
      }
      clearTokens();
      // Перенаправляем на страницу входа при неудаче
      window.location.href = '/sign-in';
    }

    return Promise.reject(error);
  }
);

export { api, isAxiosError };