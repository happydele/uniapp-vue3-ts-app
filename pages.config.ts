// pages.config.ts
import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  easycom: {
    autoscan: true, // 是否自动扫描组件
    custom: {
      // uni-ui 规则如下配置
      '^uni-(.*)': '@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue',
      // wot-design-uni
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
    },
  },
  // 你也可以定义 pages 字段，它具有最高的优先级。
  pages: [],
  globalStyle: {
    // 导航栏标题颜色及状态栏前景颜色
    navigationBarTextStyle: 'black',
    // 导航栏标题文字内容
    navigationBarTitleText: 'RWF抖音小程序',
    // 导航栏背景颜色（同状态栏背景色）
    navigationBarBackgroundColor: '#F8F8F8',
    // 导航栏样式
    navigationStyle: 'default',
    // 下拉显示出来的窗口的背景色
    backgroundColor: '#FFFFFF',
    // 下拉 loading 的样式
    backgroundTextStyle: 'dark',
    // 是否开启下拉刷新
    enablePullDownRefresh: false,
    // 页面上拉触底事件触发时距页面底部距离，单位只支持px
    onReachBottomDistance: 50,
  },
  tabBar: {
    color: '#7A7E83',
    selectedColor: '#3cc51f',
    borderStyle: 'black',
    backgroundColor: '#ffffff',
    height: '50px',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      {
        text: '首页',
        pagePath: 'pages/index/index',
        iconPath: 'static/tabbar/home.png',
        selectedIconPath: 'static/tabbar/homeHL.png',
      },
      {
        text: '示例',
        pagePath: 'pages/test/index',
        iconPath: 'static/tabbar/example.png',
        selectedIconPath: 'static/tabbar/exampleHL.png',
      },
    ],
  },
})
