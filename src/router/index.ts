import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 基本路由
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    component: () => import('@/layout/BaseLayout.vue'),
    children: [
      {
        path: '/login',
        component: () => import('@/views/LoginPage.vue')
      },
      {
        path: '/401',
        component: () => import('@/views/BasePage401.vue')
      },
      {
        path: '/403',
        component: () => import('@/views/BasePage403.vue')
      },
      {
        path: '/404',
        component: () => import('@/views/BasePage404.vue')
      },
      {
        path: '/:pathMatch(.*)*',
        redirect: '/404'
      }
    ]
  }
  // {
  //   path: '/:pathMatch(.*)*',
  //   redirect: '/404'
  // }
]

// 异步路由,通过鉴权动态添加
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    // redirect: '/home',
    component: () => import('@/layout/HomeLayout.vue'),
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/HomeIndex.vue')
      },
      {
        path: '/config/userConfig',
        component: () => import('@/views/home/sysConfig/UserConfig.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
