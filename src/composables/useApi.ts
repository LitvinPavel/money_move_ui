import { ref } from 'vue';
import { api, isAxiosError } from '@/api';

export function useApi() {
  const data = ref(null);
  const error = ref<string | null>(null);
  const loading = ref(false);

  const fetchData = async (url: string) => {
    error.value = null;
    loading.value = true;
    try {
      const response = await api.get(url);
      data.value = response.data;
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

  return { data, error, loading, fetchData };
}