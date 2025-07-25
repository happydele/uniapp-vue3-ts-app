import { http } from '@/utils/request'

// 登录
export const login = (params: {
  brand?: string
  code: string
  anonymousCode: string
  appId?: string
}): Promise<{
  data: { openId: string; session_key: string; unionid: string }
}> => {
  return http.get(`/v1/PIA/jsCode2Session`, {
    appId: 'tt1daf6b1282a79a0201',
    ...params,
  })
}

// 获取用户手机号
export const postUserPhoneNumber = (payload: {
  brand?: string
  encryptedData: string
  iv: string
  code: string
}): Promise<{
  phoneNumber: string // 用户绑定的手机号（国外手机号会有区号）
  purePhoneNumber: string // 没有区号的手机号
  countryCode: string // 区号
  watermark: {
    appid: string
    timestamp: number
  }
}> => {
  return http.post(`/v1/outbound/PIA/users/get-phone-number`, payload)
}
