import { createSSRApp } from 'vue'
import App from './App.vue'
import { request } from './utils/request'

// 导入pinia实例
import pinia from './stores/index'

export function createApp() {
  // 创建vue实例
  const app = createSSRApp(App)
  // 使用pinia
  app.use(pinia)
  // 挂载request到全局，通过 this.$request 调用
  app.config.globalProperties.$request = request
  return {
    app,
  }
}
