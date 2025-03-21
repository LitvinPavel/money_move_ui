<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const { logout } = useAuth();
</script>

<template>
  <base-button @click="logout">
    Выйти
  </base-button>
</template>

<style scoped></style>
