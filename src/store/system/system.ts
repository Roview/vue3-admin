import { Module } from 'vuex'
import { IRootState, ISystemState } from '../types'
import { deletePageDataById, getPageListData } from '../../network/login'
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true, //命名空间
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0,
      //商品列表数据
      goodsList: [],
      goodsCount: 0,
      //菜单的数据
      menuList: [],
      menuCount: 0
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
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
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
          case 'goods':
            return state.goodsList
          case 'menu':
            return state.menuList
        }
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        console.log(41, pageName)
        switch (pageName) {
          case 'users':
            return state.userCount
          case 'role':
            return state.roleCount
          case 'goods':
            return state.goodsCount
          case 'menu':
            return state.menuCount
        }
      }
    }
  },
  actions: {
    async getPageListAction({ commit, getters }, payLoad: any) {
      console.log(42, payLoad)
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
        case 'goods':
          pageUrl = '/goods/list'
          break
        case 'menu':
          pageUrl = '/menu/list'
          break
      }
      //user发送请求
      console.log(34, pageUrl)
      const PageListData = await getPageListData(pageUrl, payLoad.queryInfo)
      console.log(20, PageListData)
      const { list, totalCount } = PageListData.data
      console.log(70, totalCount)
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
        case 'goods':
          commit(`changeGoodsList`, list)
          commit(`changeGoodsCount`, totalCount)
          break
        case 'menu':
          commit(`changeMenuList`, list)
          commit(`changeMenuCount`, totalCount)
          break
      }
      console.log(83, getters.pageListCount('users'))
    },

    //删除列表中的用户
    async deletePageDataAction({ dispatch }, payLoad: any) {
      //获取pageName
      console.log(128, payLoad)
      const { pageName, id } = payLoad
      const pageUrl = `/${pageName}/${id}`
      //请求
      await deletePageDataById(pageUrl)
      //重新请求数据
      dispatch('getPageListAction', {
        pageName: pageName,
        queryInfo: {
          offset: 1,
          size: 10
        }
      })
    }
  }
}
export default systemModule
