import { createApp } from "vue";
import { createPinia } from 'pinia'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import App from "./App.vue";
import router from "./router";
import { registerDirectives } from './directives';

const pinia = createPinia();
const app = createApp(App);
registerDirectives(app);
app.component('VueDatePicker', VueDatePicker);
app.use(pinia);
app.use(router);

app.mount("#app");
