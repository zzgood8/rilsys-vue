import store from './store'
import router, { asyncRoutes } from './router'
import { apiGetUserPermission } from '@/api/user'
import { message } from 'ant-design-vue'
import _ from 'lodash'
import { RouteRecordRaw } from 'vue-router'

let asyncRouterFlag = 0;

/**
 * 导航守卫
 * 页面跳转鉴权
 */
router.beforeEach(async (to, from, next) => {
  // 去登陆页直接放行
  if (to.path === '/login') {
    next()
  } else {
    // 没有用户凭证,跳转至登录页
    const token = localStorage.getItem('token')
    if (!token) {
      message.error('无法获取登录凭证,请登录!!!')
      next('/login')
    } else {
      // 判断是否获取过权限,如果没有,则获取
      if (asyncRouterFlag) {
        asyncRouterFlag++
        await apiGetUserPermission()
          .then(res => {
            if (res.data.code === 200) {
              store.commit('setAuthority', res.data.data)
              addRouter()
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
        const authority = store.getters.authority
        if (authority.indexOf(to.fullPath) === -1) {
          next('/403')
        } else {
          next();
        }
      }
    }
  }
})

// 添加路由
const addRouter = () => {
  filterRouter(asyncRoutes, store.getters.getAuthority)
  router.addRoute({
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  })
}

// 通过权限列表添加路由
const filterRouter = (routers: RouteRecordRaw[], authority: Array<string>): RouteRecordRaw[] => {
  const res: RouteRecordRaw[] = []
  let temp
  routers.map(item => {
    temp = _.cloneDeep(item)
    delete temp.children
    if (authority.indexOf(temp.path) !== -1) {
      if (item.children) {
        filterRouter(item.children, authority)
      } else {
        temp.children = []
      }
      res.push(temp)
    }
  })
  return res
}
