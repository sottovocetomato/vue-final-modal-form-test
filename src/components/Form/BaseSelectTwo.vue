<template>
  <div class="form-field">
    <input
      class="input-group base-select"
      :value="optionsText"
      type="text"
      id="base-select-input"
      :placeholder="placeholder"
      @click="toggleList"
    />
    <label for="base-select-input" v-if="label">{{ label }}</label>
    <span v-if="errorMessage" class="input-group-error">
      {{ errorMessage }}
    </span>
    <div class="base-select-list" v-show="showList">
      <ul>
        <li
          v-for="opt in options"
          :key="opt.value"
          class="base-select-list__option"
          @click="onOptionSelect(opt, $event)"
        >
          <p>{{ opt.text }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";
import { ref } from "vue";

const model = defineModel();
const {
  id = "select-input",
  name = "",
  options = [],
  customClass = "",
  placeholder = "placeholder",
  label = "",
  multiple = false,
  disabled = false,
} = defineProps({
  id: String,
  name: String,
  disabled: Boolean,
  options: Array,
  customClass: String,
  placeholder: String,
  label: String,
  multiple: Boolean,
  modelValue: [String, Number, Object, Array],
});

const showList = ref(false);

const optionsText = ref([]);

function toggleList() {
  showList.value = !showList.value;
}

function onOptionSelect(opt, e) {
  console.log(e.target);
  if (multiple) {
    e.target.classList.toggle("selected");
    if (Array.isArray(value.value)) {
      if (value.value.includes(opt.value)) {
        value.value = value.value.filter((value) => value !== opt.value);
      } else {
        value.value.push(opt.value);
      }
    } else {
      value.value = [opt.text];
    }
    if (Array.isArray(optionsText.value)) {
      if (optionsText.value.includes(opt.text)) {
        optionsText.value = optionsText.value.filter(
          (text) => text !== opt.text
        );
      } else {
        optionsText.value.push(opt.text);
      }
    } else {
      optionsText.value = [opt.text];
    }
  } else {
    value.value = opt;
    optionsText.value = opt.text;
    toggleList();
  }
}

const { value, errorMessage } = useField(() => name);
</script>

<style scoped>
.autocomplete-wrap label {
  font-size: var(--font-md);
  margin-bottom: 2rem;
}
.autocomplete-wrap input {
  padding: 1.2rem;
  border-radius: 1rem;
  border: 1px solid #ccc;
}
.autocomplete-wrap input:focus {
  outline: 1px solid #999898;
}
.base-select-list {
  position: absolute;
  width: 100%;
  height: 250px;
  padding: var(--spacer) 0;
  top: 85%;
  left: 50%;
  transform: translateX(-50%);
  border: var(--input-group-border);
  overflow-y: scroll;
  border-radius: 1rem;
  z-index: 100;
  background: white;
}

.base-select-list li {
  position: relative;
  font-size: var(--font-sm);
  font-weight: 500;
  padding: 10px 20px;
}
.base-select-list li p {
  pointer-events: none;
}
.base-select-list li:hover {
  background-color: rgba(153, 152, 152, 0.15);
  cursor: pointer;
}
</style>
