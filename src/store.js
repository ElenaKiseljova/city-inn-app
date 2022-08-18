import { createStore } from 'vuex';
import meta from './assets/js/meta';
import { map } from './assets/js/map';
import __pages from './assets/js/__pages';

const store = createStore({
  state() {
    return {
      pageName: 'home',
      lang: 'uk',
      meta: {
        lang: 'uk',
        title: 'City Inn',
        items: [
          {
            name: 'robots',
            content: 'index, follow',
          },
          {
            name: 'description',
            content: 'City Inn - hotel in Lviv',
          },
          {
            property: 'og:title',
            content: 'City Inn',
          },
          {
            property: 'og:type',
            content: 'website',
          },
          {
            property: 'og:url',
            content: window.location.origin,
          },
          {
            property: 'og:site_name',
            content: 'City Inn',
          },
          {
            property: 'og:image',
            content: '/img/menu-bg-0-desktop.jpg',
          },
        ],
      },
      header: null,
      footer: null,
      contacts: null,
      google: null,
      page: null,
      nextPage: null,
    };
  },
  mutations: {
    setPageName(state, payload) {
      state.pageName = payload;
    },
    setLang(state, payload) {
      state.lang = payload;
    },
    setMeta(state, payload) {
      state.meta = payload;
    },
    setHeader(state, payload) {
      state.header = payload;
    },
    setFooter(state, payload) {
      state.footer = payload;
    },
    setContacts(state, payload) {
      state.contacts = payload;
    },
    setGoogle(state, payload) {
      state.google = payload;
    },
    setPage(state, payload) {
      state.page = payload;
    },
    setNextPage(state, payload) {
      state.nextPage = payload;
    },
  },
  actions: {
    setPageName(context, payload) {
      context.commit('setPageName', payload);
    },
    setLang(context, payload) {
      context.commit('setLang', payload);
    },
    setMeta(context, payload) {
      context.commit('setMeta', payload);

      meta(context.getters.meta);
    },
    async setHeader(context, payload) {
      let url = '';
      let lang = payload.lang;
      let path = '/header';

      if (lang === 'uk') {
        lang = '';
      } else {
        lang = `/${lang}`;
      }

      url = `${window.location.origin}/api${lang}${path}`;

      console.log(url);

      // const response = await fetch(url);

      // const responseData = await response.json();

      // if (!response.ok) {
      //   const error = new Error(responseData.message || responseData.error.message || 'Failed to fetch!');

      //   throw error;
      // }

      /* TEST */
      let headerJson = __pages[`${lang}${path}`];
      headerJson = headerJson.replace(/\r\n/g, '\\r\\n');

      const headerObj = JSON.parse(headerJson);
      /* TEST */

      context.commit('setHeader', headerObj);
    },
    async setFooter(context, payload) {
      let url = '';
      let lang = payload.lang;
      let path = '/footer';

      if (lang === 'uk') {
        lang = '';
      } else {
        lang = `/${lang}`;
      }

      url = `${window.location.origin}/api${lang}${path}`;

      console.log(url);

      // const response = await fetch(url);

      // const responseData = await response.json();

      // if (!response.ok) {
      //   const error = new Error(responseData.message || responseData.error.message || 'Failed to fetch!');

      //   throw error;
      // }

      /* TEST */

      let footerJson = __pages[`${lang}${path}`];
      footerJson = footerJson.replace(/\r\n/g, '\\r\\n');

      const footerObj = JSON.parse(footerJson);
      /* TEST */

      context.commit('setFooter', footerObj);
    },
    async setContacts(context, payload) {
      let url = '';
      let lang = payload.lang;
      let path = '/contacts';

      if (lang === 'uk') {
        lang = '';
      } else {
        lang = `/${lang}`;
      }

      url = `${window.location.origin}/api${lang}${path}`;

      console.log(url);

      // const response = await fetch(url);

      // const responseData = await response.json();

      // if (!response.ok) {
      //   const error = new Error(responseData.message || responseData.error.message || 'Failed to fetch!');

      //   throw error;
      // }

      /* TEST */

      let contactsJson = __pages[`${lang}${path}`];
      contactsJson = contactsJson.replace(/\r\n/g, '\\r\\n');

      const contactsObj = JSON.parse(contactsJson);
      /* TEST */

      context.commit('setContacts', contactsObj);
    },
    async setGoogle(context, payload) {
      const key = payload.key;
      const lang = payload.lang;

      const google = await map(key, lang);

      context.commit('setGoogle', google);
    },
    async setNextPage(context, payload) {
      let url = '';

      url = `${window.location.origin}/api${payload.url}`;

      console.log(url);

      // const response = await fetch(url);

      // const responseData = await response.json();

      // if (!response.ok) {
      //   const error = new Error(responseData.message || responseData.error.message || 'Failed to fetch!');

      //   throw error;
      // } 

      /* TEST */
      let pageJson = __pages[payload.url] || __pages['/'];
      pageJson = pageJson.replace(/\r\n/g, '\\r\\n');

      const pageObj = JSON.parse(pageJson);
      /* TEST */

      // Set Next page
      context.commit('setNextPage', pageObj);
    },
    async setPage(context, payload) {
      const path = payload.url;
      const curLang = payload.curLang;
      const pageName = payload.pageName;

      const pageObj = context.getters.nextPage;

      if (!pageObj) {
        return;
      }

      // Update meta
      const newMeta = {
        lang: pageObj.content.language,
        title: pageObj.content.seoTitle,
        items: [
          ...context.getters.meta.items,
          {
            name: 'description',
            content: pageObj.content.seoDescription,
          },
          {
            property: 'og:title',
            content: pageObj.content.seoTitle,
          },
          {
            property: 'og:url',
            content: `${window.location.origin}${path}`,
          },
        ],
      };

      context.dispatch('setMeta', newMeta);

      // Update lang
      const lang = pageObj.content.language;

      context.dispatch('setLang', lang);

      // Update Header
      if (!context.getters.header || curLang !== context.getters.lang) {
        context.dispatch('setHeader', { lang: context.getters.lang });
      }

      // Update Footer
      if (!context.getters.footer || curLang !== context.getters.lang) {
        context.dispatch('setFooter', { lang: context.getters.lang });
      }

      // Update Contacts
      if (!context.getters.contacts || curLang !== context.getters.lang) {
        context.dispatch('setContacts', { lang: context.getters.lang });
      }

      // Update pageName
      context.dispatch('setPageName', pageName);

      // Set page
      context.commit('setPage', pageObj);
    },
  },
  getters: {
    pageName(state) {
      return state.pageName;
    },
    lang(state) {
      return state.lang;
    },
    meta(state) {
      return state.meta;
    },
    header(state) {
      return state.header;
    },
    footer(state) {
      return state.footer;
    },
    contacts(state) {
      return state.contacts;
    },
    page(state) {
      return state.page;
    },
    nextPage(state) {
      return state.nextPage;
    },
    google(state) {
      return state.google;
    },
  },
});

export default store;