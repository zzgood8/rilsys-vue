import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 基本路由
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
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
      }
    ]
  }
]

// 异步路由,通过鉴权动态添加
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/layout/HomeLayout.vue'),
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/HomeIndex.vue'),
        meta: {
          title: '首页',
          icon: 'UserOutlined'
        }
      },
      {
        path: '/config',
        redirect: '/config/user',
        meta: {
          title: '系统设置',
          icon: 'UserOutlined'
        },
        children: [
          {
            path: '/config/user',
            component: () => import('@/views/home/HomeIndex.vue'),
            meta: {
              title: '用户管理',
              icon: 'UserOutlined'
            }
          },
          {
            path: '/config/role',
            component: () => import('@/views/home/HomeIndex.vue'),
            meta: {
              title: '角色管理',
              icon: 'UserOutlined'
            }
          },
          {
            path:'/config/permission',
            component: () => import('@/views/home/HomeIndex.vue'),
            meta: {
              title: '权限管理',
              icon: 'UserOutlined'
            }
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
