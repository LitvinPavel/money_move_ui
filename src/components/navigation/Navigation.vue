<script setup lang="ts">
import { type Component } from "vue";
import ListIcon from "@/components/icons/ListIcon.vue";
import WalletIcon from "@/components/icons/WalletIcon.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import CalendarIcon from "@/components/icons/CalendarIcon.vue";
import ProfileIcon from "@/components/icons/ProfileIcon.vue";

const components: { [key: string]: Component } = {
  ListIcon,
  WalletIcon,
  PlusIcon,
  CalendarIcon,
  ProfileIcon,
};

const navList = [
  {
    title: "Кашелек",
    link: "/",
    icon: components["WalletIcon"],
  },
  {
    title: "История",
    link: "/history",
    icon: components["ListIcon"],
  },
  {
    title: "Календарь",
    link: "/calendar",
    icon: components["CalendarIcon"],
  },
  {
    title: "Профиль",
    link: "/profile",
    icon: components["ProfileIcon"],
  },
];
</script>

<template>
  <div
    class="fixed z-50 w-full h-16 max-w-sm -translate-x-1/2 bottom-4 left-1/2 pl-4 pr-[5.5rem]"
  >
    <div
      class="grid h-full max-w-sm grid-cols-4 mx-auto bg-white border border-gray-200 rounded-full dark:bg-gray-700 dark:border-gray-600 overflow-hidden"
    >
      <NavigationItem
        v-for="({ title, icon, link }, index) in navList"
        :key="index"
        :title="title"
        :is-first="index === 0"
        :is-last="index === navList.length"
        :link="link"
      >
        <template #icon>
          <component
            :is="icon"
            class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
          />
        </template>
      </NavigationItem>
      <NavigationItemCreate />
    </div>
  </div>
</template>

<style lang="scss"></style>
