import axios from 'axios'

const Projects = {
  namespaced: true,
  state: {
    projects: null,
    projectUsers: null,
  },
  actions: {
    async getProjects({ commit }) {
      const { data } = await axios.post('https://b24apps.ru/local/b24apps/project/stockwell/time-tracking/project/get/', this.state.user)
      commit('setProjects', data)
    },
    async createProject({ dispatch }, project) {
      await axios.post('https://b24apps.ru/local/b24apps/project/stockwell/time-tracking/project/create/', project)
      dispatch('getProjects')
    },
    async editProject({ state }, project) {
      await axios.post('https://b24apps.ru/local/b24apps/project/stockwell/time-tracking/project/edit/', project)
      state.projects = state.projects.map((item) => {
        if (item.idProject === project.id) {
          item.title = project.title
          item.idCompany = project.idCompany
        }
        return item
      })
    },
  },
  mutations: {
    setProjects(state, projects) {
      state.projects = projects.project
      state.projectUsers = projects.projectUser
    },
  },
  getters: {},
}

export default Projects
