import Vue from "vue";
import Vuex from "vuex";

import projects from '@/store/modules/projects'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    isSetting: false,
  },
  actions: {},
  mutations: {
    setIsSetting(state) {
      state.isSetting = !state.isSetting
    },
    setUser(state, id) {
      state.user = id
    }
  },
  getters: {},
  modules: {
    namespaced: true,
    projects,
  },
})