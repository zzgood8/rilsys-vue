### 全局说明

**1. 除登录接口外，所有接口全部需要鉴权，具体如下：**

```
header: {
	token: '用户令牌'
}
```

**2. 所有的请求错误时，会返回对应的错误码，详情见:** [附录：响应码](# 目录)



## 1. 用户登录

### 1.1 登录接口
  ```
  请求
  POST '/login'
  body: {
  	username: '用户名'
  	password: '密码'
  }
  
  响应
  {
  	code: 200
  	msg: 'ok'
  	data: '用户令牌'
  }
  ```

### 1.2 获取当前用户的路由权限

```
请求
get '/user/routePermission'

响应
{
	code: 200
	msg: 'ok'
	data: [
		'/test1'
		'/test2'
		'/test3'
		...
	]
}
```

## 2. 用户管理

### 2.1 获取所有用户(分页)

```
请求
get '/user/listAll'
parmas: {
	page: '页数'
	size: '每页大小'
}

响应
{
	code: 200
	msg: 'ok'
	data: [
		{用户信息}
		...
	]
}
```

### 2.2 获取用户的角色

```
请求
get '/user/roleList'
parmas: {
	userId: '用户的ID'
}

响应
{
	code: 200
	msg: 'ok'
	data: [
		{角色信息}
		...
	]
}
```

### 2.3 获取用户的权限

```
请求
get '/user/permissionList'
parmas: {
	userId: '用户的ID'
}

响应
{
	code: 200
	msg: 'ok'
	data: [
		{权限信息}
		...
	]
}
```

### 2.4 添加一个用户

```
请求
post '/user/add'
body: {
	用户信息
}

响应
{
	code: 200
	msg: 'ok'
	data: null
}
```

### 2.5 禁用一个用户

```
请求
POST '/user/lock'
parmas: {
	userId: '被禁用户的ID'
}

响应
{
	code: 200
	msg: 'ok'
	data: null
}
```



## 3. 角色管理

### 3.1 获取所有角色

```



```

### 3.2 获取角色的用户

```

```

### 3.3 获取角色的权限

```

```

### 3.4 添加一个角色

### 3.5 删除一个角色

## 4. 权限管理

### 4.1 获取所有的权限

```
```

### 4.2 添加一个权限

### 4.3 删除一个权限

