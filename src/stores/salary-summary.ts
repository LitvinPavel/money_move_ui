import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { usePeriodStore } from "./period";
import { api } from "@/api";
import catchHandler from "@/utils/catch-handler";
import type {
  ISalaryCalculationSummary,
  ISalaryCalculationResult,
} from "@/models/salary";

export const useSalarySummaryStore = defineStore("salarySummary", () => {
  const periodStore = usePeriodStore();

  // State
  const salarySummary = ref<ISalaryCalculationSummary | null>(null);
  const error = ref<string | null>(null);
  const loading = ref(false);

  // Actions
  const updateSalarySummary = async () => {
    loading.value = true;
    error.value = null;

    try {
      if (
        !periodStore.periodAsMonthsAndYear ||
        periodStore.periodAsMonthsAndYear.length === 0
      ) {
        throw new Error("Не выбран период для расчёта");
      }

      salarySummary.value = await aggregateSalaryForPeriod(
        periodStore.periodAsMonthsAndYear
      );

      //    // Делаем запросы для всех месяцев
      // const responses = await Promise.all(
      //     periodStore.periodAsMonthsAndYear.map(({ year, month }: { year: number, month: number }) =>
      //       api.get<ISalaryCalculationResult>("salary/calculate", {
      //         params: { month, year }
      //       })
      //     )
      //   );

      //   salarySummary.value = periodStore.periodAsMonthsAndYear.map((period: { year: number, month: number }, index: number) => ({
      //     ...period,
      //     data: responses[index]?.data ?? null
      //   }));
    } catch (err) {
      error.value = catchHandler(err, "Ошибка получения зарплаты за период");
      salarySummary.value = null;
    } finally {
      loading.value = false;
    }
  };

  // Вспомогательная функция для агрегации (опционально)
  async function aggregateSalaryForPeriod(
    periods: { year: number; month: number }[]
  ): Promise<ISalaryCalculationSummary | null> {
    const responses = await Promise.all(
      periods.map(({ year, month }) =>
        api.get<ISalaryCalculationResult>("salary/calculate", {
          params: { month, year },
        })
      )
    );

    if (!responses.length) return null;

    // const total = responses.reduce((sum, r) => {
    //     const _advance = r.data?.advance.paymentDate.getTime() === new Date().getTime() ? r.data?.advance.amount : 0;
    //     const _salary = r.data?.salary.paymentDate.getTime() === new Date().getTime() ? r.data?.salary.amount : 0;
    //     const _vacationPay = r.data?.vacationPay ? r.data?.vacationPay.paymentDate.getTime() === new Date().getTime() ? r.data?.vacationPay.amount : 0 : 0;
    //     console.log(_advance, _salary, _vacationPay)
    //     return (
    //       sum + 0
    //     );
    //   }, 0)

    //   console.log(total)

    return {
      advance: responses.reduce(
        (sum, r) => sum + (r.data?.advance.amount || 0),
        0
      ),
      salary: responses.reduce(
        (sum, r) => sum + (r.data?.salary.amount || 0),
        0
      ),
      vacationPay: responses.reduce(
        (sum, r) => sum + (r.data?.vacationPay?.amount || 0),
        0
      ),
      total: responses.reduce(
        (sum, r) => sum + (r.data?.total || 0),
        0
      ),
    };
  }

  // Инициализация при создании store
  updateSalarySummary();

  watch(
    () => [periodStore.startDate, periodStore.endDate],
    () => {
      updateSalarySummary();
    }
  );

  return {
    salarySummary,
    loading,
    error,
    updateSalarySummary,
  };
});
