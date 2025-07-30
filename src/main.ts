import { createSSRApp } from 'vue'
import App from './App.vue'

// 导入pinia实例
import pinia from './stores/index'
// 导入tmUi组件库
import tmUi from './uni_modules/tm-ui'

export function createApp() {
  // 创建vue实例
  const app = createSSRApp(App)
  // 使用pinia
  app.use(pinia)
  // 确保在注册pinia后面，因为会复用实例
  app.use(tmUi)
  return {
    app,
  }
}
