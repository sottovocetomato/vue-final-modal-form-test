<template>
  <div class="container">
    <div class="main-wrap">
      <BaseButton @click="toggleModal" class="modal-btn"
        >Открыть модальное окно</BaseButton
      >

      <VueFinalModal
        class="confirm-modal"
        content-class="confirm-modal-content"
        overlay-transition="vfm-fade"
        content-transition="vfm-fade"
        v-model="show"
        title="Form Modal"
        @confirm="toggleModal"
      >
        <MainForm @submit="toggleModal" />
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

function toggleModal() {
  show.value = !show.value;
}
</script>

<style>
.confirm-modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
.confirm-modal-content {
  padding: calc(var(--spacer) * 2);
  background: #fff;
  width: 800px;
  height: 778px;
}
</style>
