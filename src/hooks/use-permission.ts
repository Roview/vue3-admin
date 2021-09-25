import { useStore } from 'vuex'
//判断当前我传进去的用户在不在我们所有的用户权限里  结果并转成布尔值
export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permissions = store.state.login.perMissions
  const verifyPermission = `system:${pageName}:${handleName}`
  //第一步现将结果转成布尔值   然后在对布尔值就行取反
  return !!permissions.find((item: any) => item === verifyPermission)
}
