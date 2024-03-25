import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { provideAppToast } from "./Toast";
import "vue-toastification/dist/index.css";
library.add(faShoppingCart);

const app = createApp(App);
const pinia = createPinia();
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(provideAppToast);

app.use(router).use(pinia);
app.mount("#app");
