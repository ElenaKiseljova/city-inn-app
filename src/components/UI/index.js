import { defineAsyncComponent } from 'vue';

import BaseLang from './BaseLang.vue';
import BaseNavigation from './BaseNavigation.vue';
import BasePagination from './BasePagination.vue';
import BaseScrollTopButton from './BaseScrollTopButton.vue';
import BaseService from './BaseService.vue';
import BaseServices from './BaseServices.vue';
import BaseSocial from './BaseSocial.vue';
import BaseSpinner from './BaseSpinner.vue';
import BaseImage from './BaseImage.vue';
import BaseButton from './BaseButton.vue';
import BaseLogo from './BaseLogo.vue';

const BasePrice = defineAsyncComponent(() => import('./BasePrice.vue'));
const BaseWorktime = defineAsyncComponent(() => import('./BaseWorktime.vue'));

const components = [
  {
    name: 'BaseButton',
    component: BaseButton,
  },
  {
    name: 'BaseImage',
    component: BaseImage,
  },
  {
    name: 'BaseLang',
    component: BaseLang,
  },
  {
    name: 'BaseLogo',
    component: BaseLogo,
  },
  {
    name: 'BaseNavigation',
    component: BaseNavigation,
  },
  {
    name: 'BasePagination',
    component: BasePagination,
  },
  {
    name: 'BasePrice',
    component: BasePrice,
  },
  {
    name: 'BaseScrollTopButton',
    component: BaseScrollTopButton,
  },
  {
    name: 'BaseService',
    component: BaseService,
  },
  {
    name: 'BaseServices',
    component: BaseServices,
  },
  {
    name: 'BaseSocial',
    component: BaseSocial,
  },
  {
    name: 'BaseSpinner',
    component: BaseSpinner,
  },
  {
    name: 'BaseWorktime',
    component: BaseWorktime,
  },
];

export default {
  install(app) {
    components.forEach(({ name, component }) => {
      app.component(name, component);
    });
  },
};
