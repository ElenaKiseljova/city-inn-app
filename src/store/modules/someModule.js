/*
	Модуль отличается отсутствием функции createStore, также наличием опции namespaced. Указав namespaced: true мы даём модулю своё пространство имён, таким образом,
	в разных модулях у нас могут быть state, getters, mutations, actions с одинаковыми названиями. При импорте state/getters/mutations/actions в компонент нужно будет
	указать название модуля. Например:
	import { mapActions } from 'vuex';
	...
	methods: {
		...mapActions('module-name', ['action'])
	}
*/

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {},
};
