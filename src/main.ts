import { createApp } from 'vue'
import rootApp from './App.vue'
import ElementPlus from 'element-plus'
import './network/index.ts'
import { registeredElementPlus } from './plugins'

import dataType from './interface/requestInterface'

import './network/request'
import router from './router'
import store from './store'
import hyRequest from './network'

//全局变量   const app =
createApp(rootApp).use(ElementPlus).use(store).use(router).mount('#app')

// registeredElementPlus(app)

hyRequest
  .get<dataType>({
    url: '/home/multidata',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    interceptors: {
      requestInterceptor: (res) => {
        console.log(24, res)
        return res
      }
    },
    showLoading: false
  })
  .then((res) => {
    console.log(40, res)
  })
