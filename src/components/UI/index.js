import BaseButton from './BaseButton.vue';
import BaseImage from './BaseImage.vue';
import BaseLang from './BaseLang.vue';
import BaseLogo from './BaseLogo.vue';
import BaseNavigation from './BaseNavigation.vue';
import BasePagination from './BasePagination.vue';
import BasePrice from './BasePrice.vue';
import BaseScrollTopButton from './BaseScrollTopButton.vue';
import BaseService from './BaseService.vue';
import BaseServices from './BaseServices.vue';
import BaseSlide from './BaseSlide.vue';
import BaseSlider from './BaseSlider.vue';
import BaseSocial from './BaseSocial.vue';
import BaseSpinner from './BaseSpinner.vue';
import BaseWorktime from './BaseWorktime.vue';

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
    name: 'BaseSlide',
    component: BaseSlide,
  },
  {
    name: 'BaseSlider',
    component: BaseSlider,
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