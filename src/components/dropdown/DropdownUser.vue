<script setup lang="ts">
import { ref } from "vue";

const showMenu = ref<boolean>(false);
</script>

<template>
  <div class="flex items-center relative">
    <div class="flex items-center ms-3">
      <div>
        <button
          type="button"
          class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          @click="showMenu = !showMenu"
        >
          <span class="sr-only">Открыть меню пользователя</span>
          <img
            class="w-8 h-8 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="user photo"
          />
        </button>
      </div>
      <div
        :class="{ hidden: !showMenu }"
        class="absolute top-full right-0 z-50 mt-5 md:mt-4 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 dark:divide-gray-600"
      >
        <div class="px-4 py-3">
          <p class="text-sm text-gray-900 dark:text-white">Neil Sims</p>
          <p
            class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
          >
            neil.sims@flowbite.com
          </p>
        </div>
        <ul class="py-1">
          <li v-for="item in 4" :key="item">
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              role="menuitem"
              >Dashboard</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
