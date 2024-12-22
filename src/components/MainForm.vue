<template>
  <form @submit.prevent="sendForm" class="">
    <div class="fields">
      <BaseInput name="email" label="Введите email"></BaseInput>
      <BaseRange type="date" />
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
