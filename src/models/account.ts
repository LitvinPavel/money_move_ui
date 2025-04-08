export type AccountType = "deposit" | "savings" | "investment" | "credit";
export enum AccountTypeEnum {
  deposit = "deposit",
  savings = "savings",
  investment = "investment",
  credit = "credit",
}

export interface IGetAccountsQuery {
  type?: string;
  bank_bic?: string;
}

export interface IGetTotalBalanceQuery {
  groupBy?: "bank_bic" | "type";
}

export interface ICreateAccountBody {
    currency: string;
    initialBalance?: number;
    account_name: string;
    bank_bic: string;
    type: AccountType;
    plan?: number;
    interest_rate?: number | null;
    is_salary?: boolean;
}

export interface IUpdateAccountBody {
    currency?: string;
    balance?: number;
    account_name?: string;
    bank_bic?: string;
    type?: AccountType;
    plan?: number;
    interest_rate?: number | null;
    is_salary?: boolean;
    debt?: number;
}

export interface IAccount {
    id: number;
    account_name: string;
    bank_name: string;
    type: AccountType;
    plan?: number;
    debt?: number;
    interest_rate?: number | null;
    balance: number;
    currency: string;
    is_salary: boolean;
}

export interface ITotalBalance {
  [key: string]: number;
}
