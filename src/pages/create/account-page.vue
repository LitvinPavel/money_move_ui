<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAccount } from "@/composables/useAccount";
import { AccountTypeEnum } from "@/models/account";

const router = useRouter();
const { loading, formCreateData, accountTypeList, createAccount } =
  useAccount();

function onSubmit(): void {
  createAccount(() => router.push({ name: "WalletPage" }));
}
</script>
<template>
  <div class="max-w-2xl mx-auto">
    <base-wrapper headline="Создание аккаунта">
      <form class="space-y-4" @submit.prevent="onSubmit">
        <BankSelect v-model="formCreateData.bank_bic" />
        <FormFieldInput
          v-model="formCreateData.account_name"
          id="account_name"
          label="Название"
          required
          placeholder="Введите название счета"
        />
        <FormFieldSelect
          v-model="(formCreateData.type as string)"
          id="type"
          label="Тип"
          required
          :options="accountTypeList"
          option-key="id"
          option-value="title"
        />
        <FormFieldFloatInput
          v-model="formCreateData.initialBalance"
          id="initialBalance"
          label="Баланс"
        />
        <FormFieldFloatInput
          v-if="formCreateData.type !== AccountTypeEnum.deposit"
          v-model="formCreateData.interest_rate"
          :max="100"
          id="interest_rate"
          label="Процентная ставка"
        />
        <FormFieldFloatInput
          v-model="formCreateData.plan"
          :max="100"
          id="plan"
          label="Планируемые зачисления (% от общей суммы поступлений в мес.)"
        />
        <FormFieldCheckbox
          v-model="formCreateData.is_salary"
          id="is_salary"
          label="Зарплатный счет"
        />
        <base-button type="submit" :disabled="loading"> Отправить </base-button>
      </form>
    </base-wrapper>
  </div>
</template>
<style></style>
