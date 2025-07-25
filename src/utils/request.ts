// src/utils/request.ts
// 全局配置
const BASE_URL = import.meta.env.VITE_APP_BASE_API

/**
 * 封装 uni.request 方法
 */
export const request = (options: UniApp.RequestOptions): Promise<any> => {
  const { url, method = 'GET', data, header = {}, ...rest } = options
  // 请求拦截器：添加 token
  const token = uni.getStorageSync('token')
  if (token) {
    header['Authorization'] = `Bearer ${token}`
  }
  return new Promise((resolve, reject) => {
    uni.request({
      ...rest,
      url: BASE_URL + url,
      method,
      data,
      timeout: 25000,
      header: {
        'Content-Type': 'application/json',
        ...header,
      },
      success: (res: UniApp.RequestSuccessCallbackResult) => {
        const { statusCode, data } = res
        // 响应拦截器：处理 token 过期
        if (statusCode === 401) {
          console.error('Token 已过期，正在跳转到登录页面...')
          uni.navigateTo({ url: '/pages/login/index' })
          reject(new Error('Token expired'))
          return
        }
        // 状态码判断
        if (statusCode === 200) {
          resolve(data as any)
        } else {
          handleHttpError(statusCode, data)
          reject(new Error(`Request failed with status code ${statusCode}`))
        }
      },
      fail: (err) => {
        handleNetworkError(err)
        reject(err)
      },
    })
  })
}

/**
 * 处理 HTTP 错误
 */
function handleHttpError(statusCode: number, data: any) {
  switch (statusCode) {
    case 400:
      console.error('客户端请求错误:', data)
      break
    case 401:
      console.error('未授权，请重新登录')
      // 可在此处跳转到登录页面
      break
    case 403:
      console.error('禁止访问:', data)
      break
    case 404:
      console.error('资源未找到:', data)
      break
    case 500:
      console.error('服务器内部错误:', data)
      break
    default:
      console.error(`HTTP 错误状态码: ${statusCode}`, data)
  }
}

/**
 * 处理网络错误
 */
function handleNetworkError(err: any) {
  console.error('网络请求失败:', err)
  uni.showToast({
    title: '网络请求失败，请检查网络连接',
    icon: 'none',
  })
}

/**
 * 导出封装的方法
 */
export const http = {
  get(
    url: string,
    params?: object,
    config?: UniApp.RequestOptions
  ): Promise<any> {
    return request({
      url,
      method: 'GET',
      data: params,
      ...config,
    })
  },
  post(
    url: string,
    data?: object,
    config?: UniApp.RequestOptions
  ): Promise<any> {
    return request({
      url,
      method: 'POST',
      data,
      ...config,
    })
  },
  put(
    url: string,
    data?: object,
    config?: UniApp.RequestOptions
  ): Promise<any> {
    return request({
      url,
      method: 'PUT',
      data,
      ...config,
    })
  },
  delete(
    url: string,
    data?: object,
    config?: UniApp.RequestOptions
  ): Promise<any> {
    return request({
      url,
      method: 'DELETE',
      data,
      ...config,
    })
  },
}
