import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState } from './types'
import login from './login/login'
import systemModule from './system/system'
import { IStoreType } from '../interface/requestInterface'
const store = createStore<IRootState>({
  state() {
    return {
      name: 'ccc',
      age: 20
    }
  },
  mutations: {},
  actions: {},
  //导入模块IStoreType
  modules: {
    login,
    systemModule
  }
})
export default store

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}
//调用这个方法 指定这个方法返回值，返回useStore的别名
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
