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
  pattern?: string;
  patternTitle?: string;
}

const props = withDefaults(defineProps<Props>(), {
  autocomplete: "off",
  required: false,
  type: "text",
  placeholder: "",
});

const valueModel = useModel(props, "modelValue");
</script>

<template>
  <form-field :id="id" :label="label" :required="required">
    <input
      v-model="valueModel"
      :type="type"
      :name="id"
      :id="id"
      :autocomplete="autocomplete"
      :required="required"
      :placeholder="placeholder"
      :pattern="pattern"
      :title="patternTitle"
      class="form-field-input"
    />
  </form-field>
</template>

<style lang="scss"></style>
