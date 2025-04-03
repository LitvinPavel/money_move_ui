<script setup lang="ts">
import { ref } from "vue";

const showSidebar = ref<boolean>(false);
</script>

<template>
    <BaseHeader @toogle-sidbar="showSidebar = !showSidebar" />
    <Sidebar v-model:visible="showSidebar" />
    <div
        v-if="showSidebar"
        class="backdrop md:hidden bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30"
    />
    <div class="min-h-[calc(100vh-3.5rem)] p-4 md:ml-64 mt-14 space-y-6 2xl:space-y-14 flex flex-col justify-between">
        <router-view />
        <BaseFooter />
    </div>
</template>

<style scoped>

</style>