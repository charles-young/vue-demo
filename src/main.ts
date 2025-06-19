import { createApp } from 'vue';
import App from './App.vue';
import { setupProviders } from '@/app';
import '@/app/styles/index.css';

const app = createApp(App);

setupProviders(app);

app.mount('#app');