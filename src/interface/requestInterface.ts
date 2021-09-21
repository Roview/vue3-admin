import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ILoadingInstance } from 'element-plus'
import { ILoginState, ISystemState } from '../store/types'
import systemModule from '../store/system/system'

export interface HYRequestInterceptors<T = AxiosResponse> {
  requestInterceptor: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch: (error: any) => any
  responseInterceptor: (config: T) => T
  responseInterceptorCatch: (error: any) => any
}
export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors<T>
  showLoading?: ILoadingInstance | boolean
}
export default interface dataType {
  data: any
  returnCode: string
  success: boolean
}
export interface loginType {
  name: string
  password: number
}
export interface ILoginResult {
  id: number
  name: string
  token: string
}
export interface IDDataType<T = any> {
  code: number
  data: T
}
export interface IRootWithModule {
  login: ILoginState
  systemModule: ISystemState
}
//交叉类型 两种类型都有useStore方法就可以使用2种方法
export type IStoreType = IRootWithModule & ILoginState

type IFormType = 'input' | 'password' | 'select' | 'datepicker'
export interface IFormItem {
  field: string
  type: IFormType //决定当前是什么类型
  label: string
  rules?: any[]
  placeholder?: any
  options?: any[]
  otherOptions?: any //特殊的属性 可能是字符串或者数组
}
export interface IForm {
  formItem?: IFormItem[]
  labelWidth?: any
  itemStyle?: any
  colLayout?: any
}
export interface IBreadcrumb {
  name: string
  path?: string
}
