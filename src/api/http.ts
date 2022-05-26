import axios from 'axios'
import { message } from 'ant-design-vue'

const http = axios.create({
  baseURL: 'http://localhost:8888/api',
  timeout: 3000
})

http.interceptors.request.use(config => {
  if (config.headers !== undefined) {
    config.headers.token = 'token'
  }
  return config
})

http.interceptors.response.use(res => {
  if (res.data.code === 200) {
    return res
  } else {
    console.log(res)
  }
}, err => {
  message.error(err.message)
  throw err
})

export default http
