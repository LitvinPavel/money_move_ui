export interface ISalary {
  id: number;
  userId: number;
  base_salary: number;
  effective_from: Date;
  createdAt: Date;
}

export interface ISalaryQueryParams {
  amount?: number;
  effective_from?: Date;
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

export interface ISalaryPeriodCalculationResult {
  periodStart: Date;
  periodEnd: Date;
  calculations: ISalaryCalculationResult[];
  total: {
    advance: number;
    salary: number;
    vacationPay: number;
    overall: number;
  };
}

export interface ISalaryCalculationSummary {
  advance: number;
  salary: number;
  vacationPay?: number;
  total: number;
}
