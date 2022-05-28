import { createStore } from 'vuex'
import { RouteRecordRaw } from 'vue-router'

// 导出store
export default createStore({
  state: {
    // 权限列表
    authority: [],
    currentRouter: Object
  },
  getters: {
    getAuthority (state) {
      return state.authority
    },
    getCurrentRouter (state) {
      return state.currentRouter
    }
  },
  mutations: {
    // 设置用户权限,并且渲染路由
    setAuthority (state, authority) {
      state.authority = authority
    },
    setCurrentRouter (state, currentRouter) {
      state.currentRouter = currentRouter
    }
  },
  actions: {
  },
  modules: {
  }
})
