import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ILoadingInstance } from 'element-plus'

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
