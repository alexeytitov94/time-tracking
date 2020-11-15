import Vue from "vue";
import Vuex from "vuex";

import projects from '@/store/modules/projects'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  actions: {},
  mutations: {},
  getters: {},
  modules: {
    namespaced: true,
    projects,
  },
})