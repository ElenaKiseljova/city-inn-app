import getFetchData from "@/assets/js/getFetchData";

export default {
  async setHeader(context, payload) {
    let url = '';
    let lang = payload.lang;
    let path = '/header';

    if (lang === 'uk') {
      lang = '';
    } else {
      lang = `/${lang}`;
    }

    url = `${lang}${path}`;

    const responseData = await getFetchData(url);

    if (responseData) {
      context.commit('setHeader', responseData);
    }
  },
};