<script setup lang="ts" generic="T extends baseObj">
import { ref, useModel } from "vue";
import { useLazyload } from "@/composables/useLazyload";

export interface baseObj {
  [key: string]: unknown;
}

export interface Props<T> {
  selected: T | null;
  searchInput: string;
  options: T[];
  optionKey: string;
  id?: string;
  placeholder?: string;
  loading?: boolean;
  loadMore: () => Promise<void>;
}

const props = withDefaults(defineProps<Props<T>>(), {
  id: "dropdown-search",
  placeholder: "Начать поиск",
  loading: false,
});

const { selectElement } = useLazyload(props.loadMore);

const selectedModel = useModel(props, "selected");
const searchModel = useModel(props, "searchInput");

const showOptions = ref<boolean>(false);

const closeDropdown = () => {
    showOptions.value = false;
}

watch(selectedModel, (newVal: T | null) => {
  if (newVal) {
    closeDropdown();
  }
});
</script>
<template>
  <div v-click-outside="closeDropdown" class="relative space-y-1">
    <button
      class="relative w-full text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm py-2.5 px-3 text-center inline-flex items-center dark:bg-gray-600 dark:border-gray-500 dark:text-gray-400"
      type="button"
      @click="showOptions = !showOptions"
    >
      <span class="text-gray-900 dark:text-gray-300">{{ selectedModel ? selectedModel[optionKey] : placeholder }}</span>
      <ChevronSortIcon
        class="w-5 h-5 absolute right-1 top-1/2 -translate-y-1/2"
      />
    </button>

    <div
      v-show="showOptions"
      class="absolute w-full z-10 bg-white rounded-lg shadow-sm dark:bg-gray-700"
    >
        <BaseSearchInput v-model="searchModel" :is-auto-focus="true" class="p-3" />
      <ul
        ref="selectElement"
        class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
      >
        <li v-for="(option, index) in options" :key="index">
          <div
            class="flex items-center ps-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <input
              :id="`${id}-${index}`"
              type="radio"
              :value="option"
              v-model="selectedModel"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              :for="`${id}-${index}`"
              class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300"
              >{{ option[optionKey] }}</label
            >
          </div>
        </li>
        <li v-if="loading" class="relative h-full">
          <BaseLoader />
        </li>
        <li v-if="options.length === 0 && !loading" class="text-center">
          {{ searchModel ? "Ничего не найдено" : "Начните вводить для поиска" }}
        </li>
      </ul>
    </div>
  </div>
</template>
<style></style>
