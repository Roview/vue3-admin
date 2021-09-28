import hyRequest from '../index'
import {
  IDDataType,
  ILoginResult,
  loginType
} from '../../interface/requestinterface'

enum loginAPI {
  AccountLogin = '/login', //登陆
  LoginUserInfo = '/users/', //请求用户信息
  UserMenus = '/role/' //获取菜单
}
//account:账号和密码
export function accountLoginRequest(account: loginType) {
  return hyRequest.post<IDDataType<ILoginResult>>({
    //返回值约束
    url: loginAPI.AccountLogin,
    data: account
  })
}
//根据id请求用户数据
export function LoginUserInfoRequest(id: number) {
  return hyRequest.get<IDDataType>({
    url: loginAPI.LoginUserInfo + id
  })
}
//请求菜单的
export function requestUserMenuByRoleId(id: number) {
  return hyRequest.get<IDDataType>({
    url: loginAPI.UserMenus + id + '/menu'
  })
}
export function getPageListData(url: string, queryInfo: any) {
  return hyRequest.post<IDDataType>({
    url: url,
    data: queryInfo
  })
}
//根据每个用户删除id
export function deletePageDataById(url: string) {
  return hyRequest.delete<IDDataType>({
    url: url
  })
}
//创建用户
export function createPageData(url: string, newData: any) {
  return hyRequest.post<IDDataType>({
    url: url,
    data: newData
  })
}
//编辑用户
export function updatePageData(url: string, editData: any) {
  return hyRequest.patch<IDDataType>({
    url: url,
    data: editData
  })
}
