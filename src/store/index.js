import { createStore } from 'vuex';

import langModule from './modules/lang';
import metaModule from './modules/meta';
import headerModule from './modules/header';
import footerModule from './modules/footer';
import pageModule from './modules/page';
import mapModule from './modules/map';
import contactsModule from './modules/contacts';
import browserModule from './modules/browser';
import routeChangedModule from './modules/routeChanged';
import imagesModule from './modules/images';
import sliderCounterModule from './modules/sliderCounter';

const store = createStore({
  modules: {
    lang: langModule,
    meta: metaModule,
    header: headerModule,
    footer: footerModule,
    page: pageModule,
    map: mapModule,
    contacts: contactsModule,
    browser: browserModule,
    routeChanged: routeChangedModule,
    images: imagesModule,
    sliderCounter: sliderCounterModule,
  },
});

export default store;
