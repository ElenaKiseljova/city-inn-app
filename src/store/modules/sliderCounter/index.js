import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  namespaced: false,
  state() {
    return {
      sliderIndex: 0,
    };
  },
  mutations,
  actions,
  getters,
};
