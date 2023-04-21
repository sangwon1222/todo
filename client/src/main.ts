import { createApp } from "vue";
import { router } from "./router/index";
import "./assets/css/style.scss";
import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.mount("#app");
