import getFetchData from "@/assets/js/getFetchData";

export default {
  async setNewFooter(context, payload) {
    let url = '';
    let lang = payload.lang;
    let path = '/footer';

    if (lang === 'uk' || lang === 'ua') {
      lang = '';
    } else {
      lang = `/${lang}`;
    }

    url = `${lang}${path}`;

    const responseData = await getFetchData(url);

    if (responseData) {
      context.commit('setNewFooter', responseData);

      return true;
    }

    return false;
  },
  async setFooter(context, payload) {
    await context.commit('setFooter', payload);
  },
};