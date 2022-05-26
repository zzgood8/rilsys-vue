import { createStore } from 'vuex'

// 导出store
export default createStore({
  state: {
    // 权限列表
    authority: []
  },
  getters: {
    getAuthority (state) {
      return state.authority
    }
  },
  mutations: {
    // 设置用户权限,并且渲染路由
    setAuthority (state, authority) {
      state.authority = authority
    }
  },
  actions: {
  },
  modules: {
  }
})
