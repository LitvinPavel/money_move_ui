export enum TransactionTypeEnum {
  deposit = "deposit",
  withdrawal = "withdrawal",
  transfer = "transfer",
}

export enum TransactionTypeInputEnum {
  deposit = "deposit",
  withdrawal = "withdrawal",
  transfer_out = "transfer_out"
}

export type TransactionType = "deposit" | "withdrawal" | "transfer_out" | "transfer_in";

export interface ITransaction {
  id: number;
  amount: number;
  type: TransactionType;
  status: string;
  description?: string;
  created_at: Date;
  updated_at?: Date;
  is_debt?: boolean;
  bank_name?: string;
  account_name: string;
  related_account_name?: string;
  related_bank_name?: string;
  date: Date | string;
}

export interface IDeposit {
  accountId: number;
  amount: number;
  date?: Date | string;
  description?: string;
  is_debt?: boolean;
}

export interface IWithdrawal {
  accountId: number;
  amount: number;
  date?: Date | string;
  description?: string;
  is_debt?: boolean;
}

export interface ITransfer {
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  date?: Date | string;
  description?: string;
  is_debt?: boolean;
}

export interface IUpdateTransactionBody {
    description?: string;
    status?: string;
    is_debt?: boolean;
    date?: Date | string;
}

export interface ITransactionOptions {
  accountId?: number;
  cursor?: string | number;
  limit?: number;
  typeFilter?: TransactionType;
  startDate?: string;
  endDate?: string;
  date?: string;
  sortField?: string;
  sortDirection?: "ASC" | "DESC";
}

export interface ITransactionPagination {
  nextCursor: string | number | null;
  hasMore: boolean;
  limit: number;
  sortField: string;
  sortDirection: "ASC" | "DESC";
}

export interface IGroupedTransactions {
  [date: string]: ITransaction[];
}

export interface IBalanceSummary {
  totalBalance: number;
  totalDebt: number;
  netBalance: number;
  byAccount: Array<{
    accountId: number;
    accountName: string;
    bankName: string;
    balance: number;
    debt: number;
    netBalance: number;
  }>;
}

export interface IBalanceQueryParams {
  accountId?: number;
  startDate?: string;
  endDate?: string;
}