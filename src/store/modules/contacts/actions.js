import getFetchData from "@/assets/js/modules/getFetchData";

export default {
  async setNewContacts(context, payload) {
    let url = '';
    let lang = payload.lang;
    let path = '/contacts';

    if (lang === 'uk' || lang === 'ua') {
      lang = '';
    } else {
      lang = `/${lang}`;
    }

    url = `${lang}${path}`;

    const responseData = await getFetchData(url);

    if (responseData) {
      context.commit('setNewContacts', responseData);

      return true;
    }

    return false;
  },
  async setContacts(context, payload) {
    await context.commit('setContacts', payload);
  },
};