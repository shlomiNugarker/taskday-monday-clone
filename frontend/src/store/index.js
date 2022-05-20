import { createStore } from 'vuex'
import boardModule from './modules/board-module'
import userdModule from './modules/user-module'

// create a store instance
const store = createStore({
  strict: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    boardModule,
    userdModule,
  },
})

export default store
