<script setup lang="ts">
export interface Props {
  visible: boolean;
  headline: string;
}

export type Emits = {
  (e: "update:visible", value: boolean): void;
  (e: "save", value?: () => void): void;
  (e: "close"): void;
};

defineSlots<{
  default: () => VNode[];
}>();

defineProps<Props>();
const emit = defineEmits<Emits>();

function onSave() {
  emit("save", onClose);
}

function onClose() {
  emit("close");
}
</script>

<template>
  <div v-if="visible" class="base-modal">
    <div class="base-modal-content">
      <h3>{{ headline }}</h3>
      <slot />
      <button @click="onSave">Сохранить</button>
      <button @click="onClose">Закрыть</button>
    </div>
  </div>
</template>

<style lang="scss">
@use "base-modal";
</style>
