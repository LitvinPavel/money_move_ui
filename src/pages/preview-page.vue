<script setup lang="ts"></script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="absolute flex justify-end w-full p-2">
      <ThemeToggle />
    </div>
    <div class="py-8 px-4 mx-auto max-w-screen-xl text-center space-y-4">
      <h1
        class="text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
      >
        Учет финансов
      </h1>
      <p
        class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400"
      >
        Приложение создано решить боль с непониманием когда и в каком размере
        должна прийти зарплата. И, как бонус позволит вести учет финансов,
        создавая счета, осуществляя транзикции между ними, добавляя отпуска,
        изменения в зарплате и т.п. Не забудь добавить текущий оклад в разделе "Настройки".
      </p>

      <div
        class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]"
      >
        <div
          class="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"
        ></div>
        <div
          class="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"
        ></div>
        <div
          class="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"
        ></div>
        <div
          class="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"
        ></div>
        <div
          class="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800"
        >
          <img
            src="@/assets/images/mock-light.png"
            class="dark:hidden w-[272px] h-[572px]"
            alt=""
          />
          <img
            src="@/assets/images/mock-dark.png"
            class="hidden dark:block w-[272px] h-[572px]"
            alt=""
          />
        </div>
      </div>

      <div
        class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0"
      >
        <router-link
          to="/sign-up"
          class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          Начнем
          <ArrowRightIcon class="w-5 h-5 ms-2 rtl:rotate-180" />
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
