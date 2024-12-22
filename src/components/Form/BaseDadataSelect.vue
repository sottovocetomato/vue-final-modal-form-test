<template>
  <div class="form-field">
    <input
      class="input-group base-input"
      v-model.trim="value"
      type="text"
      id="autocomplete-input"
      @input="onInput"
    />
    <label for="autocomplete-input" v-if="label">{{ label }}</label>
    <span v-if="errorMessage" class="input-group-error">
      {{ errorMessage }}
    </span>
    <div class="autocomplete-list" v-if="showList">
      <ul>
        <li
          v-for="org in organizations"
          :key="org.id"
          @click="onOrgSelect(org.unrestricted_value)"
        >
          <p>{{ org.unrestricted_value }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";
import debounce from "lodash.debounce";
import api from "../../../api/index.js";
import { ref } from "vue";

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

const onInput = debounce(sendToDadata, 600);
const organizations = ref([]);
const showList = ref(false);

function onOrgSelect(e) {
  value.value = e;
  showList.value = false;
}

async function sendToDadata() {
  try {
    const query = value.value;
    const data = await api.post(
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party",
      JSON.stringify({ query }),
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Token " + "78226a2d974b9837eb74ab3c9e03179f39ba68aa",
        },
      }
    );

    organizations.value = data?.data?.suggestions;
    showList.value = true;
    console.log(data?.data?.suggestions);
  } catch (e) {
    console.error(e);
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
.autocomplete-list {
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
.autocomplete-list ul {
}
.autocomplete-list li {
  font-size: var(--font-sm);
  font-weight: 500;
  padding: 10px 20px;
}
.autocomplete-list li:hover {
  background-color: rgba(153, 152, 152, 0.15);
  cursor: pointer;
}
</style>
