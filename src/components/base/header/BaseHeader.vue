<script setup lang="ts">
</script>

<template>
  <nav
    class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start rtl:justify-end">
          <button
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            @click="$emit('toogle-sidbar')"
          >
            <span class="sr-only">Открыть боковую панель</span>
            <BurgerMenuIcon class="w-6 h-6" />
          </button>
          <router-link to="/" class="flex ms-2 md:me-24">
            <span
              class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white"
              >Money_Move</span
            >
          </router-link>
        </div>
        <DropdownUser />
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
