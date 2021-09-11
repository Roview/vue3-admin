import { Module } from 'vuex'
import { IRootState, ILoginState } from '../types'
import {
  accountLoginRequest,
  LoginUserInfoRequest,
  requestUserMenuByRoleId
} from '../../network/login'
import localCatch from '../../utils/catch'
// IRootState: index 里面state的类型    ILoginState 当前的类型
const ILoginState: Module<ILoginState, IRootState> = {
  namespaced: true, //模块给个命名空间
  state() {
    return {
      token: '',
      userInfo: ''
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
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
      console.log(userInfoMenu)
    }
  }
}
export default ILoginState
