import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  namespaced: false,
  state() {
    return {
      lang: localStorage.getItem('lang')
        ? localStorage.getItem('lang')
        : window.navigator.language === 'uk'
        ? 'uk'
        : 'en',
      isSetLang: false,
    };
  },
  mutations,
  actions,
  getters,
};
