import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  namespaced: false,
  state() {
    return {
      google: null,
    };
  },
  mutations,
  actions,
  getters
}