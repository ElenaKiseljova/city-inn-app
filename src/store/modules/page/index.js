import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  namespaced: false,
  state() {
    return {
      pageName: 'home',
      nextPage: null,
      page: null,
    };
  },
  mutations,
  actions,
  getters
}