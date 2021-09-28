import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState } from './types'
import login from './login/login'
import systemModule from './system/system'
import { IStoreType } from '../interface/requestInterface'
import { getPageListData } from '../network/login'
import dashboardModule from './analysis/dashboard'
const store = createStore<IRootState>({
  state() {
    return {
      name: 'ccc',
      age: 20,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeInitialDataAction(state, list) {
      state.entireDepartment = list
    },
    changeInitialRoleAction(state, list) {
      state.entireRole = list
    },
    changeInitialMenuAction(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    //请求所有的部门数据
    async getInitialDataAction({ commit }) {
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data // 别名  departmentList=list
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      console.log(40, roleResult)
      const { list: roleList } = roleResult.data // 别名  departmentList=list
      //请求完整菜单
      const menuResult = await getPageListData('/menu/list', {})
      console.log(43, menuResult)
      const { list: entireMenuList } = menuResult.data
      //保存数据
      commit('changeInitialDataAction', departmentList)
      commit('changeInitialRoleAction', roleList)
      commit('changeInitialMenuAction', entireMenuList)
    }
  },
  //导入模块IStoreType
  modules: {
    login,
    systemModule,
    dashboardModule
  }
})
export default store

//在主函数中 运行就会先加载
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  //可能会出现token是异步的,token没有取到，这里的值已经请求了
  // store.dispatch('getInitialDataAction')
}
//调用这个方法 指定这个方法返回值，返回useStore的别名
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
