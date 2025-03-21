<script setup lang="ts">
import { useAuth } from '@/composables/useAuth';

const { login, error, loading } = useAuth();

const username = ref<string>('');
  const password = ref<string>('');

  const handleLogin = async () => {
  await login({ username: username.value, password: password.value });
};
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <h2
      class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
    >
      Авторизация
    </h2>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleLogin">
        <FormField v-model="username" id="login" label="Логин" autocomplete="nickname" required />
        <form-field v-model="password" id="password" label="Пароль" type="password" autocomplete="current-password" required>
          <template #header>
            <div class="text-sm">
              <a
                href="#"
                class="font-semibold text-indigo-600 hover:text-indigo-500"
                >Восстановить пароль?</a
              >
            </div>
          </template>
        </form-field>

        <base-button type="submit" :disabled="loading"> Войти </base-button>
        <p v-if="error" class="text-red-400">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
