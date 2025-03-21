import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { api, isAxiosError } from '@/api';

interface LoginData {
  username: string;
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
  const isAuthChecked = ref<boolean>(false);

  const checkAuth = async () => {
    if (isAuthChecked.value) {
      return true;
    }

    if (token.value) {
      try {
        const response = await api.get('/check-auth', {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
        user.value = response.data.user
        isAuthChecked.value = true;
        return true;
      } catch (err) {
        logout();
        return false;
      }
    }
    return false;
  };

  const login = async (credentials: LoginData) => {
    try {
      const response = await api.post<AuthResponse>('/login', credentials);
      token.value = response.data.accessToken;

      localStorage.setItem(TOKEN_KEY, response.data.accessToken);
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
      await api.post('/logout');
      token.value = null;
      localStorage.removeItem(TOKEN_KEY);
      router.push({ name: 'LoginPage' });
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

  return { login, logout, checkAuth, token, user, error, loading };
}