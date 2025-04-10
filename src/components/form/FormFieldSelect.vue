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

const props = withDefaults(defineProps<Props<T>>(), {
  required: false,
});

const valueModel = useModel(props, "modelValue");
</script>

<template>
  <form-field :id="id" :label="label" :required="required">
    <select v-model="valueModel" :id="id" class="form-field-select">
      <option
        v-for="(opt, index) in options"
        :key="index"
        :value="optionKey ? opt?.[optionKey] : opt"
      >
        {{ optionValue ? opt?.[optionValue] : opt }}
      </option>
    </select>
  </form-field>
</template>

<style lang="scss"></style>
