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
