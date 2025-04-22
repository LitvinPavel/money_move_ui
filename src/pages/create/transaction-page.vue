<script setup lang="ts">
import { useTransaction } from "@/composables/useTransaction";
import { useAccount } from "@/composables/useAccount";
import { TransactionTypeEnum } from "@/models/transaction";

const {
  loading,
  selectTransactionType,
  formCreateData,
  transactionTypeList,
  createDeposit,
  createWithdrawal,
  createTransfer,
} = useTransaction();

const { accounts } = useAccount();

function onSubmit(): void {
  if (selectTransactionType.value === TransactionTypeEnum.deposit) {
    const { accountId, amount, description, date, is_debt } =
      formCreateData.value;
    if (accountId) {
      createDeposit({
        amount: amount || 0,
        description,
        date,
        is_debt,
        accountId,
      });
    }
  }
  if (selectTransactionType.value === TransactionTypeEnum.withdrawal) {
    const { accountId, amount, description, date, is_debt } =
      formCreateData.value;
    if (accountId) {
      createWithdrawal({
        amount: amount || 0,
        description,
        date,
        is_debt,
        accountId,
      });
    }
  }
  if (selectTransactionType.value === TransactionTypeEnum.transfer) {
    const { accountId, toAccountId, amount, description, date, is_debt } =
      formCreateData.value;
    if (accountId && toAccountId) {
      createTransfer({
        amount: amount || 0,
        description,
        date,
        is_debt,
        fromAccountId: accountId,
        toAccountId,
      });
    }
  }
}
</script>
<template>
  <div class="max-w-2xl mx-auto">
    <base-wrapper headline="Выполнение транзакции">
      <form class="space-y-4" @submit.prevent="onSubmit">
        <FormFieldSelect
          v-model="selectTransactionType"
          id="type"
          label="Тип операции"
          required
          :options="transactionTypeList"
          option-key="id"
          option-value="title"
        />
        <FormFieldSelect
          v-model="formCreateData.accountId"
          id="accountId"
          label="Откуда"
          required
          :options="accounts"
          option-key="id"
          option-value="account_name"
        />
        <FormFieldSelect
          v-show="selectTransactionType === TransactionTypeEnum.transfer"
          v-model="formCreateData.toAccountId"
          id="toAccountId"
          label="Куда"
          required
          :options="accounts"
          option-key="id"
          option-value="account_name"
        />
        <FormFieldFloatInput
          v-model="formCreateData.amount"
          id="amount"
          label="Сумма"
          required
        />

        <FormFieldDate
          v-model="formCreateData.date"
          :max-date="new Date()"
          time-picker
          label="Дата"
        />
        <FormFieldInput
          v-model="formCreateData.description"
          id="description"
          label="Описание"
          placeholder="Описание операции"
        />

        <FormFieldCheckbox
          v-model="formCreateData.is_debt"
          id="is_debt"
          label="Долг"
        />
        <base-button type="submit" :disabled="loading"> Отправить </base-button>
      </form>
    </base-wrapper>
  </div>
</template>
<style></style>
