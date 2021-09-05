import HYRequest from './request'

const hyRequest = new HYRequest({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 2000,
  interceptors: {
    requestInterceptor: (config) => {
      const token = ''
      if (token) {
        config.headers.authorization = `Bearer ${token}`
      }
      console.log('请求成功的拦截2')
      return config
    },
    requestInterceptorCatch: (error) => {
      console.log('失败的拦截')
      return error
    },
    responseInterceptor: (config) => {
      console.log('响应成功的拦截1')
      return config
    },
    responseInterceptorCatch: (error) => {
      console.log('响应失败的拦截')
      return error
    }
  }
})
export default hyRequest
