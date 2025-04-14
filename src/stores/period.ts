import { defineStore } from "pinia";

// Дефолтные значения
const getDefaultDates = () => ({
  startDate: new Date(new Date().setDate(1)).toLocaleDateString("sv"), // 1-е число текущего месяца
  endDate: new Date().toLocaleDateString("sv"), // Сегодня
});

export const usePeriodStore = defineStore("period", {
  state: () => {
    return getDefaultDates();
  },
  actions: {
    setPeriod(start: string, end: string) {
      this.startDate = start;
      this.endDate = end;
    },
    resetToDefault() {
      const defaults = getDefaultDates();
      this.setPeriod(defaults.startDate, defaults.endDate);
    },
  },
});
