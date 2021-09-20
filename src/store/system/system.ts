import { Module } from 'vuex'
import { IRootState, ISystemState } from '../types'
import { getPageListData } from '../../network/login'
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true, //命名空间
  state() {
    return {
      userList: [],
      userCount: 0
    }
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    }
  },
  actions: {
    async getPageListAction({ commit }, payLoad: any) {
      console.log(payLoad)
      //user发送请求
      const PageListData = await getPageListData(
        payLoad.pageUrl,
        payLoad.queryInfo
      )
      console.log(20, PageListData)
      const { list, totalCount } = PageListData.data
      commit('changeUserList', list)
      commit('changeUserCount', totalCount)
    }
  }
}

export default systemModule
