import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ILoadingInstance } from 'element-plus'

export interface HYRequestInterceptors {
  requestInterceptor: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch: (error: any) => any
  responseInterceptor: (config: AxiosResponse) => AxiosResponse
  responseInterceptorCatch: (error: any) => any
}
export interface HYRequestConfig extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors
  showLoading?: ILoadingInstance | boolean
}
export default interface dataType {
  data: any
  returnCode: string
  success: boolean
}
