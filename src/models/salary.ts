export interface ISalary {
  id: number;
  userId: number;
  base_salary: number;
  effective_from: Date;
  createdAt: Date;
}

export interface ISalaryCalculationResult {
  advance: {
    amount: number;
    paymentDate: Date;
    hours: number;
    hourlyRate: number;
  };
  salary: {
    amount: number;
    paymentDate: Date;
    hours: number;
    hourlyRate: number;
  };
  vacationPay?: {
    amount: number;
    days: number;
    averageHourlyRate: number;
    paymentDate: Date;
  };
  total: number;
}
