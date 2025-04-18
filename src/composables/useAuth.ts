import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '@/api';
import catchHandler from "@/utils/catch-handler";
import type { IUserCreate, IUser, IAuthResponse } from '@/models/auth';
import { useError } from '@/composables/useError';

export function useAuth() {
  const router = useRouter();
  const { showError } = useError();
  const user = ref<IUser | null>(null);
  const error = ref<string | null>(null);
  const loading = ref(false);

  // Сохраняем токены в localStorage
  const setTokens = (tokens: { accessToken: string; refreshToken: string }) => {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  };

  // Удаляем токены
  const clearTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  // Получаем accessToken
  const getAccessToken = (): string | null => {
    return localStorage.getItem('accessToken');
  };

  // Получаем refreshToken
  const getRefreshToken = (): string | null => {
    return localStorage.getItem('refreshToken');
  };

  const register = async (data: IUserCreate) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.post<IAuthResponse>('/auth/register', data);
      setTokens(response.data.tokens);
      router.push({ name: 'SignInPage' });
    } catch (err) {
      showError(catchHandler(err, "Ошибка регистрации"));
    } finally {
      loading.value = false;
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.post<IAuthResponse>('/auth/login', credentials);
      setTokens(response.data.tokens);
      await userProfile(); // Загружаем данные пользователя
      router.push({ name: 'WalletPage' });
    } catch (err) {
      showError(catchHandler(err, "Ошибка авторизации"));
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    loading.value = true;
    try {
      await api.post('/auth/logout');
      clearTokens();
      user.value = null;
      router.push({ name: 'SignInPage' });
    } catch (err) {
      showError(catchHandler(err, "Ошибка выхода из приложения"));
    } finally {
      loading.value = false;
    }
  };

  const userProfile = async () => {
    loading.value = true;
    try {
      const response = await api.get<IUser>('/auth/me');
      user.value = response.data;
      return user.value;
    } catch (err) {
      showError(catchHandler(err, "Ошибка получения данных пользователя"));
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const refreshTokens = async (): Promise<boolean> => {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) throw new Error('No refresh token');
      
      const response = await api.post<IAuthResponse>(
        '/auth/refresh', 
        { refreshToken },
        { _retry: true }
      );
      
      setTokens(response.data.tokens);
      return true;
    } catch (err) {
      clearTokens();
      return false;
    }
  };

  return { 
    login, 
    register, 
    userProfile, 
    logout, 
    getAccessToken,
    refreshTokens,
    clearTokens,
    user, 
    loading, 
    error 
  };
}