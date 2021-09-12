import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ILoadingInstance } from 'element-plus'
import { ILoginState } from '../store/types'

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
}
//交叉类型 两种类型都有useStore方法就可以使用2种方法
export type IStoreType = IRootWithModule & ILoginState
