import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  namespaced: false,
  state() {
    return {
      lang: 'uk',
    };
  },
  mutations,
  actions,
  getters
}