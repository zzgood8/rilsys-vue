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

// 获取当前用户的权限
Mock.mock('http://localhost:8888/api/workLog/getByMonth', 'get', {
  code: 200,
  msg: 'ok',
  'data|1-30': [{
    'id|+1': 1,
    'title|1': ['添加报价', '联思问题处理', '添加报表', '稍后待做'],
    'type|1': ['1', '2', '3', '4'],
    content: '@cparagraph()',
    createTime: '@datetime("2022-05-dd HH:mm:ss")',
    createBy: 'zbx',
    updateTime: null,
    updateBy: null
  }]
})

export default Mock
