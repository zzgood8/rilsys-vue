<template>
  <div style="text-align: center;">
    <a-card title="用户登录" class="login-card">
      <a-form :model="formState" labelAlign="left" :labelCol="{ span: 6 }"
        @finish="onFinish">

        <a-form-item label="用户名:" name="username" :rules="[{ required: true, message: '请输入用户名!' }]">
          <a-input v-model:value="formState.username">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item label="密码:" name="password" :rules="[{ required: true, message: '请输入密码!' }]">
          <a-input-password v-model:value="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item label="">
          <a-button :loading="formState.loginState" :disabled="disabled" type="primary" html-type="submit"
            class="login-form-button">
            {{ formState.loginState ? '登录中' : '登录' }}
          </a-button>
        </a-form-item>

      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { message } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { apiLogin } from '@/api/user'
import router from '@/router'

// 登录表单
const formState = reactive({
  username: '',
  password: '',
  loginState: false
})

// 登录按钮是否禁用
const disabled = computed(() => {
  return !(formState.username && formState.password)
})

// 表单提交触发
const onFinish = (values: any) => {
  formState.loginState = true
  apiLogin(values).then(res => {
    if (res.data.code === 200) {
      localStorage.setItem('token', res.data.data)
      router.replace('/home')
    } else {
      message.error(`${res.data.msg}\n${res.data.data}}`)
    }
  }).catch(err => {
    console.log(err)
  }).finally(() => {
    formState.password = ''
    formState.loginState = false
  })
}

</script>

<style>
.login-form-button {
  width: 100%;
}

.login-card {
  width: 350px;
  max-width: 100vw;
  margin-top: 10%;
  display: inline-block;
  text-align: left;
  border-radius: 10px;
}
</style>
