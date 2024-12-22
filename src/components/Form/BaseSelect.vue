<template>
  <div class="input-wrap">
    <label :for="id" v-if="label">{{ label }}</label>
    <select
      :name="name"
      :id="id"
      :multiple="multiple"
      v-model="model"
      class="input-group base-select"
    >
      <option
        v-for="option in options"
        :value="option.value"
        :key="option.value"
      >
        {{ option.text }}
      </option>
    </select>
    <span v-if="errorMessage" class="input-group-error">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";

const model = defineModel();
const {
  id = "select-input",
  name = "",
  options = [],
  customClass = "",
  label = "",
  multiple = false,
  disabled = false,
} = defineProps({
  id: String,
  name: String,
  disabled: Boolean,
  options: Array,
  customClass: String,
  label: String,
  multiple: Boolean,
});
const { value, errorMessage } = useField(() => name);
</script>

<style scoped></style>
