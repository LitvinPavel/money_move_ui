<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";

const { login, loading } = useAuth();

const username = ref<string>("");
const password = ref<string>("");

const handleLogin = async () => {
  await login({ email: username.value, password: password.value });
};
</script>

<template>
  <base-wrapper headline="Авторизация">
    <div class="mt-5">
      <form class="space-y-6" @submit.prevent="handleLogin">
        <FormFieldInput
          v-model="username"
          id="email"
          label="Почта"
          type="email"
          required
        />
        <FormFieldInput
          v-model="password"
          id="password"
          label="Пароль"
          type="password"
          autocomplete="current-password"
          required
        />
        <base-button type="submit" :disabled="loading"> Войти </base-button>
      </form>
      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Нет аккаунта?
        <router-link
          to="/sign-up"
          class="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Регистрация
        </router-link>
      </p>
    </div>
  </base-wrapper>
</template>

<style scoped></style>
