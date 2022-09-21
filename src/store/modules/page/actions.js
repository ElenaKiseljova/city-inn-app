import getFetchData from "@/assets/js/getFetchData";

export default {
  setPageName(context, payload) {
    context.commit('setPageName', payload);
  },
  async setNextPage(context, payload) {
    const curLang = payload.curLang;

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
                : (path === '/en/sitemap.xml' || path === '/sitemap.xml')
                  ? '/sitemap'
                  : path;

    let url = '';

    url = `${path}`;

    const responsePageData = await getFetchData(url);

    if (responsePageData) {
      const lang = responsePageData.content.language === 'ua' ? 'uk' : responsePageData.content.language;

      // Update Header
      let responseHeaderData = await context.getters.header;
      if (!responseHeaderData || curLang !== lang) {
        responseHeaderData = await context.dispatch('setNewHeader', { lang: lang });
      }

      // Update Footer
      let responseFooterData = await context.getters.footer;
      if (!responseFooterData || curLang !== lang) {
        responseFooterData = await context.dispatch('setNewFooter', { lang: lang });
      }

      // Update Contacts
      let responseConatctsData = await context.getters.contacts;
      if (!responseConatctsData || curLang !== lang) {
        responseConatctsData = await context.dispatch('setNewContacts', { lang: lang });
      }

      context.commit('setNextPage', responsePageData);

      if (responseHeaderData && responseFooterData && responseConatctsData) {
        // console.log(lang, curLang, responseHeaderData, responseFooterData, responseConatctsData);

        return true;
      }
    }

    return false;
  },
  async setPage(context, payload) {
    try {
      const curLang = payload.curLang;
      const path = payload.url;
      const pageName = payload.pageName;

      const pageObj = await context.getters.nextPage;

      if (!pageObj) {
        const message = `Error: No page data`;

        throw new Error(message);
      }

      const lang = pageObj.content.language === 'ua' ? 'uk' : pageObj.content.language;

      // Update meta
      const oldMeta = await context.getters.meta.items;
      const newMeta = {
        lang: lang,
        title: pageObj.content.seoTitle,
        items: [
          ...oldMeta,
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
      await context.dispatch('setLang', lang);

      // Update Header
      const header = await context.getters.header;
      if (!header || curLang !== lang) {
        const newHeader = await context.getters.newHeader;

        if (newHeader) {
          await context.dispatch('setHeader', newHeader);
        }
      }

      // Update Footer
      const footer = await context.getters.footer;
      if (!footer || curLang !== lang) {
        const newFooter = await context.getters.newFooter;

        if (newFooter) {
          await context.dispatch('setFooter', newFooter);
        }
      }

      // Update Contacts
      const contacts = await context.getters.contacts;
      if (!contacts || curLang !== lang) {
        const newContacts = await context.getters.newContacts;

        if (newContacts) {
          await context.dispatch('setContacts', newContacts);
        }
      }

      // Update pageName
      await context.dispatch('setPageName', pageName);

      // Update page
      context.commit('setPage', pageObj);
    } catch (error) {
      console.error(error);
    }
  },
};