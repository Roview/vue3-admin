import { Module } from 'vuex'
import { IRootState, ISystemState } from '../types'
import { getPageListData } from '../../network/login'
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true, //命名空间
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.userList
          case 'role':
            return state.roleList
        }
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payLoad: any) {
      console.log(payLoad)
      const pageName = payLoad.pageName
      let pageUrl = ''
      console.log(32, pageUrl, pageName)
      switch (pageName) {
        case 'users':
          pageUrl = '/users/list'
          break
        case 'role':
          pageUrl = '/role/list'
          break
      }
      //user发送请求
      console.log(34, pageUrl)
      const PageListData = await getPageListData(pageUrl, payLoad.queryInfo)
      console.log(20, PageListData)
      const { list, totalCount } = PageListData.data

      //根据我们传来的url动态赋值   传来的小写转成大写

      switch (pageName) {
        case 'users':
          commit(`changeUserList`, list)
          commit(`changeUserCount`, totalCount)
          break
        case 'role':
          commit(`changeRoleList`, list)
          commit(`changeRoleCount`, totalCount)
          break
      }
    }
  }
}

export default systemModule
