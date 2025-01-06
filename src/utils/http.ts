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
    console.log(`nickname: ${nickname}`)
    const token = memberToken.profile?.token
    console.log(`token: ${token}`)
    if (token) {
      config.header.Authorization = `Bearer ${token}`
    }
    return config
  },
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

//增加通用http处理
interface Data<T> {
  code: string
  message: string
  result: T
}
const http = <T>(config: UniApp.RequestOption) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...config,
      success(res) {
        if (res.statusCode === 200 && res.statusCode < 300) {
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          const MemberStore = useMemberStore()
          MemberStore.clearProfile()
          uni.navigateTo({
            url: '/pages/login/index',
          })
          reject(res.data)
        } else {
          uni.showToast({
            title: (res.data as Data<T>).message || '请求失败',
            icon: 'none',
          })
          reject(res.data)
        }
      },
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络失败，请稍后再试',
        })
        reject(err)
      },
    })
  })
}

export default http
