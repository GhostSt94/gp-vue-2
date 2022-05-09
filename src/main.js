import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/index";
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import "primevue/resources/themes/saga-blue/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"

import "./style.css";


createApp(App).use(router).use(store).use(PrimeVue).use(ToastService).use(ConfirmationService).mount('#app')
