<script lang="ts" setup>
import { Turnstile } from "@sctg/turnstile-vue3";
import Cookies from "js-cookie";
import { onMounted, ref } from "vue";

const logo = ref(null);
const token = ref<string | null>(null);
const access = Cookies.get("access");
const key = import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY;
if (access == "1") {
  window.location.replace("//www.xiaoyuan151.com");
}
onMounted(() => {
  show_logo("/logo/checking.webm", 11, 12);
});

function show_logo(url, width, height) {
  const video = logo.value;
  video.src = url;
  video.style = "width: " + width * 8 + "px; height: " + height * 8 + "px";
  video.load();
  video.play().catch(() => {});
}

const success = () => {
  fetch("/api/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: token.value }),
  }).then((response) => {
    if (response.status === 200) {
      show_logo("/logo/success.webm", 10, 10);
      document.getElementById("title").innerHTML = "Successful";
      document.getElementById("description").innerHTML =
        "Evil think you are a real human. Continue browsing.";
      document.getElementById("widget").innerHTML =
        "Waiting for page response...";
      Cookies.set("access", "1", { expires: 0.0208 });
      location.reload();
    } else {
      show_logo("/logo/filtered.webm", 10, 10);
      document.getElementById("title").innerHTML = "Filtered";
      document.getElementById("description").innerHTML =
        "Evil think you aren't a real human. Request filtered.";
      document.getElementById("widget").innerHTML = "";
    }
  });
};
</script>
<template>
  <div class="container">
    <div id="logo" class="logo">
      <video ref="logo" autoplay loop muted playsinline style=""></video>
    </div>
    <div class="title">
      <h1 id="title">Processing...</h1>
      <h2 id="description">Please wait while Evil is checking your browser.</h2>
    </div>
    <div id="widget" class="turnstile">
      <Turnstile v-model="token" :site-key="key" @complete="success" />
    </div>
  </div>
</template>
<style scoped>
.container {
  font-family: Arial, sans-serif;
}

.logo {
  top: auto;
  left: auto;
}

.logo video {
  border-radius: 10px;
}

.title {
  top: auto;
  left: auto;
}

.title h1 {
  font-size: xx-large;
}

.title h2 {
  font-size: larger;
}

.turnstile {
  top: auto;
  left: auto;
}
</style>
