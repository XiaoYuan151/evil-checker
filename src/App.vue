<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import Check from "./components/Check.vue";
import Continue from "./components/Continue.vue";
import Cookies from "js-cookie";

let token = Cookies.get("access");
if (!token) {
  const route = useRoute();
  token = computed(() => route.query.token);
}
</script>
<template>
  <div>
    <div v-if="!token">
      <Check />
    </div>
    <div v-else-if="token === '1'">
      <Continue />
    </div>
  </div>
</template>
