/**
 * Created by pengxu.chen on 2020/3/15.
 */
import axiosObj from 'axios'
import { getToken } from '@/store/session'
const axios = axiosObj.create()
const LoginPath = '#/login'
axios.defaults.method = 'post'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.timeout = 6000
axios.defaults.withCredentials = true

axios.defaults.transformRequest = [function(data) {
  // Do whatever you want to transform the data
  let ret = ''
  for (const it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
}]

axios.interceptors.request.use(function(config) {
  if (config['ignore']) {
    return config
  }
  const headToken = getToken()
  if (!headToken) {
    location.replace(LoginPath)
    return false
  }
  // header 中增加token key;
  config.headers['touch-Key'] = headToken
  return config
}, function(error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function(response) {
  if (!response['data']['ret'] && response['data']['code'] === -9999) {
    location.replace(LoginPath)
  }
  // Do something with response data
  return response['data']
}, function(error) {
  // Do something with response error
  return Promise.reject(error)
})

function apiRequest(url, params, ignoreToken) {
  const pp = {
    url,
    data: params
  }
  if (ignoreToken) {
    pp.ignore = true
  }
  return axios(pp)
}

export default apiRequest
