<script setup lang="ts" generic="T extends baseObj">
import { useModel } from "vue";
import AngleRightIcon from "../icons/AngleRightIcon.vue";

export interface baseObj {
  [key: string]: unknown;
}

export interface Props<T> {
  modelValue?: T | string | number | null;
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
const selectRef = ref<HTMLSelectElement | null>(null);

function selectHandler(e: MouseEvent) {
  console.log({r: selectRef.value})
  if (selectRef.value?.onclick) {
    selectRef.value.onclick(e)
  }
}
</script>

<template>
  <form-field :id="id" :label="label" :required="required">
    <div class="relative bg-gray-50 dark:bg-gray-800 h-[2.625rem] rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
      <select ref="selectRef" v-model="valueModel" :id="id" class="form-field-select absolute">
      <option
        v-for="(opt, index) in options"
        :key="index"
        :value="optionKey ? opt?.[optionKey] : opt"
      >
        {{ optionValue ? opt?.[optionValue] : opt }}
      </option>
    </select>
    <AngleRightIcon
      class="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-300 rotate-90"
      @click="selectHandler"
    />
    </div>
  </form-field>
</template>

<style lang="scss"></style>
