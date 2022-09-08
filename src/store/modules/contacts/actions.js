import getFetchData from "@/assets/js/getFetchData";

export default {
  async setContacts(context, payload) {
    let url = '';
    let lang = payload.lang;
    let path = '/contacts';

    if (lang === 'uk') {
      lang = '';
    } else {
      lang = `/${lang}`;
    }

    url = `${lang}${path}`;

    const responseData = await getFetchData(url);

    if (responseData) {
      context.commit('setContacts', responseData);
    }
  },
};