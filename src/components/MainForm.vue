<template>
  <form @submit.prevent="sendForm" class="">
    <div class="fields">
      <BaseDadataSelect
        name="org"
        label="Наименование организации / ИП"
      ></BaseDadataSelect>
      <BaseInput
        name="phone"
        label="Контактный телефон"
        mask="+7 (###) ###-##-##"
      ></BaseInput>
      <BaseSelect name="roomType" label="Тип помещения"></BaseSelect>
      <BaseInput name="address" label="Адрес"></BaseInput>
      <BaseRange name="roomSquare" label="Площадь помещения (м2)"></BaseRange>
      <BaseRange name="date" type="date" label="Дата начала аренды" />
    </div>
    <BaseButton type="submit">Отправить форму</BaseButton>
  </form>
</template>

<script setup>
import BaseRange from "@/components/Form/BaseRange.vue";
import BaseButton from "@/components/Form/BaseButton.vue";
import { useForm } from "vee-validate";
import { computed, ref } from "vue";
import BaseInput from "@/components/Form/BaseInput.vue";
import BaseSelect from "@/components/Form/BaseSelect.vue";
import BaseDadataSelect from "@/components/Form/BaseDadataSelect.vue";

const validationSchema = computed(() => ({
  email: "email",
}));

const { handleSubmit, isSubmitting } = useForm({
  initialValues: {
    email: "",
  },
  validationSchema,
});
const sendForm = handleSubmit(async (values, actions) => {
  try {
    console.log(values, "values");
  } catch (e) {
    console.log(e, "errors");
  }
});
</script>

<style scoped></style>
