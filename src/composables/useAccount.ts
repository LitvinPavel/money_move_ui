import { ref, onMounted } from "vue";
import { api } from "@/api";
import catchHandler from "@/utils/catch-handler";

export type AccountType = "deposit" | "savings" | "investment" | "credit";
enum AccountTypeEnum {
    deposit = 'deposit',
    savings = 'savings',
    investment = 'investment',
    credit = 'credit'
  }

interface IGetAccountsQuery {
  type?: string;
  bank_name?: string;
}

interface IGetTotalBalanceQuery {
  groupBy?: "bank_name" | "type";
}

export interface ICreateAccountBody {
  currency: string;
  initialBalance?: number;
  account_name: string;
  bank_name: string;
  type: AccountTypeEnum;
  plan?: number;
  interest_rate?: number | null;
}

export interface IUpdateAccountBody {
  currency?: string;
  balance?: number;
  account_name?: string;
  bank_name?: string;
  type?: AccountTypeEnum;
  plan?: number;
  interest_rate?: number | null;
}

interface IAccount {
  id: number;
  account_number: string;
  balance: string;
  currency: string;
  account_name: string;
  bank_name: string;
  type: AccountTypeEnum;
  plan: string;
  interest_rate: string | null;
  created_at: Date;
}

interface ITotalBalance {
  [key: string]: number;
}

export function useAccount() {
  const error = ref<string | null>(null);
  const loading = ref(false);
  const accounts = ref<IAccount[]>([]);
  const totalBalance = ref<ITotalBalance | undefined>(undefined);
  const defaultCreateData: Required<ICreateAccountBody> = {
    currency: 'RUB',
    initialBalance: 0,
    account_name: '',
    bank_name: '',
    type: AccountTypeEnum.deposit,
    plan: 0,
    interest_rate: null
  }
  const formCreateData = ref<Required<ICreateAccountBody>>(defaultCreateData);
  
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
      catchHandler(err, "Ошибка получения аккаунтов");
    } finally {
      loading.value = false;
    }
  };

  const getTotalBalance = async (
    params?: IGetTotalBalanceQuery
  ): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.get<ITotalBalance>("/accounts/balance", {
        params,
      });
      totalBalance.value = response.data;
    } catch (err) {
      catchHandler(err, "Ошибка получения общей суммы");
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
      catchHandler(err, "Ошибка создания аккаунта");
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
      catchHandler(err, "Ошибка обновления аккаунта");
    } finally {
      loading.value = false;
    }
  };

  const deleteAccount = async (id: number): Promise<void> => {
    try {
      await api.delete(`/accounts/${id}`);
      doDelete(id);
    } catch (err) {
      catchHandler(err, "Ошибка удаления аккаунта");
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
    error,
    loading,
    accounts,
    totalBalance,
    formCreateData,
    defaultCreateData,
    refresh,
    getTotalBalance,
    createAccount,
    updateAccount,
    deleteAccount,
  };
}
