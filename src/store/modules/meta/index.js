import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  namespaced: false,
  state() {
    return {
      meta: {
        lang: 'uk',
        title: 'City Inn',
        items: [
          {
            name: 'robots',
            content: 'index, follow',
          },
          {
            name: 'description',
            content: 'City Inn - hotel in Lviv',
          },
          {
            property: 'og:title',
            content: 'City Inn',
          },
          {
            property: 'og:type',
            content: 'website',
          },
          {
            property: 'og:url',
            content: window.location.origin,
          },
          {
            property: 'og:site_name',
            content: 'City Inn',
          },
          {
            property: 'og:image',
            content: '/img/menu-bg-0-desktop.jpg',
          },
        ],
      },
    };
  },
  mutations,
  actions,
  getters
}