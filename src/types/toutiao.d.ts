// src/types/toutiao.d.ts

declare namespace tt {
  function login(options: {
    force?: boolean
    success?: (res: {
      code: string
      isLogin: boolean
      anonymousCode: string
      errMsg: string
    }) => void
    fail?: (err: object) => void
    complete?: () => void
  }): void

  function checkSession(options: {
    success?: (res: { errMsg: string }) => void
    fail?: (err: {
      errMsg: string
      errNo: number
      errorCode: number
      errorType: 'D' | 'F'
    }) => void
    complete?: () => void
  }): void

  function request(options: {
    url: string
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    data?: any
    header?: Record<string, string>
    success?: (res: any) => void
    fail?: (err: any) => void
    complete?: () => void
  }): void

  function shareAppMessage(options: {
    title: string
    imageUrl?: string
    path?: string
    success?: () => void
    fail?: (err: any) => void
  }): void

  // 其他抖音小程序 API 可以根据需要继续扩展
}

declare const tt: any // 确保 TypeScript 能识别全局变量 tt
