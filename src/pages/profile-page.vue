<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuth } from "@/composables/useAuth";

const { user, loading, userProfile } = useAuth();

onMounted(() => {
  userProfile();
});
</script>
<template>
  <BaseLoader v-if="loading" />
  <div v-else class="p-4 space-y-6 max-w-lg mx-auto">
    <base-card-wrapper headline="Личные данные">
      <div class="flex items-center gap-4">
        <ProfileIcon class="w-10 h-10 text-gray-200 dark:text-gray-700 flex-shrink-0" />
        <div class="font-medium dark:text-white">
          <div>{{ user?.name }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {{ user?.email }}
          </div>
        </div>
      </div>
    </base-card-wrapper>
  </div>
</template>
<style></style>
