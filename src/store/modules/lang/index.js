import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  namespaced: false,
  state() {
    return {
      lang: window.navigator.language === 'uk' ? 'uk' : 'en',
    };
  },
  mutations,
  actions,
  getters
}