import store from './store'
import router, { routes, asyncRoutes } from './router'
import { apiGetUserPermission } from '@/api/user'
import { message } from 'ant-design-vue'
import _ from 'lodash'
import { RouteRecordRaw } from 'vue-router'

let asyncRouterFlag = 0
const baseRouter = [
  '/',
  '/login',
  '/403',
  '/404'
]

/**
 * 导航守卫
 * 页面跳转鉴权
 */
router.beforeEach(async (to, from, next) => {
  console.log(to)
  console.log(asyncRouterFlag)
  // 去登陆页直接放行
  if (baseRouter.indexOf(to.path) !== -1) {
    console.log('123456')
    next()
  } else {
    console.log('获取token...')
    // 没有用户凭证,跳转至登录页
    const token = localStorage.getItem('token')
    if (!token) {
      message.error('无法获取登录凭证,请登录!!!')
      next('/login')
    } else {
      console.log('外面...')
      console.log(asyncRouterFlag)
      // 判断是否获取过权限,如果没有,则获取
      if (asyncRouterFlag === 0) {
        console.log('第一次加载权限...')
        asyncRouterFlag++
        await apiGetUserPermission()
          .then(res => {
            if (res.data.code === 200) {
              store.commit('setAuthority', res.data.data)
              addRouter()
              console.log(to)
              next({ ...to, replace: true })
            } else if (res.data.code === 401) {
              next('/login')
            } else if (res.data.code === 403) {
              next('/403')
            } else {
              console.log(res.data)
              next(false)
            }
          })
      } else {
        // 鉴权访问
        const authority = store.getters.getAuthority || []
        console.log()
        console.log(authority)
        if (authority.indexOf(to.fullPath) === -1) {
          next('/403')
        } else {
          console.log('放行了...')
          next()
        }
      }
    }
  }
})

// 添加路由
const addRouter = () => {
  console.log('加载权限...')
  console.log(filterRouter(asyncRoutes, store.getters.getAuthority))
  filterRouter(asyncRoutes, store.getters.getAuthority).forEach(item => {
    router.addRoute(item)
  })
  // router.addRoute({
  //   path: '/:pathMatch(.*)*',
  //   redirect: '/404'
  // })
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
