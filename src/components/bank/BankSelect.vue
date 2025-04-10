<script setup lang="ts">
import { watch } from "vue";
import { useBank } from "@/composables/useBank";
import type { IBank } from "@/models/bank";

export interface Props {
  modelValue: string | undefined;
}

export type Emits = {
  (e: "update:modelValue", value: string): void;
};

defineProps<Props>();
const emit = defineEmits<Emits>();

const { loading, searchQuery, selectedBank, banks, loadMoreBanks } = useBank();
watch(selectedBank, (selected: IBank | null) => {
  if (selected) {
    emit("update:modelValue", selected.bic);
  }
});
</script>
<template>
  <form-field id="bank-select" label="Банк" required>
    <DropdownSearch
      v-model:selected="selectedBank"
      v-model:search-input="searchQuery"
      :load-more="loadMoreBanks"
      :loading="loading"
      :options="banks"
      option-key="name"
      id="bank-select"
    />
  </form-field>
</template>
<style></style>
