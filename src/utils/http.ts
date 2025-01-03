const baseUuRl = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
import { useMemberStore } from '@/stores'

const httpInterceptor = {
  invoke(config: UniApp.RequestOption) {
    if (!config.url.startsWith('http')) {
      config.url = baseUuRl + config.url
    }
    config.timeout = 10000
    config.header = {
      ...config.header,
      'source-client': 'miniapp',
      // 'Content-Type': 'application/json',
      // 'Authorization': uni.getStorageSync('token')
    }
    // token add
    const memberToken = useMemberStore()
    const nickname = memberToken.profile?.nickname
    console.log( `nickname: ${nickname}`)
    const token = memberToken.profile?.token
    console.log(  `token: ${token}`)
    if (token) {
      config.header.Authorization = `Bearer ${token}`
    }
    return config}}
uni.addInterceptor('request',httpInterceptor)
uni.addInterceptor('uploadFile',httpInterceptor) 