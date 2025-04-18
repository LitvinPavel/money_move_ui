<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '@/composables/useAuth';

const { login, loading } = useAuth();

const username = ref<string>('');
  const password = ref<string>('');

  const handleLogin = async () => {
  await login({ email: username.value, password: password.value });
};
</script>

<template>
  <div
    class="relative p-4 m-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 sm:mx-auto sm:w-full sm:h-full sm:max-w-sm"
  >
    <h1
      class="absolute top-0 -mt-3 -ml-1 bg-gray-100 dark:bg-gray-900 px-2 z-10 text-gray-500 dark:text-gray-400 text-sm"
    >
      Авторизация
    </h1>

    <div class="mt-5">
      <form class="space-y-6" @submit.prevent="handleLogin">
        <FormFieldInput v-model="username" id="email" label="Почта" type="email" required />
        <FormFieldInput v-model="password" id="password" label="Пароль" type="password" autocomplete="current-password" required />
        <base-button type="submit" :disabled="loading"> Войти </base-button>
      </form>
      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Нет аккаунта?
        <router-link to="/sign-up" class="font-semibold text-indigo-600 hover:text-indigo-500">
          Регистрация
        </router-link>
      </p>
    </div>
  </div>
</template>

<style scoped></style>
