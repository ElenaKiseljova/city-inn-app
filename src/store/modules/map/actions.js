import { map } from '@/assets/js/map';

export default {
  async setGoogle(context, payload) {
    const key = payload.key;
    const lang = payload.lang;

    const google = await map(key, lang);

    context.commit('setGoogle', google);
  },
};