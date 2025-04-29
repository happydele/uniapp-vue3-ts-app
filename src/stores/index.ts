import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

// 创建pinia实例
const pinia = createPinia()
// 使用持久化存储插件
pinia.use(persist)

export default pinia