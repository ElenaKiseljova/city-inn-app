import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

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