# rwf-tt-miniprogram

- 这是一个rwf抖音小程序项目，同时也是一个支持多端统一开发的uniApp项目，通过cli脚手架创建。
- 技术栈 `uniApp` + `vue3` + `ts` + `pinia` + `wot-design-uni` + `vite` + `sass`

## &#x1F4C2; 快速开始

- Vue3/Vite要求运行环境`Node.js`的版本 18+、20+ ，项目使用volta锁定得是v20.19.1
- 如果你有多项目Node版本不同，推荐使用 [`Volta`](https://docs.volta.sh/guide/getting-started) 来管理每个项目Node版本，无需手动切换
- 项目锁定使用 [`pnpm`](https://pnpm.io/) 作为包管理器，pnpm >= 9+ ，我的是v10.10.0
- 安装 pnpm：`npm install -g pnpm`
- 安装依赖：`pnpm install`

## 📦 运行

> 项目环境通过env配置文件，分为`DEV`、`QUA`、`VAL`和`PROD`四个环境，默认简洁命令指向抖音小程序编译运行，你也可编译其他指令打包其他平台

- 本地环境 `pnpm run start:dev`
- 测试环境 `pnpm run start:qua`
- 预正式环境 `pnpm run start:val`

- 本地环境打包 `pnpm run dev`
- 测试环境打包 `pnpm run qua`
- UAT环境打包 `pnpm run val`
- 生产环境打包 `pnpm run prd`

开发环境的打包路径为 `dist/dev/mp-toutiao`  
生产环境的打包路径为 `dist/build/mp-toutiao`

## 插件

> **vite-plugin-restart**

一个用于 Vite 构建工具的插件，它通过监听指定文件的变化自动重启 Vite 开发服务器，从而提升开发效率。项目中修改`vite.config.js`和`环境变量文件`后无需手动重启服务。

> **unplugin-auto-import**

一个用于自动导入 JavaScript/TypeScript 模块的工具，支持 Vite、Webpack、Rollup 等构建工具。它通过分析代码中的标识符（如 ref、computed），自动注入对应的导入语句，显著减少手动导入的重复操作，提升开发效率。  

配置后，代码中直接使用vue、uniapp的API，无需手动导入。比如：

```js
<script setup>
const count = ref(0);  // 自动注入 import { ref } from 'vue'
</script>
```

> **@uni-helper/vite-plugin-uni-pages**

一个为 Vite 驱动的 uni-app 项目提供基于文件系统路由的插件，由 uni-helper 官方团队开发。它极大地简化了 uni-app 的路由配置方式，让开发者能够更高效地管理页面路由和元信息。

**核心功能**

- 基于文件系统的路由：自动将 src/pages 目录下的 .vue 文件转换为路由，无需手动配置 pages.json
- 路由元信息配置：通过 Vue 单文件组件中的 <route> 自定义块直接配置页面路由信息，如导航栏标题、样式等
- TypeScript 支持：支持使用 TypeScript 编写 pages.config.ts 来配置全局路由设置
- 分包支持：可配置子包目录，自动处理分包逻辑
- 首页指定：通过 <route type="home"> 或配置项指定应用首页

**优势特点**

- 减少配置工作：自动生成 pages.json，避免手动维护带来的错误
- 代码组织更清晰：页面配置与页面代码在同一文件中，提高可维护性
- 开发体验提升：支持 JSON5、YAML 等多种格式的路由配置，允许注释
- 类型安全：为路由提供 TypeScript 类型支持

**注意：**

使用项目根目录中`pages.config.ts`文件 来管理配置全局路由设置，不要手动修改`src/pages.json`，它是由插件自动生成的

```js
// 页面级路由配置
在 Vue 单文件组件中使用 <route> 块配置页面级路由信息：
<!-- 首页配置示例 -->
<!-- 尽量保证项目中只有一个 <route type="home"> 配置，否则会按字母顺序排列 -->
<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',  // 自定义导航栏
    navigationBarTitleText: '首页'
  }
}
</route>

<template>
  <div>
    <h1>欢迎使用</h1>
  </div>
</template>

<!-- 普通页面配置示例 -->
<route lang="json5">
{
  style: { navigationBarTitleText: '登录页' },
}
</route>
```

> **@uni-helper/vite-plugin-uni-layouts**

和vite-plugin-uni-pages结合使用，是 uni-helper 团队为 Vite 驱动的 uni-app 项目开发的一款布局系统插件，它提供了类似 Nuxt.js 的布局机制，让开发者能够更高效地管理 uni-app 项目的页面布局结构。

**核心功能**

- 自动布局注册：自动扫描并全局注册 src/layouts 目录下的布局组件
- 多种布局支持：支持为不同页面配置不同的布局（如默认布局、首页布局、通屏布局等）
- 声明式布局配置：通过 <route> 块或 pages.json 直接指定页面使用的布局
- 动态布局切换：支持通过 uni-layout 组件动态切换布局
- 布局插槽系统：提供主插槽(main)和额外插槽(header/footer)支持

**主要优势**

- 减少重复代码：避免在每个页面重复引入布局组件
- 配置简单直观：布局配置与页面代码在同一文件中
- 支持多种布局场景：如带导航栏的常规页面、全屏页面、自定义导航栏页面等
- 与 uni-pages 完美配合：可与 @uni-helper/vite-plugin-uni-pages 协同工作

```javascript
// 创建布局文件
// 在src/layouts目录下创建布局组件

// 应用布局到页面
// 方式一：通过 <route> 块（推荐）
<route lang="json5">
{
  "layout": "default",  // 指定使用 src/layouts/default.vue 布局
  "style": {
    "navigationBarTitleText": "示例页面"
  }
}
</route>

<template>
  <view>页面内容将插入到布局的 slot 位置</view>
</template>

// 方式二：通过 pages.json

{
  "pages": [
    {
      "path": "pages/index/index",
      "layout": "default"  // 指定布局
    }
  ]
}
```

> **@uni-helper/vite-plugin-uni-manifest**

一个专为 UniApp 项目设计的 Vite 插件，它通过 TypeScript 或 JavaScript 来管理 manifest.json 配置文件，极大地简化了 UniApp 项目的配置管理流程。

**注意：**

项目中使用`manifest.config.ts`来管理manifest文件，它会自动生成和更新`src/manifest.json`文件，不要手动编辑`manifest.json`文件。

## UI库

> **wot-design-ui**

文档地址 [WotUI](https://wot-design-uni.netlify.app/) ，Wot Design Uni 是一款基于 Vue3 和 TypeScript 构建的 uni-app 组件库，专为 uni-app 开发者设计，提供了70多个高质量组件，支持多平台运行和丰富的定制功能。

项目通过配置easycom自动引入，直接使用组件，组件会自动引入，无需在页面内import，也不需要在components内声明。

`主题定制` Wot Design Uni支持通过CSS变量和ConfigProvider组件实现主题定制：
```css
/* 通过CSS覆盖变量 */
:root, page {
  --wot-color-success: red;
  --wot-color-warning: yellow;
  --wot-button-normal-bg: green;
}
```

```html
<!-- 通过ConfigProvider组件覆盖 -->
<wd-config-provider :theme-vars="themeVars">
  <div style="margin: 16px">
    <wd-button round block type="primary">提交</wd-button>
  </div>
</wd-config-provider>
```

## 开发工具

1.VSCode IDEA  
推荐安装vscode插件: `uni-create-view`（快速uni-app页面）；`uni-helper`（代码提示）；`uniapp小程序拓展`（鼠标悬停查文档）
2.抖音开发者工具 [下载地址](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/dev-tools/developer-instrument/download/developer-instrument-update-and-download)