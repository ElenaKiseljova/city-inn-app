import { createStore } from 'vuex';
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
      page: null,
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
    setPage(state, payload) {
      state.page = payload;
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
    },
    async setHeader(context, payload) {
      let url = '';
      let lang = payload.lang;
      let path = payload.url;

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

      // console.log('header', headerObj);
      /* TEST */

      context.commit('setHeader', headerObj);
    },
    async setFooter(context, payload) {
      let url = '';
      let lang = payload.lang;
      let path = payload.url;

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

      // console.log('footer', footerObj);
      /* TEST */

      context.commit('setFooter', footerObj);
    },
    async setPage(context, payload) {
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

      console.log('page', pageObj);
      /* TEST */

      // Update meta
      const meta = {
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
            content: `${window.location.origin}${payload.url}`,
          },
        ],
      };

      context.commit('setMeta', meta);

      // Update lang
      const lang = pageObj.content.language;

      context.commit('setLang', lang);

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
    page(state) {
      return state.page;
    },
  },
});

export default store;