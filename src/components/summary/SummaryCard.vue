<script setup lang="ts">
export interface Props {
  name: string;
  value: number;
}

defineProps<Props>();
</script>

<template>
  <div class="p-5 rounded-lg bg-white dark:bg-gray-800">
    <div class="relative flex justify-between items-center mb-5">
      <div class="flex space-x-[7px] items-center">
        <div class="icon">
          <span>
            <!-- <img src="@/assets/images/icons/total-earn.svg" alt="icon" /> -->
          </span>
        </div>
        <span class="text-lg text-gray-500 dark:text-gray-400 font-semibold"
          >{{ name }}</span
        >
      </div>
      <button type="button" class="text-gray-500 dark:text-gray-400 absolute right-0 top-0">
        <MenuPointsIcon />
      </button>
    </div>
    <div class="flex justify-between items-end">
      <div class="flex-1">
        <p
          class="text-gray-900 dark:text-white font-bold text-3xl leading-[48px]"
        >
          {{ value.toFixed(2) }}₽
        </p>
        <div
          class="flex items-center space-x-1 text-xs xl:text-sm text-gray-500 dark:text-gray-400"
        >
          <span>
            <svg
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.4318 0.522827L12.4446 0.522827L8.55575 0.522827L7.56859 0.522827C6.28227 0.522827 5.48082 1.91818 6.12896 3.02928L9.06056 8.05489C9.7037 9.1574 11.2967 9.1574 11.9398 8.05489L14.8714 3.02928C15.5196 1.91818 14.7181 0.522828 13.4318 0.522827Z"
                fill="#22C55E"
              ></path>
              <path
                opacity="0.4"
                d="M2.16878 13.0485L3.15594 13.0485L7.04483 13.0485L8.03199 13.0485C9.31831 13.0485 10.1198 11.6531 9.47163 10.542L6.54002 5.5164C5.89689 4.41389 4.30389 4.41389 3.66076 5.5164L0.729153 10.542C0.0810147 11.6531 0.882466 13.0485 2.16878 13.0485Z"
                fill="#22C55E"
              ></path>
            </svg>
          </span>
          <span class="text-success-300"> + 3.5% </span>
          <span class="text-bgray-700 dark:text-bgray-50">
            from last week
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
