import store from './store'
import router from './router'
import { apiGetUserPermission } from '@/api/user'

/**
 * 导航守卫
 * 页面跳转鉴权
 */
router.beforeEach(async (to, from, next) => {
  console.log(to)
  // 去登陆页直接放行
  if (to.path === '/login') {
    console.log('去登陆页')
    next()
    return
  }

  // 没有用户凭证,跳转至登录页
  const token = store.getters.getUserToken
  if (!token) {
    console.log('用户凭证')
    next('/login')
    return
  }

  // 没有权限,通过异步获取一次权限,如果还没有,返回空,不做任何路由动作
  const permission:Set<string> = store.getters.getPermission

  if (permission.size === 4) {
    console.log('获取权限')
    
    next(to.fullPath)
  }
  console.log(permission)

  // 判断是否有权限访问页面,如果没有,返回空,不做任何路由动作
  if (!permission.has(to.path)) {
    // 尝试获取一次权限
    await getUserPermission()
    permission = store.getters.getUserPermission
    if (!permission.has(to.path)) {
      next('/403')
    } else {
      next(to.fullPath)
    }

    
    return
  }

  console.log('我要放行了')
  // 放行
  next()
})

/**
 * 异步请求获取权限,写入store
 * 如果错误,删除用户的token
 */
const getUserPermission = async () => {
  console.log('获取权限中...')
  await apiGetUserPermission().then(res => {
    store.commit('setUserPermission', res.data)
  }).catch(err => {
    store.commit('setUserToken', '')
    console.log(err)
  })
  console.log('获取权限完成...')
}
