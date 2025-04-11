<script setup lang="ts">
import { onMounted } from "vue";
import { useDarkMode } from "@/composables/useDarkMode";

const { isDark } = useDarkMode();

const checkTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (savedTheme) {
    isDark.value = savedTheme === "dark";
  } else {
    isDark.value = systemPrefersDark;
  }

  applyTheme();
};

const toggleTheme = () => {
  isDark.value = !isDark.value
  applyTheme()
}

const applyTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};

const watchSystemTheme = () => {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        isDark.value = e.matches;
        applyTheme();
      }
    });
};

onMounted(() => {
  checkTheme();
  watchSystemTheme();
});
</script>

<template>
  <button class="flex items-center w-6 h-6 justify-center text-gray-700 rounded-lg focus:outline-none dark:text-gray-400" @click="toggleTheme">
    <SunIcon class="transition duration-300" :class="isDark ? 'opacity-100 scale-100' : 'opacity-0 scale-0 invisible w-0'" />
    <MoonIcon class="transition duration-300" :class="isDark ? 'opacity-0 scale-0 invisible w-0' : 'opacity-100 scale-100'" />
  </button>
</template>

<style scoped></style>
