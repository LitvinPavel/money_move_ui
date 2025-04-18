<script setup lang="ts">
import { ref, provide } from "vue";
import { onMounted } from "vue";
import { useDarkMode } from "@/composables/useDarkMode";

const { checkTheme, watchSystemTheme } = useDarkMode();

onMounted(() => {
  checkTheme();
  watchSystemTheme();
});

const error = ref<string | null>(null);
const setError = (err: string) => {
  error.value = err;
};
provide("errorHandler", setError);
</script>

<template>
  <RouterView />
  <BaseError v-if="error" v-model:error="error" />
</template>

<style lang="scss">
@use 'assets/scss/style';
</style>
