<template>
  <button :class="['btn', customClass]" :disabled="disabled" :type="type">
    <slot></slot>
  </button>
</template>

<script setup>
const {
  disabled = false,
  type = "button",
  customClass = "",
} = defineProps({
  type: String,
  customClass: String,
  disabled: Boolean,
});
</script>

<style scoped></style>
