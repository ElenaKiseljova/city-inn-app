import { createRouter, createWebHistory } from 'vue-router';
import store from './store';

const HomePage = () => import('./pages/HomePage.vue');
const AboutHotel = () => import('./pages/AboutHotel.vue');
const ConferenceService = () => import('./pages/ConferenceService.vue');
const ConferenceHall = () => import('./pages/ConferenceHall.vue');
const GroupRequests = () => import('./pages/GroupRequests.vue');
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
      path: '/about',
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
      path: '/conference-hall',
      component: ConferenceHall,
      meta: {
        pageName: 'conference',
      },
    },
    {
      path: '/group-requests',
      component: GroupRequests,
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
      path: '/RestaurantSviatoslav',
      component: RestaurantSviatoslav,
      meta: {
        pageName: 'restaurant',
      },
    },
    {
      path: '/RoomsHotel',
      component: RoomsHotel,
      meta: {
        pageName: 'rooms',
      },
    },
    {
      path: '/RoomsHotel/:id',
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
      path: '/StarfitComplex',
      component: StarfitComplex,
      meta: {
        pageName: 'starfit',
      },
    },
    {
      path: '/:notFound(.*)',
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

  if (!store.getters.header) {
    store.dispatch('setHeader');
  }

  next();
});

export default router;