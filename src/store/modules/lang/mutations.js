export default {
  setLang(state, payload) {
    state.lang = payload;

    localStorage.setItem('lang', payload);
  },
  updateIsSetLang(state) {
    state.isSetLang = true;
  },
};
