import axios , { isAxiosError } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

function getCookie(name: string) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const refreshToken = getCookie('refreshToken');
    if (error.response?.status === 401 && 
      refreshToken) {
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