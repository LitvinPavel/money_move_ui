export interface ISalary {
  id: number;
  userId: number;
  base_salary: number;
  effective_from: Date;
  createdAt: Date;
}

export interface ISalaryCalculationResult {
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
