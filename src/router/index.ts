import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import localCatch from '../utils/catch'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    component: () => import(/* login */ '@/views/login/login.vue')
  },
  {
    path: '/main',
    component: () => import(/* login */ '@/views/main/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to) => {
  console.log(to)
  if (to.path !== '/login') {
    console.log('login')
    const token = localCatch.getCatch('token')
    console.log(token)
    if (!token) {
      return '/login'
    }
  }
})

export default router
