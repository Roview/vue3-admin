import { Module } from 'vuex'
import { IRootState, ILoginState } from '../types'
import {
  accountLoginRequest,
  LoginUserInfoRequest,
  requestUserMenuByRoleId
} from '../../network/login'
import { mapMenusToRoutes } from '../../utils/map-menus'
import localCatch from '../../utils/catch'
import router from '../../router'
// IRootState: index 里面state的类型    ILoginState 当前的类型   IRootState其实是总模块里面的类型 name和age的类型
const ILoginState: Module<ILoginState, IRootState> = {
  namespaced: true, //模块给个命名空间
  state() {
    return {
      token: '',
      userInfo: '',
      userMenus: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      //将当前的路由映射到children
      const routes = mapMenusToRoutes(userMenus) //用户路由与路由表的内容所匹配将匹配的路由拿出来
      //将router.main.children  遍历routes 将所有的路由添加进router中
      routes.forEach((route) => {
        console.log(34, route)
        router.addRoute('main', route)
      })
    }
  },
  getters: {},
  actions: {
    //  账号登陆
    async accountLoginAction({ commit }, payload: any) {
      console.log('触发执行方法', payload)
      const loginResult = await accountLoginRequest(payload)
      console.log(21, loginResult)
      const { id, token } = loginResult.data
      console.log(id, token)
      commit('changeToken', token)
      localCatch.setCatch('token', token)
      //获取用户信息
      const userInfoResult = await LoginUserInfoRequest(id)
      console.log(userInfoResult.data)
      commit('changeUserInfo', userInfoResult.data)
      localCatch.setCatch('userInfo', userInfoResult.data)
      //请求用户菜单
      const userInfoMenu = await requestUserMenuByRoleId(
        userInfoResult.data.role.id
      )
      commit('changeUserMenus', userInfoMenu.data)
      localCatch.setCatch('userMenus', userInfoMenu.data)
      console.log(userInfoMenu)
      //跳转首页路由
      router.push('/main')
    },
    //刷新获取token
    loadLocalLogin({ commit }) {
      const token = localCatch.getCatch('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCatch.getCatch('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCatch.getCatch('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}
export default ILoginState
