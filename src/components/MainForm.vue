<template>
  <form @submit.prevent="sendForm" class="">
    <div class="fields">
      <BaseDadataSelect
        name="org"
        label="Наименование организации / ИП"
        @select="setAddress"
      ></BaseDadataSelect>
      <BaseInput
        name="phone"
        label="Контактный телефон"
        mask="+7 (###) ###-##-##"
      ></BaseInput>
      <BaseSelect
        name="roomType"
        label="Тип помещения"
        :options="selectOptions"
        multiple
      ></BaseSelect>
      <BaseInput name="address" label="Адрес"></BaseInput>
      <BaseRange
        nameFrom="roomSquareFrom"
        nameTo="roomSquareTo"
        label="Площадь помещения (м2)"
      ></BaseRange>
      <BaseRange type="date" label="Дата начала аренды" />
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

import BaseDadataSelect from "@/components/Form/BaseDadataSelect.vue";
import BaseSelect from "@/components/Form/BaseSelect.vue";
import api from "../../api/index.js";

const selectOptions = [
  { text: "Производственная площадь", value: 1 },
  { text: "Торговое", value: 2 },
  { text: "Офисное", value: 3 },
  { text: "Спортивное", value: 4 },
  { text: "Прекрасная площадь 1х1м2", value: 5 },
];

const validationSchema = computed(() => ({
  org: "required",
  phone: "required|phone",
  roomSquareFrom: "required",
  roomSquareTo: "required",
  address: "required",
  roomType: "required",
  dateStart: "required",
  dateEnd: "required",
}));

const { handleSubmit, isSubmitting, setFieldValue } = useForm({
  initialValues: {
    org: "",
    phone: "",
    roomType: "",
    address: "",
    roomSquareFrom: "",
    roomSquareTo: "",
    dateStart: "",
    dateEnd: "",
  },
  validationSchema,
});
function setAddress(address) {
  setFieldValue("address", address);
}
const sendForm = handleSubmit(async (values, actions) => {
  try {
    console.log(values, "values");
    // Отправляем на бэк
    // const res = await api.post("api/ticket/create", values);
    actions.resetForm();
    alert("Форма отправлена успешно!");
  } catch (e) {
    throw new Error(e);
  }
});
</script>

<style scoped></style>
