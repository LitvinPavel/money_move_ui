import { ref } from "vue";
import { api } from "@/api";
import catchHandler from "@/utils/catch-handler";
import type {
  IGetTotalBalanceQuery,
  ITotalBalance
} from '@/models/account';

export function useBalance() {
  const loading = ref(false);
  const totalBalance = ref<ITotalBalance | undefined>(undefined);

  const getTotalBalance = async (
    params?: IGetTotalBalanceQuery
  ): Promise<void> => {
    loading.value = true;

    try {
      const response = await api.get<ITotalBalance>("/accounts/balance", {
        params,
      });
      totalBalance.value = response.data;
    } catch (err) {
      console.error(catchHandler(err, "Ошибка получения общей суммы"))
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    totalBalance,
    getTotalBalance
  };
}
