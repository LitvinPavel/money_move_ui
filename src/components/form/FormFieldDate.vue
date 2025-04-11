<script setup lang="ts">
import { useModel } from "vue";
import { useDarkMode } from "@/composables/useDarkMode";

export interface Props {
  modelValue?: Date | string;
  label?: string;
  id?: string;
  required?: boolean;
  placeholder?: string;
  maxDate?: Date | string;
  timePicker?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  placeholder: "",
  timePicker: false
});
const { isDark } = useDarkMode();
const valueModel = useModel(props, "modelValue");
</script>

<template>
  <form-field :id="id" :label="label" :required="required">
    <VueDatePicker
      v-model="valueModel"
      :id="id"
      :max-date="maxDate"
      :required="required"
      :placeholder="placeholder"
      :format="timePicker ? 'dd.MM.yyyy HH:mm' : 'dd.MM.yyyy'"
      :enable-time-picker="timePicker"
      :dark="isDark"
      class="form-field-datepicker"
      auto-apply
      locale="ru"
    />
  </form-field>
</template>

<style></style>
