import axios from 'axios'
import jsonBig from 'json-bigint'
import store from '@/store'
import router from '@/router'

const request = axios.create({
  baseURL: 'http://geek.itheima.net'
})

request.defaults.transformResponse = [
  function (data) {
    try {
      return jsonBig.parse(data)
    } catch (err) {
      return data
    }
  }
]

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function (err) {
    return Promise.reject(err)
  }
)

// 响应拦截器
request.interceptors.response.use(
  function (response) {
    return response
  },
  async function (err) {
    console.dir(err)
    if (err.response && err.response.status === 401) {
      const user = store.state.user
      if (!user || !user.refresh_token) {
        router.push('/login')
      }
      try {
        const res = await axios({
          method: 'PUT',
          url: 'http://toutiao.itheima.net/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        })
        console.log('刷新token成功', res)
        store.commit('setUser', {
          token: res.data.data.token,
          refresh_token: user.refresh_token
        })
        return request(err.config)
      } catch (err) {
        console.log('请求刷新token失败', err)
        router.push('/login')
      }
    }
    return Promise.reject(err)
  }
)

export default request
