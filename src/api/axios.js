import axios from 'axios'
import store from '~/store'
import { getToken } from '~/utils/auth'
import { toast } from '~/utils/util'

const service = axios.create({
  baseURL: '/api'
})

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 往header中添加token
    const token = getToken()
    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data.data
  },
  function (error) {
    // 对响应错误做点什么
    const errormsg = error.response.data.msg || '请求失败'
    if (errormsg == '非法token，请先登录！') {
      store.dispatch('logout').finally(() => location.reload())
    }
    toast(errormsg, 'error')
    return Promise.reject(error)
  }
)

export default service
