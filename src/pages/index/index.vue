<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route type="home" lang="json5">
{
  layout: 'default',
  style: { navigationBarTitleText: '首页' },
}
</route>

<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
  </view>
  <view class="menu-view">
    <!-- <navigator
      url="/pages/login/index"
      open-type="navigate"
      hover-class="navigator-hover"
    >
      <button size="default">去登录页</button>
    </navigator> -->

    <button size="default" @click="handleGotoLogin">去登录页</button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad, onReady } from '@dcloudio/uni-app'

const title = ref('Hello Richemont')
onLoad(() => {
  console.log('onLoad页面加载，页面还没显示，适合接受参数/联网取数据/更新data')
})
onReady(() => {
  console.log('onReady真实DOM渲染完成')
})

// 跳转到登录页
const handleGotoLogin = () => {
  uni.navigateTo({
    url: '/pages/login/index',
    animationType: 'pop-in',
    animationDuration: 200,
  })
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}

.menu-view {
  margin-top: 50rpx;
  padding: 0 50rpx;
}
</style>
