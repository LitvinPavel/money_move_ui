<script setup lang="ts">
import { useModel } from "vue";

export interface Props {
  modelValue: string | number | Object;
  options: string[] | number[] | Object[];
  optionKey?: string;
  label: string;
  id: string;
  required?: boolean;
}

export type Emits = {
  (e: "update:value", value: string): void;
};

const props = withDefaults(defineProps<Props>(), {
  required: false,
});

const valueModel = useModel(props, "modelValue");
</script>

<template>
  <div>
    <label :for="id" class="form-field-label">{{ label }}</label>
    <select v-model="valueModel" :id="id" class="form-field-select">
      <option v-for="(opt, index) in options" :key="index">
        {{ opt }}
      </option>
    </select>
  </div>
</template>

<style lang="scss">
@use "form-field";
</style>
