export interface IBank {
  bic: string;
  name: string;
}

export interface IBankResponse {
  banks: IBank[];
  total: number;
  page: number;
  pageSize: number;
}

export interface IBankQuery {
  search: string;
  page: number;
  pageSize: number;
}
