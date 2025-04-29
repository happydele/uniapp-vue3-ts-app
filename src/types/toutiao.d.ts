// src/types/toutiao.d.ts

declare namespace tt {
  function login(options: {
    success?: (res: { code: string }) => void
    fail?: (err: any) => void
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
