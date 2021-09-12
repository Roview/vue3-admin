import { createStore } from 'vuex'
import { IRootState } from './types'
import login from './login/login'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'ccc',
      age: 20
    }
  },
  mutations: {},
  actions: {},
  //导入模块
  modules: {
    login
  }
})
export default store

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}
