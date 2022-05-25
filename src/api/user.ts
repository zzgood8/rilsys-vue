import http from './http'

// 登录表单
interface loginForm {
  username: string;
  password: string
}

// 登录请求API
export const apiLogin = (data: loginForm) => http({
  url: '/login',
  method: 'post',
  data: data
})

// 获取当前用户的权限列表
export const apiGetUserPermission = () => http({
  url: '/systemUser/getPermission',
  method: 'get'
})
