import axios from 'axios'
import Qs from 'qs'
import store from '@/store'
import { Message, MessageBox } from 'element-ui'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 8000,                 // 请求超时时间,
  headers:{
    'Content-Type':'application/x-www-form-urlencoded'
  },
  transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
  }]
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['token'] = store.getters.token
  }
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.data.msg,
        type: 'error',
        duration: 5 * 1000
      })

      return Promise.reject('error')
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: "网络错误，请检查网络连接",
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
