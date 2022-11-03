import { createRouter, createWebHistory } from 'vue-router';
import store from './store';

import {
  DEVICE_WIDTH,
  DESKTOP_WIDTH,
} from './assets/js/modules/gsap-animations';
import { scrollbar } from './assets/js/modules/bodyScrollbar';

const HomePage = () => import('./pages/HomePage.vue');
const AboutHotel = () => import('./pages/AboutHotel.vue');
const ConferenceService = () => import('./pages/ConferenceService.vue');
const ConferenceHall = () => import('./pages/ConferenceHall.vue');
const GroupRequest = () => import('./pages/GroupRequest.vue');
const LobbyBar = () => import('./pages/LobbyBar.vue');
const RestaurantSviatoslav = () => import('./pages/RestaurantSviatoslav.vue');
const RoomsHotel = () => import('./pages/RoomsHotel.vue');
const RoomsItem = () => import('./pages/RoomsItem.vue');
const SmartOffer = () => import('./pages/SmartOffer.vue');
const StarfitComplex = () => import('./pages/StarfitComplex.vue');
const TextPage = () => import('./pages/TextPage.vue');
const NotFound = () => import('./pages/NotFound.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: HomePage,
      meta: {
        pageName: 'home',
      },
    },
    {
      name: 'Home En',
      path: '/en/',
      alias: ['/en'],
      component: HomePage,
      meta: {
        pageName: 'home',
      },
    },
    {
      path: '/about',
      alias: ['/about/'],
      component: AboutHotel,
      meta: {
        pageName: 'about',
      },
    },
    {
      path: '/en/about',
      alias: ['/en/about/'],
      component: AboutHotel,
      meta: {
        pageName: 'about',
      },
    },
    {
      name: 'Conference Service',
      path: '/conference-service',
      alias: ['/conference-service/'],
      component: ConferenceService,
      meta: {
        pageName: 'conference-service',
      },
    },
    {
      name: 'Conference Service En',
      path: '/en/conference-service',
      alias: ['/en/conference-service/'],
      component: ConferenceService,
      meta: {
        pageName: 'conference-service',
      },
    },
    {
      name: 'Conference Hall',
      path: '/conference-service/:id',
      component: ConferenceHall,
      props: true,
      meta: {
        pageName: 'conference',
      },
    },
    {
      name: 'Conference Hall En',
      path: '/en/conference-service/:id',
      component: ConferenceHall,
      props: true,
      meta: {
        pageName: 'conference',
      },
    },
    {
      path: '/group-request',
      alias: ['/group-request/'],
      component: GroupRequest,
      meta: {
        pageName: 'group',
      },
    },
    {
      path: '/en/group-request',
      alias: ['/en/group-request/'],
      component: GroupRequest,
      meta: {
        pageName: 'group',
      },
    },
    {
      path: '/lobby-bar',
      alias: ['/lobby-bar/'],
      component: LobbyBar,
      meta: {
        pageName: 'lobby',
      },
    },
    {
      path: '/en/lobby-bar',
      alias: ['/en/lobby-bar/'],
      component: LobbyBar,
      meta: {
        pageName: 'lobby',
      },
    },
    {
      path: '/restaurant-sviatoslav',
      alias: ['/restaurant-sviatoslav/'],
      component: RestaurantSviatoslav,
      meta: {
        pageName: 'restaurant',
      },
    },
    {
      path: '/en/restaurant-sviatoslav',
      alias: ['/en/restaurant-sviatoslav/'],
      component: RestaurantSviatoslav,
      meta: {
        pageName: 'restaurant',
      },
    },
    {
      name: 'Rooms',
      path: '/rooms',
      alias: ['/rooms/'],
      component: RoomsHotel,
      meta: {
        pageName: 'rooms',
      },
    },
    {
      name: 'Rooms En',
      path: '/en/rooms',
      alias: ['/en/rooms/'],
      component: RoomsHotel,
      meta: {
        pageName: 'rooms',
      },
    },
    {
      name: 'Room',
      path: '/rooms/:id',
      component: RoomsItem,
      props: true,
      meta: {
        pageName: 'standart',
      },
    },
    {
      name: 'Room En',
      path: '/en/rooms/:id',
      component: RoomsItem,
      props: true,
      meta: {
        pageName: 'standart',
      },
    },
    {
      path: '/smart-offer',
      alias: ['/smart-offer/'],
      component: SmartOffer,
      meta: {
        pageName: 'smart',
      },
    },
    {
      path: '/en/smart-offer',
      alias: ['/en/smart-offer/'],
      component: SmartOffer,
      meta: {
        pageName: 'smart',
      },
    },
    {
      path: '/starfit',
      alias: ['/starfit/'],
      component: StarfitComplex,
      meta: {
        pageName: 'starfit',
      },
    },
    {
      path: '/en/starfit',
      alias: ['/en/starfit/'],
      component: StarfitComplex,
      meta: {
        pageName: 'starfit',
      },
    },
    {
      path: '/privacy-policy',
      alias: ['/privacy-policy/'],
      component: TextPage,
      meta: {
        pageName: 'text-page',
      },
    },
    {
      path: '/en/privacy-policy',
      alias: ['/en/privacy-policy/'],
      component: TextPage,
      meta: {
        pageName: 'text-page',
      },
    },
    {
      path: '/public-offer',
      alias: ['/public-offer/'],
      component: TextPage,
      meta: {
        pageName: 'text-page',
      },
    },
    {
      path: '/en/public-offer',
      alias: ['/en/public-offer/'],
      component: TextPage,
      meta: {
        pageName: 'text-page',
      },
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (DEVICE_WIDTH >= DESKTOP_WIDTH && scrollbar) {
      if (to.path !== from.path) {
        scrollbar.setPosition(0, 0);

        if (to.hash) {
          setTimeout(() => {
            scrollbar.scrollIntoView(document.querySelector(to.hash), {
              onlyScrollIfNeeded: true,
            });
          }, 600);
        }
      } else {
        if (to.hash) {
          scrollbar.scrollIntoView(document.querySelector(to.hash), {
            onlyScrollIfNeeded: true,
          });
        }
      }
    } else {
      if (to.hash) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              el: to.hash,
              behavior: 'smooth',
            });
          }, 600);
        });
      }

      if (savedPosition) {
        return savedPosition;
      }
    }

    return { left: 0, top: 0 };
  },
});

let curLang;

router.beforeEach(async (to, _, next) => {
  await store.dispatch('setRouteChanged', false);

  curLang = store.getters.lang;

  const nextPageIsSet = await store.dispatch('setNextPage', {
    url: to.path,
    curLang,
  });

  if (nextPageIsSet) {
    next();
  } else {
    switch (to.name) {
      case 'Room':
        next({ name: 'Rooms' });

        break;

      case 'Room En':
        next({ name: 'Rooms En' });

        break;

      case 'Conference Hall':
        next({ name: 'Conference Service' });

        break;

      case 'Conference Hall En':
        next({ name: 'Conference Service En' });

        break;

      default:
        if (to.params.notFound) {
          const path404 = curLang === 'uk' ? '/404' : `/${curLang}/404`;

          await store.dispatch('setNextPage', { url: path404, curLang });

          next();
        } else {
          next(false);
        }

        break;
    }
  }
});

router.afterEach(async (to) => {
  await store.dispatch('setPage', {
    url: to.path,
    curLang,
    pageName: to.meta.pageName || '404',
  });

  await store.dispatch('setRouteChanged', true);

  if (to.params.notFound) {
    // Редирект с 404 на Главную через 10 с
    const notFoundTimeout = setTimeout(() => {
      curLang = store.getters.lang;

      const homePath = curLang === 'uk' ? '/' : `/${curLang}`;

      router.replace({ path: homePath });

      clearTimeout(notFoundTimeout);
    }, 10000);
  }
});

export default router;
