import http from './http'

// 登录请求API
export const apiLogin = (loginForm: {
  username: string,
  password: string
}) => http({
  url: '/login',
  method: 'post',
  data: loginForm
})

// 获取当前用户的权限列表
export const apiGetUserPermission = () => http({
  url: '/systemUser/getPermission',
  method: 'get'
})


export const api_getUserInfo = (userId: Number) => http({
  url: '/user/get',
  method: 'get',
  params: {
    userId: userId
  }
})