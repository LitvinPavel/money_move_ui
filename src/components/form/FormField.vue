<script setup lang="ts">
import { useModel } from "vue";

export interface Props {
  modelValue: string | number | null | undefined;
  label: string;
  type?: string;
  id: string;
  autocomplete?: string;
  required?: boolean;
  placeholder?: string;
}

export type Emits = {
  (e: "update:value", value: string): void;
};

const props = withDefaults(defineProps<Props>(), {
  autocomplete: "off",
  required: false,
  type: "text",
  placeholder: "",
});

const valueModel = useModel(props, "modelValue");
</script>

<template>
  <div>
    <label :for="id" class="form-field-label">{{ label }}</label>
    <input
      v-model="valueModel"
      :type="type"
      :name="id"
      :id="id"
      :autocomplete="autocomplete"
      :required="required"
      :placeholder="placeholder"
      class="form-field-input"
    />
  </div>
</template>

<style lang="scss">
@use "form-field";
</style>
