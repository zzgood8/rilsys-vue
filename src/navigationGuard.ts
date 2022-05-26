import store from './store'
import router, { routes, asyncRoutes } from './router'
import { apiGetUserPermission } from '@/api/user'
import { message } from 'ant-design-vue'
import _ from 'lodash'
import { RouteRecordRaw } from 'vue-router'

let asyncRouterFlag = 0
const baseRoutes: string[] = []

// 递归初始化基础路由
const getBaseRouters = (params: RouteRecordRaw[]) => {
  params.forEach(item => {
    baseRoutes.push(item.path)
    if (item.children) {
      getBaseRouters(item.children)
    }
  })
}
getBaseRouters(routes)

/**
 * 导航守卫
 * 页面跳转鉴权
 */
router.beforeEach(async (to, from, next) => {
  // 去登陆页直接放行
  if (baseRoutes.indexOf(to.path) !== -1) {
    next()
  } else {
    // 没有用户凭证,跳转至登录页
    const token = localStorage.getItem('token')
    if (!token) {
      message.error('无法获取登录凭证,请登录!!!')
      next('/login')
    } else {
      // 判断是否获取过权限,如果没有,则获取
      if (asyncRouterFlag === 0) {
        asyncRouterFlag++
        await apiGetUserPermission()
          .then(res => {
            if (res.data.code === 200) {
              store.commit('setAuthority', res.data.data)
              addRouter()
              next({ ...to, replace: true })
            } else if (res.data.code === 401) {
              next('/login')
            } else if (res.data.code === 403) {
              next('/403')
            } else {
              next(false)
            }
          })
      } else {
        // 鉴权访问
        const authority = store.getters.getAuthority || []
        if (authority.indexOf(to.fullPath) === -1) {
          next('/403')
        } else {
          next()
        }
      }
    }
  }
})

// 添加路由
const addRouter = () => {
  filterRouter(asyncRoutes, store.getters.getAuthority).forEach(item => {
    router.addRoute(item)
  })
  router.addRoute({
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  })
}

// 通过权限列表添加路由
const filterRouter = (routers: RouteRecordRaw[], authority: Array<string>): RouteRecordRaw[] => {
  const res: RouteRecordRaw[] = []
  let temp
  routers.forEach(item => {
    temp = _.cloneDeep(item)
    delete temp.children
    if (authority.indexOf(temp.path) !== -1 || temp.path === '/') {
      if (item.children) {
        temp.children = filterRouter(item.children, authority)
      } else {
        temp.children = []
      }
      res.push(temp)
    }
  })
  return res
}
