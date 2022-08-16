import { createRouter, createWebHistory } from 'vue-router';
import store from './store';
import meta from './assets/js/meta';

const HomePage = () => import('./pages/HomePage.vue');
const AboutHotel = () => import('./pages/AboutHotel.vue');
const ConferenceService = () => import('./pages/ConferenceService.vue');
const ConferenceHall = () => import('./pages/ConferenceHall.vue');
const GroupRequest = () => import('./pages/GroupRequest.vue');
const LobbyBar = () => import('./pages/LobbyBar.vue');
const RestaurantSviatoslav = () => import('./pages/RestaurantSviatoslav.vue');
const RoomsHotel = () => import('./pages/RoomsHotel.vue');
const StandartDouble = () => import('./pages/StandartDouble.vue');
const SmartOffer = () => import('./pages/SmartOffer.vue');
const StarfitComplex = () => import('./pages/StarfitComplex.vue');
const NotFound = () => import('./pages/NotFound.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomePage,
      meta: {
        pageName: 'home',
      },
    },
    {
      path: '/en',
      component: HomePage,
      meta: {
        pageName: 'home',
      },
    },
    {
      path: '/about',
      component: AboutHotel,
      meta: {
        pageName: 'about',
      },
    },
    {
      path: '/en/about',
      component: AboutHotel,
      meta: {
        pageName: 'about',
      },
    },
    {
      path: '/conference-service',
      component: ConferenceService,
      meta: {
        pageName: 'conference-service',
      },
    },
    {
      path: '/en/conference-service',
      component: ConferenceService,
      meta: {
        pageName: 'conference-service',
      },
    },
    {
      path: '/conference-hall',
      component: ConferenceHall,
      meta: {
        pageName: 'conference',
      },
    },
    {
      path: '/en/conference-hall',
      component: ConferenceHall,
      meta: {
        pageName: 'conference',
      },
    },
    {
      path: '/group-request',
      component: GroupRequest,
      meta: {
        pageName: 'group',
      },
    },
    {
      path: '/en/group-request',
      component: GroupRequest,
      meta: {
        pageName: 'group',
      },
    },
    {
      path: '/lobby-bar',
      component: LobbyBar,
      meta: {
        pageName: 'lobby',
      },
    },
    {
      path: '/en/lobby-bar',
      component: LobbyBar,
      meta: {
        pageName: 'lobby',
      },
    },
    {
      path: '/restaurant-sviatoslav',
      component: RestaurantSviatoslav,
      meta: {
        pageName: 'restaurant',
      },
    },
    {
      path: '/en/restaurant-sviatoslav',
      component: RestaurantSviatoslav,
      meta: {
        pageName: 'restaurant',
      },
    },
    {
      path: '/rooms',
      component: RoomsHotel,
      meta: {
        pageName: 'rooms',
      },
    },
    {
      path: '/en/rooms',
      component: RoomsHotel,
      meta: {
        pageName: 'rooms',
      },
    },
    {
      path: '/rooms/:id',
      component: StandartDouble,
      props: true,
      meta: {
        pageName: 'standart',
      },
    },
    {
      path: '/en/rooms/:id',
      component: StandartDouble,
      props: true,
      meta: {
        pageName: 'standart',
      },
    },
    {
      path: '/smart-offer',
      component: SmartOffer,
      meta: {
        pageName: 'smart',
      },
    },
    {
      path: '/en/smart-offer',
      component: SmartOffer,
      meta: {
        pageName: 'smart',
      },
    },
    {
      path: '/starfit',
      component: StarfitComplex,
      meta: {
        pageName: 'starfit',
      },
    },
    {
      path: '/en/starfit',
      component: StarfitComplex,
      meta: {
        pageName: 'starfit',
      },
    },
    {
      path: '/:notFound(.*)',
      alias: ['/en/:notFound(.*)'],
      component: NotFound,
      meta: {
        pageName: '404',
      },
    },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.meta.pageName && store.getters.pageName) {
    store.dispatch('setPageName', to.meta.pageName);
  }

  const curLang = store.getters.lang;

  store.dispatch('setPage', { url: to.href });

  meta(store.getters.meta);

  if (!store.getters.header || curLang !== store.getters.lang) {
    store.dispatch('setHeader', { lang: store.getters.lang, url: '/header' });
  }

  if (!store.getters.footer || curLang !== store.getters.lang) {
    store.dispatch('setFooter', { lang: store.getters.lang, url: '/footer' });
  }

  next();
});

export default router;