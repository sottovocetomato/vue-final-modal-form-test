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
      <BaseSelectTwo
        name="roomType"
        label="Тип помещения"
        :options="selectOptions"
        multiple
      ></BaseSelectTwo>
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
import BaseSelect from "@/components/Form/BaseSelect.vue";
import BaseDadataSelect from "@/components/Form/BaseDadataSelect.vue";
import BaseSelectTwo from "@/components/Form/BaseSelectTwo.vue";

const selectOptions = [
  { text: "Производственная площадь", value: 1 },
  { text: "Торговое", value: 2 },
  { text: "Офисное", value: 3 },
  { text: "Спортивное", value: 4 },
  { text: "Прекрасная комната 1х1 в стиле минимализм недорого", value: 5 },
];

const validationSchema = computed(() => ({
  org: "required",
  email: "email",
  phone: "required",
  roomSquareFrom: "required",
  roomSquareTo: "required",
  address: "required",
  roomSquare: "required",
  dateStart: "required",
  dateEnd: "required",
}));

const { handleSubmit, isSubmitting } = useForm({
  initialValues: {
    org: "",
    email: "",
    phone: "",
    roomType: "",
    address: "",
    roomSquare: "",
    date: "",
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
