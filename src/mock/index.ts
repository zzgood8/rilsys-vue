import Mock from 'mockjs'

Mock.setup({
  timeout: 100 - 10000
})

// 登录返回token
Mock.mock('http://localhost:8888/api/login', 'post', {
  code: 200,
  msg: 'ok',
  data: '@string(32,32)'

})

// 获取当前用户的权限
Mock.mock('http://localhost:8888/api/systemUser/getPermission', 'get', {
  code: 200,
  msg: 'ok',
  data: [
    '/home'
  ]
})

export default Mock
