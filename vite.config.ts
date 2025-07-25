import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import AutoImport from 'unplugin-auto-import/vite'
import ViteRestart from 'vite-plugin-restart'

// https://vitejs.dev/config/
export default defineConfig({
  // UniXXX()插件都需要在uni()之前引入
  plugins: [
    UniPages({
      exclude: ['**/components/**/**.*'],
      routeBlockLang: 'json5', // 虽然设了默认值，但是vue文件还是要加上 lang="json5", 这样才能很好地格式化
      // homePage 通过 vue 文件的 route-block 的type="home"来设定
      // pages 目录为 src/pages，分包目录不能配置在pages目录下
      // subPackages是个数组，可以配置多个，但是不能为pages里面的目录
      subPackages: ['src/sub-pages'],
      dts: 'src/types/uni-pages.d.ts',
    }),
    UniLayouts(),
    UniManifest(),
    uni(),
    // 自动导入
    AutoImport({
      imports: ['vue', 'uni-app'],
      dts: 'src/types/auto-import.d.ts',
      dirs: ['src/hooks'], // 自动导入 hooks
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
      vueTemplate: true, // default false
    }),
    ViteRestart({
      // 通过这个插件，在修改vite.config.js文件则不需要重新运行也生效配置
      restart: ['vite.config.js', '.env.*', 'pages.config.js', 'manifest.config.js'],
    }),
  ],
  // 根据环境加载对应的.env文件
  envDir: './', // 指定 .env 文件所在的目录
  envPrefix: 'VITE_APP_', // 只匹配以 VITE_APP_ 开头的变量
})
