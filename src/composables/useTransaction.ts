import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
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
  IGroupedTransactions,
  IBalanceSummary,
  IBalanceQueryParams,
} from "@/models/transaction";
import { useError } from "@/composables/useError";
import { TransactionTypeEnum } from "@/models/transaction";
import { useBalanceSummaryStore } from "@/stores/balance-summary";

export function useTransaction() {
  const { showError } = useError();
  const balanceStore = useBalanceSummaryStore();
  const router = useRouter();
  const error = ref<string | null>(null);
  const loading = ref(false);
  const transactions = ref<ITransaction[]>([]);
  const balanceSummary = ref<IBalanceSummary | null>(null);
  const selectTransactionType = ref<TransactionTypeEnum>(
    TransactionTypeEnum.transfer
  );
  const defaultCreateData: Partial<IDeposit & IWithdrawal & ITransfer> = {
    amount: 0,
    date: new Date().toISOString(),
    is_debt: false,
  };

  const transactionTypeList = [
    { id: TransactionTypeEnum.deposit, title: "Зачисление" },
    { id: TransactionTypeEnum.withdrawal, title: "Снятие" },
    { id: TransactionTypeEnum.transfer, title: "Между счетами" },
  ];
  const formCreateData =
    ref<Partial<IDeposit & IWithdrawal & ITransfer>>(defaultCreateData);
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

  const getBalanceSummary = async (
    params?: IBalanceQueryParams
  ): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.get<IBalanceSummary>("transactions/balance", {
        params,
      });
      balanceSummary.value = response.data || null;
    } catch (err) {
      showError(catchHandler(err, "Ошибка получения баланса за период"));
    } finally {
      loading.value = false;
    }
  };

  const createDeposit = async (params: IDeposit): Promise<void> => {
    try {
      const response = await api.post<ITransaction>(
        "/transactions/deposit",
        params
      );
      if (response.data) transactions.value.push(response.data);
      refreshAfteerCreate();
    } catch (err) {
      showError(catchHandler(err, "Ошибка выполнения транзакции"));
    } finally {
      loading.value = false;
    }
  };

  const createWithdrawal = async (params: IWithdrawal): Promise<void> => {
    try {
      const response = await api.post<ITransaction>(
        "/transactions/withdrawal",
        params
      );
      if (response.data) transactions.value.push(response.data);
      refreshAfteerCreate();
    } catch (err) {
      showError(catchHandler(err, "Ошибка выполнения транзакции"));
    } finally {
      loading.value = false;
    }
  };

  const createTransfer = async (params: ITransfer): Promise<void> => {
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
      refreshAfteerCreate();
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

  function refreshAfteerCreate() {
    balanceStore.updateBalanceSummary();
    router.push({ name: "HistoryPage" });
  }

  function groupTransactionsByDay(
    transactions: ITransaction[]
  ): IGroupedTransactions {
    const grouped: IGroupedTransactions = {};

    transactions.forEach((transaction) => {
      const date = (transaction.date as unknown as string).split("T")[0];

      if (!grouped[date]) {
        grouped[date] = [];
      }

      grouped[date].push(transaction);
    });

    for (const date in grouped) {
      grouped[date].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    return grouped;
  }

  return {
    loading,
    transactions,
    transactionTypeList,
    selectTransactionType,
    formCreateData,
    balanceSummary,
    getTransactions,
    getBalanceSummary,
    refresh,
    createDeposit,
    createWithdrawal,
    createTransfer,
    updateTransaction,
    deleteTransaction,
    groupTransactionsByDay,
  };
}
