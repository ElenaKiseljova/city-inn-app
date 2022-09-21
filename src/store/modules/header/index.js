import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  namespaced: false,
  state() {
    return {
      newHeader: null,
      header: null,
    };
  },
  mutations,
  actions,
  getters
}