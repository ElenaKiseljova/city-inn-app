import getFetchData from "@/assets/js/getFetchData";

export default {
  async setNewHeader(context, payload) {
    let url = '';
    let lang = payload.lang;
    let path = '/header';

    if (lang === 'uk' || lang === 'ua') {
      lang = '';
    } else {
      lang = `/${lang}`;
    }

    url = `${lang}${path}`;

    const responseData = await getFetchData(url);

    if (responseData) {
      context.commit('setNewHeader', responseData);

      return true;
    }

    return false;
  },
  async setHeader(context, payload) {
    await context.commit('setHeader', payload);
  },
};