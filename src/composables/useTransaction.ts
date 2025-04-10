import { ref, onMounted } from "vue";
import { api } from "@/api";
import catchHandler from "@/utils/catch-handler";
import type {
  ITransactionOptions,
  ITransactionPagination,
  IUpdateTransactionBody,
  IDeposit,
  IWithdrawal,
  ITransfer,
  ITransaction,
  IGroupedTransactions
} from "@/models/transaction";
import { useError } from "@/composables/useError";

export function useTransaction() {
  const { showError } = useError();
  const error = ref<string | null>(null);
  const loading = ref(false);
  const transactions = ref<ITransaction[]>([]);

  onMounted(() => {
    getTransactions();
  });

  const getTransactions = async (
    params?: ITransactionOptions
  ): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.get<{
        transactions: ITransaction[];
        pagination: ITransactionPagination;
      }>("transactions/history", {
        params,
      });
      transactions.value = response.data.transactions || [];
    } catch (err) {
      showError(catchHandler(err, "Ошибка получения истории транзакций"));
    } finally {
      loading.value = false;
    }
  };

  const createDeposit = async (
    params: IDeposit,
    _callback: () => void
  ): Promise<void> => {
    try {
      const response = await api.post<ITransaction>(
        "/transactions/deposit",
        params
      );
      if (response.data) transactions.value.push(response.data);
      _callback();
    } catch (err) {
      showError(catchHandler(err, "Ошибка выполнения транзакции"));
    } finally {
      loading.value = false;
    }
  };

  const createWithdrawal = async (
    params: IWithdrawal,
    _callback: () => void
  ): Promise<void> => {
    try {
      const response = await api.post<ITransaction>(
        "/transactions/withdrawal",
        params
      );
      if (response.data) transactions.value.push(response.data);
      _callback();
    } catch (err) {
      showError(catchHandler(err, "Ошибка выполнения транзакции"));
    } finally {
      loading.value = false;
    }
  };

  const createTransfer = async (
    params: ITransfer,
    _callback: () => void
  ): Promise<void> => {
    try {
      const response = await api.post<{
        outTransaction: ITransaction;
        inTransaction: ITransaction;
      }>("/transactions/transfer", params);
      const { outTransaction, inTransaction } = response.data;
      if (outTransaction && inTransaction) {
        transactions.value.push({ ...outTransaction });
        transactions.value.push({ ...inTransaction });
      }
      _callback();
    } catch (err) {
      showError(catchHandler(err, "Ошибка выполнения транзакции"));
    } finally {
      loading.value = false;
    }
  };

  const updateTransaction = async (
    id: number,
    params: IUpdateTransactionBody
  ): Promise<void> => {
    try {
      const response = await api.put<ITransaction>(
        `/transactions/${id}`,
        params
      );
      if (response.data) doUpdate(response.data);
    } catch (err) {
      showError(catchHandler(err, "Ошибка обновления транзакции"));
    } finally {
      loading.value = false;
    }
  };

  const deleteTransaction = async (id: number): Promise<void> => {
    try {
      await api.delete(`/transactions/${id}`);
      doDelete(id);
    } catch (err) {
      showError(catchHandler(err, "Ошибка удаления транзакции"));
    } finally {
      loading.value = false;
    }
  };

  function doUpdate(data: ITransaction): void {
    const accountIndex = transactions.value.findIndex(
      (item) => item.id === data.id
    );
    if (accountIndex !== -1) {
      transactions.value[accountIndex] = data;
    }
  }

  function doDelete(id: number): void {
    const accountIndex = transactions.value.findIndex((item) => item.id === id);
    if (accountIndex !== -1) {
      transactions.value.splice(accountIndex, 1);
    }
  }

  function refresh() {
    getTransactions();
  }

  function groupTransactionsByDay(transactions: ITransaction[]): IGroupedTransactions {
    const grouped: IGroupedTransactions = {};
  
    transactions.forEach((transaction) => {
      const date = (transaction.created_at as unknown as string).split('T')[0];
      
      if (!grouped[date]) {
        grouped[date] = [];
      }
      
      grouped[date].push(transaction);
    });
  
    for (const date in grouped) {
      grouped[date].sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
  
    return grouped;
  }

  return {
    loading,
    transactions,
    getTransactions,
    refresh,
    createDeposit,
    createWithdrawal,
    createTransfer,
    updateTransaction,
    deleteTransaction,
    groupTransactionsByDay
  };
}
