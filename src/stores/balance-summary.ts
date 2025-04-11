import { ref, watch } from "vue";
import { defineStore } from 'pinia'
import { usePeriodStore } from './period'
import { api } from "@/api";
import catchHandler from "@/utils/catch-handler";
import type { IBalanceSummary } from "@/models/transaction";

export const useBalanceSummaryStore = defineStore('balanceSummary', () => {
  const periodStore = usePeriodStore()

  // State
  const balanceSummary = ref<IBalanceSummary | null>(null)
  const error = ref<string | null>(null)
  const loading = ref(false)

  // Actions
  const updateBalanceSummary = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get<IBalanceSummary>("transactions/balance", {
        params: { 
          startDate: periodStore.startDate, 
          endDate: periodStore.endDate 
        },
      })
      balanceSummary.value = response.data ?? null
    } catch (err) {
      error.value = catchHandler(err, "Ошибка получения баланса за период")
      balanceSummary.value = null
    } finally {
      loading.value = false
    }
  }

  // Инициализация при создании store
  updateBalanceSummary()

  watch(
    () => [periodStore.startDate, periodStore.endDate],
    () => {
      updateBalanceSummary()
    }
  )

  return {
    balanceSummary,
    loading,
    error,
    updateBalanceSummary
  }
})