import getFetchData from "@/assets/js/getFetchData";

export default {
  setPageName(context, payload) {
    context.commit('setPageName', payload);
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

    url = `${path}`;

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
};