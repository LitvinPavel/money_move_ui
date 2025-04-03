<script setup lang="ts">
import { defineModel, watch } from "vue";
import { useAccount } from "@/composables/useAccount";

enum AccountTypeEnum {
  deposit = "deposit",
  savings = "savings",
  investment = "investment",
  credit = "credit",
}

const { error, loading, formCreateData, createAccount } = useAccount();

export interface Props {
  headline: string;
  type: AccountTypeEnum;
}

export type Emits = {
  (e: "refresh"): void;
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const visible = defineModel<boolean>("visible");

watch(
  () => props.type,
  (type) => {
    if (type) {
      formCreateData.value.type = type;
    }
  }
);

function onClose() {
  visible.value = false;
}

function onSave() {
  createAccount(() => {
    emit("refresh");
    onClose();
  });
}
</script>

<template>
  <base-modal :visible="!!visible" :headline="headline" @close="onClose">
    <form class="space-y-6" @submit.prevent="onSave">
      <FormField
        v-model="formCreateData.account_name"
        id="account_name"
        label="Название"
        required
      />
      <FormField
        v-model="formCreateData.bank_name"
        id="bank_name"
        label="Банк"
        required
      />
      <FormField
        v-model="formCreateData.initialBalance"
        id="balance"
        label="Баланс"
        type="number"
        required
      />
      <FormField
        v-if="formCreateData.type !== AccountTypeEnum.deposit"
        v-model="formCreateData.interest_rate"
        id="interest_rate"
        label="Процентная става"
        type="number"
        required
      />
      <!-- <FormFieldSelect
        v-model="formCreateData.type"
        id="type"
        label="Тип"
        :options="Object.keys(AccountTypeEnum)"
        required
      /> -->
      <base-button type="submit" :disabled="loading" classes="w-full">
        {{ loading ? "Добавляется..." : "Добавить" }}
      </base-button>
    </form>
  </base-modal>
</template>

<style scoped></style>
