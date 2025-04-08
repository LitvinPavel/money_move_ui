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
  <div>
    <label class="form-field-label">Банк</label>
    <DropdownSearch
      v-model:selected="selectedBank"
      v-model:search-input="searchQuery"
      :options="banks"
      option-key="name"
      :load-more="loadMoreBanks"
      :loading="loading"
    />
  </div>
</template>
<style></style>
