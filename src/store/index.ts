import { createStore } from 'vuex'
import router, { routes, asyncRoutes } from '@/router'
import { RouteRecordRaw } from 'vue-router'

// 向权限列表添加基础路由
const basePermission = ():Set<string> => {
  const permission:Set<string> = new Set()
  routes.forEach(item => {
    permission.add(item.path)
    if (item.children) {
      item.children.forEach(chil => {
        permission.add(chil.path)
      })
    }
  })
  return permission
}

// 通过权限列表添加路由
const addRouterByPermission = (routeRaw:Array<RouteRecordRaw>, permission:any):Array<RouteRecordRaw> => {
  const res:Array<RouteRecordRaw> = []
  routeRaw.forEach(item => {
    console.log(item.path)
    if (permission.indexOf(item.path) !== -1 || item.path === '/') {
      if (item.children) {
        console.log(addRouterByPermission(item.children, permission))
        item.children = addRouterByPermission(item.children, permission)
      }
      console.log(item)
      res.push(item)
    }
  })
  return res
}

// 导出store
export default createStore({
  state: {
    userToken: localStorage.getItem('userToken') ? localStorage.getItem('userToken') : '',
    permission: basePermission()
  },
  getters: {
    getUserToken (state): string|null {
      return state.userToken
    },
    getUserPermission (state):Set<string> {
      return state.permission
    }
  },
  mutations: {
    // 设置用户token
    setUserToken (state, token) {
      state.userToken = token
    },
    // 设置用户权限,并且渲染路由
    setUserPermission (state, permission) {
      permission.forEach((item: any) => {
        state.permission.add(item)
      })
      addRouterByPermission(asyncRoutes, permission).forEach(item => {
        router.addRoute(item)
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
