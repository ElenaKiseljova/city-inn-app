import { createRouter, createWebHistory } from 'vue-router';
import store from './store';



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
      path: '/:notFound(.*)',
      alias: ['/en/:notFound(.*)'],
      redirect: '/',
      component: NotFound,
      meta: {
        pageName: '404',
      },
    },
  ],
  scrollBehavior(to, _2, savedPosition) {
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            el: to.hash,
            behavior: 'smooth',
          })
        }, 600)
      })
    }

    if (savedPosition) {
      return savedPosition;
    }

    return { left: 0, top: 0 };
  }
});

let curLang;

router.beforeEach(async (to, _, next) => {
  curLang = store.getters.lang;

  const nextPageIsSet = await store.dispatch('setNextPage', { url: to.path });

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

      case 'Home':
        next(false);

        break;

      case 'Home En':
        next(false);

        break;

      default:
        if (curLang === 'uk') {
          next({ name: 'Home' });
        } else {
          next({ name: 'Home En' });
        }

        break;
    }
  }
});

router.afterEach(async (to) => {
  await store.dispatch('setPage', { url: to.path, curLang: curLang, pageName: to.meta.pageName });
});

export default router;