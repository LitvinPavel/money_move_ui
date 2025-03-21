<script setup lang="ts">
export interface Props {
    modelValue: string;
  label: string;
  type?: string;
  id: string;
  autocomplete?: string;
  required?: boolean;
}

export type Emits = {
  (e: "update:value", value: string): void;
};

const props = withDefaults(defineProps<Props>(), {
  autocomplete: "off",
  required: false,
  type: "text",
});

const valueModel = useModel(props, "modelValue");
</script>

<template>
  <div>
    <div class="form-field-label-wrapper">
      <label :for="id" class="form-field-label">{{ label }}</label>
      <slot name="header" />
    </div>
    <input
      v-model="valueModel"
      :type="type"
      :name="id"
      :id="id"
      :autocomplete="autocomplete"
      :required="required"
      class="form-field-input"
    />
  </div>
</template>

<style lang="scss">
@use "form-field";
</style>
