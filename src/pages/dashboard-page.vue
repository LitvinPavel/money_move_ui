<script setup lang="ts">
import { onMounted } from "vue";
import { useAccount } from "@/composables/useAccount";

enum AccountTypeEnum {
  deposit = "deposit",
  savings = "savings",
  investment = "investment",
  credit = "credit",
}

const {
  error,
  loading,
  accounts,
  refresh,
  totalBalance,
  getTotalBalance,
  createAccount,
  updateAccount,
  deleteAccount,
} = useAccount();

const selectType = ref<AccountTypeEnum>(AccountTypeEnum.deposit);
const showAddAccountModal = ref<boolean>(false);

onMounted(() => {
  getTotalBalance({ groupBy: "bank_name" });
});

function onAddAccount(type: AccountTypeEnum) {
  selectType.value = type;
  showAddAccountModal.value = true;
}
</script>

<template>
  <div>
    <div class="flex flex-col 2xl:flex-row 2xl:space-x-[48px]">
      <section class="2xl:flex-1 order-2 2xl:order-1 space-y-[24px]">
        <h3 class="text-gray-500 dark:text-gray-400">Депозиты</h3>
        <div class="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-[24px]">
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
          <AddCard @click.native="onAddAccount(AccountTypeEnum.deposit)" />
        </div>
        <h3 class="text-gray-500 dark:text-gray-400">Накопительные счета</h3>
        <div class="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-[24px]">
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
          <AddCard @click="onAddAccount(AccountTypeEnum.savings)" />
        </div>
        <h3 class="text-gray-500 dark:text-gray-400">Вклады</h3>
        <div class="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-[24px]">
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
          <AddCard />
        </div>
        <h3 class="text-gray-500 dark:text-gray-400">Кредиты</h3>
        <div class="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-[24px]">
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
          <AddCard />
        </div>
      </section>
      <section
        class="2xl:w-[400px] w-full flex flex-col 2xl:space-x-0 lg:space-x-6 space-x-0 2xl:mb-0 mb-6 order-1 2xl:order-2"
      >
        <SummaryCardTotal />

        <div
          v-if="totalBalance"
          class="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-1 gap-[24px]"
        >
          <SummaryCard
            v-for="(item, index) in Object.keys(totalBalance)"
            :key="index"
            :name="item"
            :value="totalBalance[item]"
          />
        </div>
      </section>
    </div>
  </div>
  <AccountCreateModal
    v-model:visible="showAddAccountModal"
    :type="selectType"
    headline="Создание аккаунта"
    @refresh="refresh"
  />
</template>

<style scoped></style>
