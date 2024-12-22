<template>
  <div class="container">
    <div class="main-wrap">
      <MainForm />
      <button @click="show = true">Open Modal</button>

      <VueFinalModal
        class="confirm-modal"
        content-class="confirm-modal-content"
        overlay-transition="vfm-fade"
        content-transition="vfm-fade"
        v-model="show"
        title="Hello World!"
        @confirm="() => confirm()"
      >
        <p>The content of the modal</p>
      </VueFinalModal>
    </div>
  </div>
</template>

<script setup>
import { VueFinalModal } from "vue-final-modal";
import BaseButton from "@/components/Form/BaseButton.vue";
import { ref } from "vue";
import MainForm from "@/components/MainForm.vue";
const show = ref(false);

function confirm() {
  show.value = false;
}
</script>

<style>
.confirm-modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
.confirm-modal-content {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: #fff;
  border-radius: 0.5rem;
}
.confirm-modal-content > * + * {
  margin: 0.5rem 0;
}
.confirm-modal-content h1 {
  font-size: 1.375rem;
}
.confirm-modal-content button {
  margin: 0.25rem 0 0 auto;
  padding: 0 8px;
  border: 1px solid;
  border-radius: 0.5rem;
}
.dark .confirm-modal-content {
  background: #000;
}
</style>
