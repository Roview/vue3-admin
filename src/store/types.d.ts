export interface IRootState {
  name: string
  age: number
  //全部部门
  entireDepartment: []
  //全部角色
  entireRole: []
  //所有菜单不包含用户权限
  entireMenu: []
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
