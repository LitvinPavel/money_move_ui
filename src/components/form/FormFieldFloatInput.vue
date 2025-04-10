<script setup lang="ts">
import { ref, computed, watch } from "vue";

interface Props {
  modelValue?: number | null | undefined;
  label?: string;
  id: string;
  required?: boolean;
  placeholder?: string;
  max?: number;
  precision?: number;
  allowNegative?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  label: "",
  required: false,
  placeholder: "0.00",
  max: Infinity,
  precision: 2,
  allowNegative: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: number | null): void;
  (e: "blur"): void;
}>();

const inputRef = ref<HTMLInputElement | null>(null);
const rawValue = ref<string>("");
const isFocused = ref<boolean>(false);
const isTouched = ref<boolean>(false);

const displayValue = computed(() => {
  if (isFocused.value) return rawValue.value !== "0" ? rawValue.value : null;
  if (!props.modelValue) return null;
  return formatNumber(props.modelValue);
});

const formatNumber = (value: number): string => {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: props.precision,
    useGrouping: false,
  });
};

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let value = target.value;

  const regex = props.allowNegative ? /[^0-9.-]/g : /[^0-9.]/g;
  value = value.replace(regex, "");

  const dotCount = (value.match(/\./g) || []).length;
  const minusCount = (value.match(/-/g) || []).length;

  if (dotCount > 1) {
    const parts = value.split(".");
    value = parts[0] + "." + parts.slice(1).join("");
  }

  if (minusCount > 1 || (minusCount === 1 && !value.startsWith("-"))) {
    value = value.replace(/-/g, "");
    if (minusCount > 0) value = "-" + value;
  }

  if (parseFloat(value) > props.max) {
    // Если значение превышает максимум, подставляем максимальное значение
    value = props.max.toString();
    rawValue.value = value;
    target.value = value;
    emit("update:modelValue", props.max);
    return;
  }
  rawValue.value = value;
};

const handleKeyDown = (event: KeyboardEvent) => {
  const allowedKeys = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "Tab",
    "Home",
    "End",
  ];

  if (
    !/[0-9.]/.test(event.key) &&
    !(props.allowNegative && event.key === "-") &&
    !allowedKeys.includes(event.key)
  ) {
    event.preventDefault();
  }
};

const handleFocus = () => {
  isFocused.value = true;
  rawValue.value =
    props.modelValue != null ? formatNumber(props.modelValue) : "";
};

const handleBlur = () => {
  isFocused.value = false;
  isTouched.value = true;

  if (rawValue.value === "") {
    emit("update:modelValue", null);
    return;
  }
  const numValue = parseFloat(rawValue.value);
  const value = numValue > props.max ? Math.min(numValue, props.max) : numValue;
  emit("update:modelValue", value);
  emit("blur");
};

watch(
  () => props.modelValue,
  (newVal) => {
    if (!isFocused.value) {
      rawValue.value = newVal != null ? formatNumber(newVal) : "";
    }
  }
);
</script>

<template>
  <form-field :id="id" :label="label" :required="required">
    <input
      :value="displayValue"
      :name="id"
      :id="id"
      :required="required"
      :placeholder="placeholder"
      :aria-required="required"
      ref="inputRef"
      type="text"
      class="form-field-input"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
      @keydown="handleKeyDown"
    />
  </form-field>
</template>

<style scoped></style>
