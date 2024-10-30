import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

// vue-router
import { router } from "./routes";

// pinia
import { createPinia } from "pinia";
const pinia = createPinia();

// vue-toastification
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

createApp(App).use(vuetify).use(router).use(pinia).use(Toast).mount("#app");
