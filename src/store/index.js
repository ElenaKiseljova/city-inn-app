import { createStore } from 'vuex';

import langModule from './modules/lang/index.js';
import metaModule from './modules/meta/index.js';
import headerModule from './modules/header/index.js';
import footerModule from './modules/footer/index.js';
import pageModule from './modules/page/index.js';
import mapModule from './modules/map/index.js';
import contactsModule from './modules/contacts/index.js';
import browserModule from './modules/browser/index.js';
import routeChangedModule from './modules/routeChanged/index.js';

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
  },
});

export default store;