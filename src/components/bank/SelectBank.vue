<script setup lang="ts">
import { useBank } from "@/composables/useBank";
import type { IBank } from "@/models/bank";

export interface Props {
  modelValue: IBank | null;
}

export type Emits = {
  (e: "update:modelValue", value: IBank | null): void;
};

defineProps<Props>();
const emit = defineEmits<Emits>();

const { loading, hasMore, searchQuery, selectElement, selectedBank, banks } =
  useBank();
</script>

<template>
  <div class="space-y-2">
    <FormField
      v-model="searchQuery"
      id="search"
      label="Банк"
      placeholder="Название/БИК"
    />
    <select
      ref="selectElement"
      v-show="banks.length"
      v-model="selectedBank"
      class="form-field-select"
      size="8"
      @change="emit('update:modelValue', selectedBank)"
    >
      <option v-for="bank in banks" :key="bank.bic" :value="bank">
        {{ bank.name }}
      </option>

      <option v-if="loading" disabled class="loading-option">
        Загрузка...
      </option>

      <option v-if="!hasMore && !loading && banks.length > 0" disabled>
        Больше нет результатов
      </option>

      <option v-if="banks.length === 0 && !loading" disabled>
        {{ searchQuery ? "Ничего не найдено" : "Начните вводить для поиска" }}
      </option>
    </select>
  </div>
</template>

<style lang="scss">
.form-field-select {
  @apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500;
}
</style>
