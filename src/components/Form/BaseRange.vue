<template>
  <template v-if="type === 'date'">
    <BaseInput
      placeholder="От"
      :name="nameFrom || 'dateStart'"
      type="date"
      :max="dateEnd"
      :key="rangeStartKey"
      v-model="dateStart"
    />
    <BaseInput
      :name="nameTo || 'dateEnd'"
      placeholder="До"
      type="date"
      :min="dateStart"
      :key="rangeEndKey"
      v-model="dateEnd"
    />
  </template>
  <template v-else>
    <BaseInput
      placeholder="От"
      :name="nameFrom || 'rangeStart'"
      type="number"
      :key="rangeStartKey"
      :modelValue="rangeStart"
      @update:modelValue="onRangeStartUpdate"
    />
    <BaseInput
      :name="nameTo || 'rangeEnd'"
      placeholder="До"
      type="number"
      :min="rangeStart"
      :key="rangeEndKey"
      :modelValue="rangeEnd"
      @update:modelValue="onRangeEndUpdate"
    />
  </template>
</template>

<script setup>
import { useField } from "vee-validate";
import BaseInput from "@/components/Form/BaseInput.vue";
import { nextTick, ref } from "vue";
import debounce from "lodash.debounce";

const dateStart = ref(0);
const dateEnd = ref(0);

const rangeStart = ref(0);
const rangeEnd = ref(0);
const rangeStartKey = ref(0);
const rangeEndKey = ref(0);

const {
  nameFrom = "",
  nameTo = "",
  type = "numbers",
  disabled = false,
  customClass = "",
  placeholder = "",
  label = "",
} = defineProps({
  nameFrom: String,
  nameTo: String,
  type: String,
  name: String,
  disabled: Boolean,
  placeholder: String,
  customClass: String,
  label: String,
});
console.log(type, "type");

const onRangeEndUpdate = debounce((e) => {
  if (e < rangeStart.value) {
    rangeEnd.value = rangeStart.value;
    rangeStartKey.value++;
    return;
  }
  rangeEnd.value = e;
}, 350);
const onRangeStartUpdate = debounce((e) => {
  if (e > rangeEnd.value && rangeEnd.value > 0) {
    rangeStart.value = rangeEnd.value;
    rangeEndKey.value++;
    return;
  }
  rangeStart.value = e;
}, 350);
</script>

<style scoped></style>
