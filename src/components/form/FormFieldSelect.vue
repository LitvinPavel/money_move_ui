<script setup lang="ts" generic="T extends baseObj">
import { useModel } from "vue";

export interface baseObj {
  [key: string]: unknown;
}

export interface Props<T> {
  modelValue: T | string | null;
  options: T[];
  optionKey?: string;
  optionValue?: string;
  label: string;
  id: string;
  required?: boolean;
}

export type Emits = {
  (e: "update:value", value: string): void;
};

const props = withDefaults(defineProps<Props<T>>(), {
  required: false,
});

const valueModel = useModel(props, "modelValue");
</script>

<template>
  <div>
    <label :for="id" class="form-field-label">{{ label }}</label>
    <select v-model="valueModel" :id="id" class="form-field-select">
      <option v-for="(opt, index) in options" :key="index" :value="optionKey ? opt?.[optionKey] : opt">
        {{ optionValue ? opt?.[optionValue] : opt  }}
      </option>
    </select>
  </div>
</template>

<style lang="scss">
@use "form-field";
</style>
