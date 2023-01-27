import axios from 'axios'
import constants from '../../constants'
import config from '../../config/api'

const { USER_TOKEN } = constants
const { baseURL } = config
const request = axios.create({
  baseURL, // base path
  timeout: 10000
})

const getToken = () => {
  return localStorage.getItem(USER_TOKEN)
}

const removeToken = () => {
  localStorage.removeItem(USER_TOKEN)

}
// Add request interceptor
request.interceptors.request.use(function (config: any) {
  // what to do before sending the request
  if (config.url !== '/my/login') {
    config.headers.Authorization = getToken()
  }
  return config
}, function (error) {
  // what to do with request errors
  return Promise.reject(error)
})
// Add response interceptor
request.interceptors.response.use(function (response) {
  // do something with the response data
  const { data } = response
  if (data.status === 401) {
    removeToken()
    // router.push('/login')
  }
  if (data?.success === false) {
    return null
  }
  return data
}, function (error) {
  // do something with the response data
  return Promise.reject(error)
})
export default request