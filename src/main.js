import './assets/tailwind.css';
import pinia from './store';

import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
app.use(pinia);
app.mount('#app');
