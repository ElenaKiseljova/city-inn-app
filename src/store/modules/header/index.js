import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

export default {
  namespaced: false,
  state() {
    return {
      header: null,
    };
  },
  mutations,
  actions,
  getters
}