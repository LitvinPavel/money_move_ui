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
  <div
    class="relative p-4 m-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 sm:mx-auto sm:w-full sm:h-full sm:max-w-sm"
  >
    <h1
      class="absolute top-0 -mt-3 -ml-1 bg-gray-100 dark:bg-gray-900 px-2 z-10 text-gray-500 dark:text-gray-400 text-sm"
    >
      Регистрация
    </h1>

    <div class="mt-5">
      <p v-if="passwordMismatch" class="absolute top-2 text-red-400">Пароли не совпадают</p>
      <form class="space-y-6" @submit.prevent="handleRegister">
        <FormFieldInput v-model="username" id="name" label="Имя" autocomplete="nickname" required />
        <FormFieldInput v-model="username" id="email" label="Почта" autocomplete="email" required />
        <FormFieldInput v-model="password" id="password" label="Пароль" type="password" required />
        <FormFieldInput v-model="confirmPassword" id="confirmPassword" label="Подтвердите пароль" type="password" required />

        <base-button type="submit" :disabled="loading  || !isFormValid"> {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }} </base-button>
        
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
