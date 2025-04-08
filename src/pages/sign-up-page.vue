<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuth } from '@/composables/useAuth';

const { register, loading } = useAuth();

const username = ref<string>('');
  const email = ref<string>('');
  const password = ref<string>('');
    const confirmPassword = ref<string>('');

    const passwordMismatch = computed(() => password.value !== confirmPassword.value);

  const isFormValid = computed(() => {
  return (
    username.value &&
    password.value &&
    confirmPassword.value &&
    !passwordMismatch.value
  );
});

  const handleRegister = async () => {
    if (passwordMismatch.value) {
    return;
  }
  await register({ name: username.value, email: email.value, password: password.value });
};
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <h2
      class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
    >
      Регистрация
    </h2>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleRegister">
        <FormField v-model="username" id="login" label="Логин" autocomplete="nickname" required />
        <FormField v-model="username" id="email" label="Email" autocomplete="email" required />
        <FormField v-model="password" id="password" label="Пароль" type="password" required />
        <FormField v-model="confirmPassword" id="confirmPassword" label="Подтвердите пароль" type="password" required />

        <base-button type="submit" :disabled="loading  || !isFormValid"> {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }} </base-button>
        <p v-if="passwordMismatch" class="text-red-400">Пароли не совпадают</p>
      </form>
      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Уже зарегистрированы?
        <router-link to="/sign-in" class="font-semibold text-indigo-600 hover:text-indigo-500">
          Авторизоваться
        </router-link>
      </p>
    </div>
  </div>
</template>

<style scoped></style>
