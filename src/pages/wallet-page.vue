<script setup lang="ts">
import { useAccount } from "@/composables/useAccount";

enum AccountTypeEnum {
  deposit = "deposit",
  savings = "savings",
  investment = "investment",
  credit = "credit",
}

const { accounts, loading } = useAccount();
</script>
<template>
  <BaseLoader v-if="loading" />
  <div v-else-if="!accounts.length" class="p-4">
    <base-card-wrapper headline="Создайте аккаунт">
      <router-link to="create/account">
        <CreateCard />
      </router-link>
    </base-card-wrapper>
  </div>
  <div v-else class="p-4 space-y-6">
    <base-card-wrapper headline="Зарплата">
      <AccountCard
        v-for="account in accounts.filter(
          ({ type, is_salary }) => type === AccountTypeEnum.deposit && is_salary
        )"
        :key="account.id"
        :account="account"
      />
    </base-card-wrapper>
    <base-card-wrapper headline="Депозит">
      <AccountCard
        v-for="account in accounts.filter(
          ({ type, is_salary }) =>
            type === AccountTypeEnum.deposit && !is_salary
        )"
        :key="account.id"
        :account="account"
      />
    </base-card-wrapper>
    <base-card-wrapper headline="Накопительный счет">
      <AccountCard
        v-for="account in accounts.filter(
          ({ type }) => type === AccountTypeEnum.savings
        )"
        :key="account.id"
        :account="account"
      />
    </base-card-wrapper>
    <base-card-wrapper headline="Кредит">
      <AccountCard
        v-for="account in accounts.filter(
          ({ type }) => type === AccountTypeEnum.credit
        )"
        :key="account.id"
        :account="account"
      />
    </base-card-wrapper>
  </div>
</template>

<style></style>
