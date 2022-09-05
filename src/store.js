import { createStore } from 'vuex';

import meta from './assets/js/meta';
import { map } from './assets/js/map';

/**
 * Test Start
 */
// import __pages from './assets/js/__pages';

/**
 * Test End
 */

// const replceLineBreakSymbolsForJsonValidFormat = (text) => {
//   const changedText = text.replace(/\r\n/g, '\\r\\n');

//   return changedText;
// };

const urlAPI = `https://city-inn-app-25969-default-rtdb.firebaseio.com`; //`https://admin.city-inn.com.ua/api`; // 

const getFetchData = async (url) => {
  let response;
  let responseData;

  try {
    response = await fetch(url);

    if (!response.ok) {
      const message = `Error: ${response.status}`;

      throw new Error(message);
    }

    responseData = await response.json();

    if (!responseData.status || responseData.status !== 'success') {
      const message = `Error: ${responseData.error}`;

      throw new Error(message);
    }

    return responseData;
  } catch (error) {
    console.log(response);
  }
};

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
      browser: null,
      routeChanged: false,
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
    setBrowser(state, payload) {
      state.browser = payload;
    },
    setRouteChanged(state, payload) {
      state.routeChanged = payload;
    },
  },
  actions: {
    setAnimationTriggers(context, payload) {
      context.commit('setAnimationTriggers', payload);
    },
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

      url = `${urlAPI}${lang}${path}.json`;

      const responseData = await getFetchData(url);

      if (responseData) {
        context.commit('setHeader', responseData);
      }
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

      url = `${urlAPI}${lang}${path}.json`;

      const responseData = await getFetchData(url);

      if (responseData) {
        context.commit('setFooter', responseData);
      }
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

      url = `${urlAPI}${lang}${path}.json`;

      const responseData = await getFetchData(url);

      if (responseData) {
        context.commit('setContacts', responseData);
      }
    },
    async setGoogle(context, payload) {
      const key = payload.key;
      const lang = payload.lang;

      const google = await map(key, lang);

      context.commit('setGoogle', google);
    },
    async setNextPage(context, payload) {
      let path = payload.url;

      path = path === '/'
        ? '/index'
        : (path === '/en/' || path === '/en')
          ? '/en/index'
          : path === '/conference-service'
            ? '/conference-service/index'
            : path === '/en/conference-service'
              ? '/en/conference-service/index'
              : path === '/rooms'
                ? '/rooms/index'
                : path === '/en/rooms'
                  ? '/en/rooms/index'
                  : path;

      let url = '';

      url = `${urlAPI}${path}.json`;

      const responseData = await getFetchData(url);

      if (responseData) {
        context.commit('setNextPage', responseData);

        return true;
      }

      return false;
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

      await context.dispatch('setMeta', newMeta);

      // Update lang
      const lang = pageObj.content.language;

      await context.dispatch('setLang', lang);

      // Update Header
      if (!context.getters.header || curLang !== context.getters.lang) {
        await context.dispatch('setHeader', { lang: context.getters.lang });
      }

      // Update Footer
      if (!context.getters.footer || curLang !== context.getters.lang) {
        await context.dispatch('setFooter', { lang: context.getters.lang });
      }

      // Update Contacts
      if (!context.getters.contacts || curLang !== context.getters.lang) {
        await context.dispatch('setContacts', { lang: context.getters.lang });
      }

      // Update pageName
      await context.dispatch('setPageName', pageName);

      // Set page
      context.commit('setPage', pageObj);
    },
    async setBrowser(context, payload) {
      await context.commit('setBrowser', payload);
    },
    setRouteChanged(context, payload) {
      context.commit('setRouteChanged', payload);
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
    browser(state) {
      return state.browser;
    },
    routeChanged(state) {
      return state.routeChanged;
    },
  },
});

export default store;