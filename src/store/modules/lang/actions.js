export default {
  setLang(context, payload) {
    context.commit('setLang', payload);
  },
  updateIsSetLang(context) {
    context.commit('updateIsSetLang');
  },
};