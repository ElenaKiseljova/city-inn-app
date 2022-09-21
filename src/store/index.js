import { createStore } from 'vuex';

import langModule from './modules/lang/index';
import metaModule from './modules/meta/index';
import headerModule from './modules/header/index';
import footerModule from './modules/footer/index';
import pageModule from './modules/page/index';
import mapModule from './modules/map/index';
import contactsModule from './modules/contacts/index';
import browserModule from './modules/browser/index';
import routeChangedModule from './modules/routeChanged/index';
import imagesModule from './modules/images/index';

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
  },
});

export default store;