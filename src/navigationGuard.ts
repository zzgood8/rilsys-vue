import store from './store'
import router from './router'
import { apiGetUserPermission } from '@/api/user'
import { message } from 'ant-design-vue'

/**
 * 导航守卫
 * 页面跳转鉴权
 */
router.beforeEach(async (to) => {
  // 去登陆页直接放行
  if (to.path === '/login') {
    console.log('去登陆页')
    return true
  }

  // 没有用户凭证,跳转至登录页
  const token = store.getters.getUserToken
  if (!token) {
    message.error('无法获取登录凭证,请登录!!!')
    return '/login'
  }

  console.log(to)

  // 判断是否获取过权限,如果没有,则获取
  const has = store.getters.hasPermission
  if (!has) {
    console.log('获取权限了...')
    const res = await getUserPermission()
    if (res === -1) {
      message.error('登录凭证已过期,请重新登录!!!')
      return '/login'
    } else {
      return '/home'
    }
  }

  // 获取当前用户权限,如果没有则跳转403
  const permission = store.getters.getUserPermission
  if (!permission.has(to.path)) {
    return '/403'
  }
  // 放行
  console.log('放行了...')
  return true
})

/**
 * 异步请求获取权限,写入store
 * 如果错误,删除用户的token
 * -1 表示凭证失效,code = 403
 * 0 表示无权限访问,code = 401
 * 1 表示成功获取权限,code = 200
 */
const getUserPermission = async () => {
  await apiGetUserPermission().then(res => {
    store.commit('setUserPermission', res.data)
  }).catch(err => {
    store.commit('setUserToken', '')
    console.log(err)
  }).finally(() => {
    store.commit('setHasPermission', true)
  })
  return 1
}
