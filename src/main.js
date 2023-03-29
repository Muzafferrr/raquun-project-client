import { createApp } from 'vue';
import App from './App.vue'

import router from './router'
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vue3EasyDataTable from 'vue3-easy-data-table';

import 'vue3-easy-data-table/dist/style.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App);
app.config.globalProperties.hostname = "https://localhost:7066";
app.use(router);
app.use(VueAxios, axios);
app.component('EasyDataTable', Vue3EasyDataTable);
app.mount('#app');
