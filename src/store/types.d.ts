export interface IRootState {
  name: string
  age: number
}
export interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  perMissions: string[]
}
export interface ISystemState {
  userList: any[]
  userCount: number
  roleList: any[]
  roleCount: number
  goodsList: any[]
  goodsCount: number
  menuList: any[]
  menuCount: number
}
