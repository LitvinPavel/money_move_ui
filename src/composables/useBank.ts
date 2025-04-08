import { ref, onMounted, onUnmounted, watch } from "vue";
import { api } from "@/api";
import catchHandler from "@/utils/catch-handler";
import type { IBankResponse, IBank } from "@/models/bank";

import { useError } from "@/composables/useError";

export function useBank() {
  const { showError } = useError();
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);
  const banks = ref<IBank[]>([]);
  const page = ref<number>(1);
  const pageSize = ref<number>(10);
  const total = ref<number>(0);
  const hasMore = ref<boolean>(true);
  const searchQuery = ref<string>("");
  // const selectElement = ref<HTMLSelectElement | null>(null);
  const selectedBank = ref<IBank | null>(null);

  const getBanks = async (reset = false): Promise<void> => {
    if (loading.value || !hasMore.value || !searchQuery.value) return;

    if (reset) {
      page.value = 1;
      banks.value = [];
      hasMore.value = true;
    }

    loading.value = true;
    error.value = null;

    try {
      const response = await api.get<IBankResponse>("/banks", {
        params: {
          search: searchQuery.value,
          page: page.value,
          pageSize: pageSize.value,
        },
      });

      banks.value = [...banks.value, ...(response.data.banks || [])];
      total.value = response.data.total;
      hasMore.value = banks.value.length < total.value;

      if (response.data.page !== undefined) page.value = response.data.page;
      if (response.data.pageSize !== undefined)
        pageSize.value = response.data.pageSize;
    } catch (err) {
      showError(catchHandler(err, "Ошибка получения банков"));
      if (page.value > 1) page.value -= 1;
    } finally {
      loading.value = false;
    }
  };

  const loadMoreBanks = async (): Promise<void> => {
    page.value += 1;
    console.log(hasMore.value)
    getBanks();
  }

  // const handleScroll = () => {
  //   if (!selectElement.value || loading.value || !hasMore.value) return;

  //   const { scrollTop, scrollHeight, clientHeight } = selectElement.value;
  //   const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50;

  //   if (isNearBottom) {
  //     page.value += 1;
  //     getBanks();
  //   }
  // };

  // onMounted(() => {
  //   getBanks(true);
  //   if (selectElement.value) {
  //     selectElement.value.addEventListener("scroll", handleScroll);
  //   }
  // });

  // onUnmounted(() => {
  //   if (selectElement.value) {
  //     selectElement.value.removeEventListener("scroll", handleScroll);
  //   }
  // });

  watch(searchQuery, (newVal: string) => {
    if (newVal.length === 0 || newVal.length > 2) {
      hasMore.value = true;
      getBanks(true);
    }
  });

  return {
    loading,
    hasMore,
    searchQuery,
    selectedBank,
    banks,
    loadMoreBanks
  };
}
