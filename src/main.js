import { createApp } from 'vue'; // defineAsyncComponent

import App from './App.vue';
import baseComponents from './components/UI';

import router from './router.js';
import store from './store';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(baseComponents);

const appMount = async () => {
  await router.isReady();

  app.mount('#app');
};

appMount();


