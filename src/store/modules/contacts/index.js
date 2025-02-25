import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  namespaced: false,
  state() {
    return {
      newContacts: null,
      contacts: null,
    };
  },
  mutations,
  actions,
  getters
}