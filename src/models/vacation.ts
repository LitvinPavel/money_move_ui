export interface IVacation {
  id: number;
  userId: number;
  start_date: Date;
  end_date: Date;
  createdAt: Date;
}

export interface IVacationQueryParams {
  startDate?: string;
  endDate?: string;
}