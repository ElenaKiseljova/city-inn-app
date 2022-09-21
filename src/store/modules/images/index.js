import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  namespaced: false,
  state() {
    return {
      images: 0,
    };
  },
  mutations,
  actions,
  getters
}