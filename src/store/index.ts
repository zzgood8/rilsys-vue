import { createStore } from 'vuex'

// 导出store
export default createStore({
  state: {
    // 用户令牌
    token: localStorage.getItem('token') ? localStorage.getItem('userToken') : '',
    // 权限列表
    authority: [],
  },
  getters: {
    getToken (state) {
      return state.token
    },
    getAuthority (state) {
      return state.authority
    }
  },
  mutations: {
    // 设置用户token
    setToken (state, token) {
      state.token = token
    },
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
