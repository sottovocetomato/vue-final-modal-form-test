<template>
  <div class="form-field">
    <select
      :name="name"
      :id="id"
      :multiple="multiple"
      v-model="value"
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
    <label :for="id" v-if="label">{{ label }}</label>
    <span v-if="errorMessage" class="input-group-error">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";

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
  modelValue: [String, Number, Object, Array],
});
const { value, errorMessage } = useField(() => name);
</script>

<style scoped></style>
