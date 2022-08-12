import { createRouter, createWebHistory } from 'vue-router';

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
    },
    {
      path: '/about',
      component: AboutHotel,
    },
    {
      path: '/conference-service',
      component: ConferenceService,
    },
    {
      path: '/conference-hall',
      component: ConferenceHall,
    },
    {
      path: '/group-requests',
      component: GroupRequests,
    },
    {
      path: '/lobby-bar',
      component: LobbyBar,
    },
    {
      path: '/RestaurantSviatoslav',
      component: RestaurantSviatoslav,
    },
    {
      path: '/RoomsHotel',
      component: RoomsHotel,
    },
    {
      path: '/RoomsHotel/:id',
      component: StandartDouble,
      props: true,
    },
    {
      path: '/smart-offer',
      component: SmartOffer,
    },
    {
      path: '/StarfitComplex',
      component: StarfitComplex,
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
});

export default router;