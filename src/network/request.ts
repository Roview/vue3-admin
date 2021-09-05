import axios, { AxiosInstance } from 'axios'
import type {
  HYRequestInterceptors,
  HYRequestConfig
} from '../interface/requestInterface'
import { ElLoading, ILoadingInstance } from 'element-plus'
class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading?: ILoadingInstance | boolean
  loading?: ILoadingInstance

  constructor(config: HYRequestConfig) {
    //创建axios实例
    this.instance = axios.create(config)
    console.log(15, config)
    //保存
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? true
    //config取出的拦截器是对应的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    //添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在加载数据.......',
            background: 'rgba(0, 0, 0, 0.8)'
          })
        }
        this.showLoading = true
        return config
      },
      (error) => {
        return error
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        //loading移除 有loading调用close关闭没有就不去调用
        this.loading?.close()
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败,错误信息')
        } else {
          return data
        }
        console.log('所有实例的拦截器，请求拦截成功')
        return res
      },
      (error) => {
        if (error.response.status === 404) {
          console.log('404错误')
        }
        console.log('所有实例的拦截器，响应拦截成功')
        return error
      }
    )
  }

  request<T>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      console.log(70, config)

      if (!config.showLoading) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  //获取method
  get<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  delete<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  post<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  patch<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
