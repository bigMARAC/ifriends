import GetSubjects from './../requests/GetSubjects.js'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      token: undefined,
      subjects: []
    },
  },
  mutations: {
    setToken(state, token) {
      state.user.token = token
    },
    setUser(state, user) {
      state.user = user
    },
    setSubjects(state, subjects) {
      state.user.subjects = subjects
    },
    saveUser(state) {
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    restoreUser(state) {
      if (localStorage.getItem('user') !== null) {
        state.user = JSON.parse(localStorage.getItem('user'))
        return true
      } else {
        console.log("Erro ao restaurar usuário")
        return false
      }
    }
  },
  actions: {
    triggerSetToken(context, token) {
      context.commit('setToken', token)
    },
    triggerSetUser(context, user) {
      context.commit('setUser', user)
    },
    async loadSubjects(context, token) {
      try {
        const request = new GetSubjects(token)
        const response = await request.send()
        console.log(response.data.data)
        context.commit('setSubjects', response.data.data)
      } catch (error) {
        console.log(error)
      }
    },
    saveUser(context) {
      context.commit('saveUser')
    },
    restoreUser(context) {
      context.commit('restoreUser')
    },
  }
})
