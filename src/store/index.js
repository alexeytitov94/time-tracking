import Vue from "vue";
import Vuex from "vuex";

import projects from '@/store/modules/projects'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAdmin: false,
    user: null,
    isSetting: false,
    isHistory: false,
    isAnalytics: false,
    isNewUser: false,
  },
  actions: {},
  mutations: {
    setIsSetting(state) {
      state.isSetting = !state.isSetting
    },
    setIsHistory(state) {
      state.isHistory = !state.isHistory
    },
    setIsAnalytics(state) {
      state.isAnalytics = !state.isAnalytics
    },
    setIsNewUser(state) {
      state.isNewUser = !state.isNewUser
    },
    setUser(state, id) {
      if (id === 1) {
        state.isAdmin = true
      }
      state.user = id
    }
  },
  getters: {},
  modules: {
    namespaced: true,
    projects,
  },
})