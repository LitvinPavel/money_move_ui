import { defineStore } from "pinia";

// Ключ для localStorage
const STORAGE_KEY = "financial_period";

// Дефолтные значения
const getDefaultDates = () => ({
  startDate: new Date(new Date().setDate(1)).toISOString().split("T")[0], // 1-е число текущего месяца
  endDate: new Date().toISOString().split("T")[0], // Сегодня
});

export const usePeriodStore = defineStore("period", {
  state: () => {
    // Пытаемся загрузить из localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : getDefaultDates();
  },
  actions: {
    setPeriod(start: string, end: string) {
      this.startDate = start;
      this.endDate = end;
      // Сохраняем в localStorage при каждом изменении
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ startDate: start, endDate: end })
      );
    },
    resetToDefault() {
      const defaults = getDefaultDates();
      this.setPeriod(defaults.startDate, defaults.endDate);
    },
  },
});
