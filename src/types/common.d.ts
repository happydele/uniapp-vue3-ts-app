// 定义接口返回的数据结构
interface Result<T = any> {
  code: number
  message: string
  data?: T
}
