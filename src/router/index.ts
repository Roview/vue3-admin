import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import localCatch from '../utils/catch'
import { firstMenu } from '../utils/map-menus'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* login */ '@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import(/* login */ '@/views/main/index.vue')
  },
  //404
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/not-found/not-found.vue')
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
    if (to.path === '/main') {
      //直接重定向到firstMenu
      return firstMenu.url
    }
  }
})

export default router
