<script setup lang="ts">
import { onMounted } from "vue";
import { useAccount } from "@/composables/useAccount";

enum AccountTypeEnum {
  deposit = "deposit",
  savings = "savings",
  investment = "investment",
  credit = "credit",
}

const { accounts, getTotalBalance } = useAccount();

onMounted(() => {
  getTotalBalance({ groupBy: "bank_name" });
});
</script>
<template>
  <div class="p-4 space-y-6">
    <div
      class="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[24px] p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
    >
      <h3
        class="absolute top-0 -mt-3 ml-3 bg-[#fafafa] dark:bg-gray-900 px-2 z-10 text-gray-500 dark:text-gray-400 text-sm"
      >
        Депозит
      </h3>
      <AccountCard
        v-for="account in accounts.filter(
          ({ type }) => type === AccountTypeEnum.deposit
        )"
        :key="account.id"
        :bank-name="account.bank_name"
        :account-name="account.account_name"
        :balance="account.balance"
        :currency="account.currency"
        :plan="account.plan"
      />
    </div>
    <div
      class="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[24px] p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
    >
      <h3
        class="absolute top-0 -mt-3 ml-3 bg-[#fafafa] dark:bg-gray-900 px-2 z-10 text-gray-500 dark:text-gray-400 text-sm"
      >
        Накопительный счет
      </h3>
      <AccountCard
        v-for="account in accounts.filter(
          ({ type }) => type === AccountTypeEnum.savings
        )"
        :key="account.id"
        :bank-name="account.bank_name"
        :account-name="account.account_name"
        :balance="account.balance"
        :currency="account.currency"
        :plan="account.plan"
        :interest-rate="account.interest_rate"
      />
    </div>
    <div
      class="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[24px] p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
    >
      <h3
        class="absolute top-0 -mt-3 ml-3 bg-[#fafafa] dark:bg-gray-900 px-2 z-10 text-gray-500 dark:text-gray-400 text-sm"
      >
        Вклад
      </h3>
      <AccountCard
        v-for="account in accounts.filter(
          ({ type }) => type === AccountTypeEnum.investment
        )"
        :key="account.id"
        :bank-name="account.bank_name"
        :account-name="account.account_name"
        :balance="account.balance"
        :currency="account.currency"
        :plan="account.plan"
        :interest-rate="account.interest_rate"
      />
    </div>
    <div
      class="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[24px] p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
    >
      <h3
        class="absolute top-0 -mt-3 ml-3 bg-[#fafafa] dark:bg-gray-900 px-2 z-10 text-gray-500 dark:text-gray-400 text-sm"
      >
        Кредит
      </h3>
      <AccountCard
        v-for="account in accounts.filter(
          ({ type }) => type === AccountTypeEnum.credit
        )"
        :key="account.id"
        :bank-name="account.bank_name"
        :account-name="account.account_name"
        :balance="account.balance"
        :currency="account.currency"
        :plan="account.plan"
        :interest-rate="account.interest_rate"
      />
    </div>
  </div>
</template>

<style></style>
