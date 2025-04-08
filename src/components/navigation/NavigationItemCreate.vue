<script setup lang="ts">
import { ref, onUnmounted, type Component } from "vue";
import InsertTableIcon from "@/components/icons/InsertTableIcon.vue";
import CreditCardAddIcon from "@/components/icons/CreditCardAddIcon.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import CalendatPlusIcon from "@/components/icons/CalendatPlusIcon.vue";

const components: { [key: string]: Component } = {
  InsertTableIcon,
  CreditCardAddIcon,
  CalendatPlusIcon,
};

const navList = [
  {
    title: "Счет",
    link: "/create/account",
    icon: components["CreditCardAddIcon"],
  },
  {
    title: "Транзакция",
    link: "/create/transaction",
    icon: components["InsertTableIcon"],
  },
  {
    title: "Отпуск",
    link: "/create/vacation",
    icon: components["CalendatPlusIcon"],
  },
];

const showMenu = ref(false);

onUnmounted(() => {
  showMenu.value = false;
});
</script>

<template>
  <div class="absolute end-5 bottom-1">
    <div v-if="showMenu" class="flex flex-col items-center mb-4 space-y-2">
      <router-link
        v-for="({ title, icon, link }, index) in navList"
        :key="index"
        :to="link"
        type="button"
        class="group flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-xs dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        <component :is="icon" class="w-6 h-6" />
        <span class="sr-only">{{ title }}</span>
        <base-tooltip direction="right">
          {{ title }}
        </base-tooltip>
      </router-link>
    </div>
    <button
      type="button"
      class="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
      @click="showMenu = !showMenu"
    >
      <PlusIcon
        class="w-7 h-7 transition-transform"
        :class="{ 'rotate-45': showMenu }"
      />
      <span class="sr-only">Open actions menu</span>
    </button>
  </div>
</template>

<style lang="scss"></style>
