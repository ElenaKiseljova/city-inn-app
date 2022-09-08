import { createApp } from 'vue'; // defineAsyncComponent

import App from './App.vue';

import router from './router.js';
import store from './store/index';

const app = createApp(App);

app.use(router);
app.use(store);

const appMount = async () => {
  await router.isReady();

  app.mount('#app');
};

appMount();


