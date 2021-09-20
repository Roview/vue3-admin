import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '../interface/requestInterface'

let firstMenu: any = null

//将当前路由映射到数组中
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  //先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  //利用正则获取main文件下的ts文件 中间+true是递归查找所有符合 .ts结尾的文件
  const routeFiles = require.context('../router/main', true, /\.ts/)
  console.log(10, routeFiles)
  //获取匹配的ts文件的路径  key:所有符合ts结尾的文件
  routeFiles.keys().forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const route = require('../router/main' + key.split('.')[1]) //对route/main里面所有路径已.做切割
    allRoutes.push(route.default)
  })
  console.log(17, allRoutes)

  //根据菜单获取需要添加的routes  递归获取匹配的路由
  const _recurseGetRoutes = (Menus: any[]) => {
    for (const menus of Menus) {
      if (menus.type === 2) {
        //判断是不是二级菜单
        const route = allRoutes.find((route) => route.path === menus.url)
        if (route) routes.push(route)
        if (!firstMenu) {
          firstMenu = menus //第一次的值保存起来
        }
      } else {
        _recurseGetRoutes(menus.children) //一级菜单递归
      }
    }
  }
  _recurseGetRoutes(userMenus)
  return routes
}
//匹配当前选择的路由
export function pathMapToMenuCopy(useMenus: any[], currentPath: string): any {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(useMenus, currentPath, breadcrumbs)
  return breadcrumbs
}
//从路由表中查找符合我当前的路由路径  第3个参数是天际的面包屑数组
export function pathMapToMenu(
  useMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const item of useMenus) {
    if (item.type === 1) {
      const findMenu = pathMapToMenu(item.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: item.name, path: item.url }) //添加当前的路由
        breadcrumbs?.push({ name: findMenu.name, path: findMenu.url }) //添加保存好的一级路由
        return findMenu
      }
    } else if (item.type === 2 && item.url === currentPath) {
      return item
    }
  }
}
export { firstMenu }
