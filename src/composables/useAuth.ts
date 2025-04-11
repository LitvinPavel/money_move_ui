import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '@/api';
import catchHandler from "@/utils/catch-handler";
import type { IUserCreate, IUser } from '@/models/auth';
import { useError } from '@/composables/useError';


export function useAuth() {

  const router = useRouter();
  const { showError } = useError();
  const user = ref<IUser | null>(null)
  const error = ref<string | null>(null);
  const loading = ref(false);

  const register = async (data: IUserCreate) => {
    loading.value = true;
    error.value = null;

    try {
      await api.post<IUser>('/auth/register', data);
      router.push({ name: 'SignInPage' });
    } catch (err) {
      showError(catchHandler(err, "Ошибка регистрации"));
    } finally {
      loading.value = false;
    }
  };


  const login = async (credentials: { email: string, password: string }) => {
    try {
      const response = await api.post<IUser>('/auth/login', credentials);
      console.log(response)
      // router.push({ name: 'WalletPage' });
    } catch (err) {
      showError(catchHandler(err, "Ошибка авторизации"));
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      router.push({ name: 'SignInPage' });
    } catch (err) {
      showError(catchHandler(err, "Ошибка выхода из приложения"));
    } finally {
      loading.value = false;
    }
    
  };

  const userProfile = async () => {
    try {
      const response = await api.get<IUser>('/auth/me');
      user.value = response.data
    } catch (err) {
      showError(catchHandler(err, "Ошибка получения данных пользователя"));
    } finally {
      loading.value = false;
    }
    
  };


  return { login, register, userProfile, logout, user, loading };
}