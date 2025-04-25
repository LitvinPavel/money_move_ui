<script setup lang="ts">
import { ref, computed } from "vue";
import { useAuth } from "@/composables/useAuth";

const { register, loading } = useAuth();

const username = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const confirmPassword = ref<string>("");

const passwordMismatch = computed(
  () => password.value !== confirmPassword.value
);

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
  await register({
    name: username.value,
    email: email.value,
    password: password.value,
  });
};
</script>

<template>
  <base-wrapper headline="Регистрация">
    <div class="mt-5">
      <p v-if="passwordMismatch" class="absolute top-2 text-red-400">
        Пароли не совпадают
      </p>
      <form class="space-y-6" @submit.prevent="handleRegister">
        <FormFieldInput
          v-model="username"
          id="name"
          label="Имя"
          autocomplete="nickname"
          required
        />
        <FormFieldInput
          v-model="email"
          id="email"
          label="Почта"
          autocomplete="email"
          required
        />
        <FormFieldInput
          v-model="password"
          id="password"
          label="Пароль"
          type="password"
          required
        />
        <FormFieldInput
          v-model="confirmPassword"
          id="confirmPassword"
          label="Подтвердите пароль"
          type="password"
          required
        />

        <base-button type="submit" :disabled="loading || !isFormValid">
          {{ loading ? "Регистрация..." : "Зарегистрироваться" }}
        </base-button>
      </form>
      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Уже зарегистрированы?
        <router-link
          to="/sign-in"
          class="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Авторизоваться
        </router-link>
      </p>
    </div>
  </base-wrapper>
</template>

<style scoped></style>
