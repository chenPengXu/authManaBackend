import Vue from 'vue'
import Vuex from 'vuex'
import NavStore from './modules/nav'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    nav: NavStore,
  },
})

export function getName([...modules]) {
  return modules.join('/')
}
