import getFetchData from "@/assets/js/getFetchData";

export default {
  async setFooter(context, payload) {
    let url = '';
    let lang = payload.lang;
    let path = '/footer';

    if (lang === 'uk') {
      lang = '';
    } else {
      lang = `/${lang}`;
    }

    url = `${lang}${path}`;

    const responseData = await getFetchData(url);

    if (responseData) {
      context.commit('setFooter', responseData);
    }
  },
};