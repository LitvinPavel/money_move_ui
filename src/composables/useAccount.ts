import { ref, onMounted } from "vue";
import { api } from "@/api";
import catchHandler from "@/utils/catch-handler";
import type {
  IGetAccountsQuery,
  ICreateAccountBody,
  IUpdateAccountBody,
  IAccount
} from '@/models/account';

import { AccountTypeEnum } from '@/models/account';
import { useError } from '@/composables/useError';

export function useAccount() {
  const { showError } = useError();
  const error = ref<string | null>(null);
  const loading = ref(false);
  const accounts = ref<IAccount[]>([]);
  const defaultCreateData: Partial<ICreateAccountBody> = {
    currency: 'RUB',
    initialBalance: 0,
    account_name: '',
    bank_bic: undefined,
    type: AccountTypeEnum.deposit,
    plan: 0,
    interest_rate: null
  }
  const formCreateData = ref<Partial<ICreateAccountBody>>(defaultCreateData);
  
  onMounted(() => {
    getAccounts();
  })

  const getAccounts = async (params?: IGetAccountsQuery): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.get<IAccount[]>("/accounts", { params });
      accounts.value = response.data || [];
    } catch (err) {
      showError(catchHandler(err, "Ошибка получения аккаунтов"));
    } finally {
      loading.value = false;
    }
  };

  const createAccount = async (_callback: () => void): Promise<void> => {
    try {
      const response = await api.post<IAccount>("/accounts", formCreateData.value);
      if (response.data) accounts.value.push(response.data);
      _callback();
    } catch (err) {
      showError(catchHandler(err, "Ошибка создания аккаунта"));
    } finally {
      loading.value = false;
    }
  };

  const updateAccount = async (
    id: number,
    credentials: IUpdateAccountBody
  ): Promise<void> => {
    try {
      const response = await api.put<IAccount>(`/accounts/${id}`, credentials);
      if (response.data) doUpdate(response.data);
    } catch (err) {
      showError(catchHandler(err, "Ошибка обновления аккаунта"));
    } finally {
      loading.value = false;
    }
  };

  const deleteAccount = async (id: number): Promise<void> => {
    try {
      await api.delete(`/accounts/${id}`);
      doDelete(id);
    } catch (err) {
      showError(catchHandler(err, "Ошибка удаления аккаунта"));
    } finally {
      loading.value = false;
    }
  };

  function doUpdate(data: IAccount): void {
    const accountIndex = accounts.value.findIndex(
      (item) => item.id === data.id
    );
    if (accountIndex !== -1) {
      accounts.value[accountIndex] = data;
    }
  }

  function doDelete(id: number): void {
    const accountIndex = accounts.value.findIndex((item) => item.id === id);
    if (accountIndex !== -1) {
      accounts.value.splice(accountIndex, 1);
    }
  }

  function refresh() {
    getAccounts();
    formCreateData.value = defaultCreateData;
  }

  return {
    loading,
    accounts,
    formCreateData,
    defaultCreateData,
    refresh,
    createAccount,
    updateAccount,
    deleteAccount,
  };
}
