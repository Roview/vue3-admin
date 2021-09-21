import { createApp } from 'vue'
import rootApp from './App.vue'

import './network/index.ts'

import { registeredElementPlus } from './plugins'

// import dataType from './interface/requestInterface'
// import 'element-plus/lib/theme-chalk/base.css'
import 'normalize.css'
import './assets/css/index.css'

import './network/request'
import router from './router'
import store from './store'
// import hyRequest from './network'
import { setupStore } from './store'
//全局变量   const app =
const app = createApp(rootApp)
setupStore()
// app.use(ElementPlus)
app.use(store).use(router).mount('#app')
registeredElementPlus(app)
app.use(registeredElementPlus)
//格式化时间   在模版中都可以用这个方法

// hyRequest
//   .get<dataType>({
//     url: '/home/multidata',
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//     interceptors: {
//       requestInterceptor: (res) => {
//         console.log(24, res)
//         return res
//       }
//     },
//     showLoading: false
//   })
//   .then((res) => {
//     console.log(40, res)
//   })
