import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { api, isAxiosError } from '@/api';

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
}

const TOKEN_KEY = 'money_move_access_token';

export function useAuth() {
  const router = useRouter();
  const token = ref<string | null>(localStorage.getItem(TOKEN_KEY) || null);
  const user = ref(null)
  const error = ref<string | null>(null);
  const loading = ref(false);

  const register = async (data: LoginData) => {
    loading.value = true;
    error.value = null;

    try {
      await api.post<AuthResponse>('/auth/register', data);
      router.push({ name: 'SignInPage' });
    } catch (err) {
      if (isAxiosError(err)) {
        error.value = err.response?.data.message || 'Ошибка регистрации';
      } else {
        error.value = 'Неизвестная ошибка';
      }
    } finally {
      loading.value = false;
    }
  };


  const login = async (credentials: LoginData) => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials, {
        withCredentials: true
      });
      token.value = response.data.accessToken;

      router.push({ name: 'HomePage' });
    } catch (err) {
      if (isAxiosError(err)) {
        error.value = err.response?.data.message || 'Ошибка авторизации';
      } else {
        error.value = 'Неизвестная ошибка';
      }
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      token.value = null;
      localStorage.removeItem(TOKEN_KEY);
      router.push({ name: 'SignInPage' });
    } catch (err) {
      if (isAxiosError(err)) {
        error.value = err.response?.data.message || 'Ошибка авторизации';
      } else {
        error.value = 'Неизвестная ошибка';
      }
    } finally {
      loading.value = false;
    }
    
  };

  const userProfile = async () => {
    try {
      const response = await api.get('/auth/me');
      user.value = response.data?.user
    } catch (err) {
      if (isAxiosError(err)) {
        error.value = err.response?.data.message || 'Ошибка авторизации';
      } else {
        error.value = 'Неизвестная ошибка';
      }
    } finally {
      loading.value = false;
    }
    
  };

  const fetchAccounts = async () => {
    try {
      const response = await api.post('/accounts', {
        "currency": "USD",
        "initialBalance": 1000,
        "bank_name": "tinkoff",
        "account_name": "Продуктовый"
      });
      console.log(response.data)
    } catch (err) {
      if (isAxiosError(err)) {
        error.value = err.response?.data.message || 'Ошибка авторизации';
      } else {
        error.value = 'Неизвестная ошибка';
      }
    } finally {
      loading.value = false;
    }
    
  };

  return { login, register, userProfile, fetchAccounts, logout, token, user, error, loading };
}