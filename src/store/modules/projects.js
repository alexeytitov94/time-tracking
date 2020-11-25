import axios from 'axios'

const Projects = {
  namespaced: true,
  state: {
    projects: null,
    type: 'me',
    users: null,
    load: false,
    isAnalytics: false,
    analytics: null,
    historyUser: null,
  },
  actions: {
    async getProjects({ commit, dispatch }) {
      dispatch('getUsers')
      const { data } = await axios.post('https://b24apps.ru/local/b24apps/project/stockwell/time-tracking/project/get/', this.state.user)
      
      commit('setProjects', data)
    },
    async createProject({ dispatch }, project) {
      await axios.post('https://b24apps.ru/local/b24apps/project/stockwell/time-tracking/project/create/', project)
      dispatch('getProjects')
    },
    async editProject({ state, dispatch }, project) {
      await axios.post('https://b24apps.ru/local/b24apps/project/stockwell/time-tracking/project/edit/', project)
      state.projects = state.projects.map((item) => {
        console.log(item)
        if (item.idProject === project.idProject) {
          item.title = project.title
          item.linkProject = project.linkProject
          item.active = project.active
        }
        return item
      })
      dispatch('toggleActiveProject', project)
    },
    async toggleActiveProject({ state }, project) {
      state.load = false
      await axios.post('https://b24apps.ru/local/b24apps/project/stockwell/time-tracking/project/status/', {
        user: this.state.user,
        status: project.active,
        idProject: project.idProject
      })
    },
    async deleteProject({ state, dispatch }, project) {
      state.load = false
      await axios.post('https://b24apps.ru/local/b24apps/project/stockwell/time-tracking/project/delete/', {
        idProject: project.idProject
      })
      dispatch('getProjects')
    },
    async changeTime({ state, commit }, project) {
      state.load = false
      const { data } = await axios.post('https://b24apps.ru/local/b24apps/project/stockwell/time-tracking/project/time/', project)

      if (project.type === 'open') {
        commit('setIdTimeForProject', {
          ...project,
          idTable: data.id
        })
      }
    },
    async getHistory({ commit }) {
      const { data } = await axios.post('https://b24apps.ru/local/b24apps/project/stockwell/time-tracking/project/history/get/', this.state.user)
      commit('setHistoryUser', data)
    },
    async deleteHistory({ dispatch }, id) {
      await axios.post('https://b24apps.ru/local/b24apps/project/stockwell/time-tracking/project/history/delete/', id)
      dispatch('getHistory');
    },
    async getUsers({ commit }) {
      const { data } = await axios.post('https://b24apps.ru/local/b24apps/project/stockwell/time-tracking/project/users/get/')
      commit('setUsers', data)
    },
    async addNewUser({ state }, name) {
      state.load = false
      await axios.post('https://b24apps.ru/local/b24apps/project/stockwell/time-tracking/project/users/add/', {
        idUser: this.state.user,
        name: name,
        avatar: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
      })
    },
    async formirationAnalytics({ commit }, anal) {  
      commit('setIsAnalytics')
      const { data } = await axios.post('https://b24apps.ru/local/b24apps/project/stockwell/time-tracking/project/analytics/get/', anal)
      commit('setAnalytics' , data)
      commit('setIsAnalytics')
    }
  },
  mutations: {
    setUsers(state, users) {
      state.users = users

      let isNewUser = true
      for (let user of users) {
        if (this.state.user == user.idUser) {
          isNewUser = false
        }
      }

      if (isNewUser) {
        console.log('Новый пользователь ежжи')
        this.state.isNewUser = isNewUser
      }
    },
    setProjects(state, projects) {
      state.projects = projects
    },
    setType(state, type) {
      state.type = type
    },
    setIdTimeForProject(state, data) {
      state.projects = state.projects.map((item) => {
        if (item.idProject == data.idProject) {
          item[data.field] = {
            id: data.idTable,
            time: 1
          }
        }
        return item
      })
      console.log(data)
      console.log(state.projects)
    },
    setHistoryUser(state, data) {
      state.historyUser = data
    },
    setIsAnalytics(state) {
      state.isAnalytics = !state.isAnalytics
    },
    setAnalytics(state, data) {
      state.analytics = data
    }
  },
  getters: {},
}

export default Projects
