<route lang="json5">
{
  style: { navigationBarTitleText: '登录页' },
}
</route>

<template>
  <view class="page-container">
    <uni-card
      title="静默登录"
      :extra="Object.keys(loginResData).length ? '已登录' : '点击卡片登录'"
      @click="handleLogin"
    >
      <View v-if="Object.keys(loginResData).length" class="text-view">
        登录成功：{{ JSON.stringify(loginResData) }}
      </View>
      <View v-else>
        已登陆抖音宿主的用户，不需要用户授权，可获取用户open_id union_id。\n
        在使用 tt.login 时，先将 tt.login options 属性中的 force 设为
        false，如果在 success 回调中发现 isLogin 为
        false，提示用户先登录抖音宿主账号，后续再进行 code 获取等流程。\n
        在小程序整个冷启动生命周期内，最多只调用一次 tt.login \n 抖音登录
        session
        仅用于一次性获取用户在抖音服务端的信息，在获取到用户的抖音信息（如：open_id、union_id、手机号等）以后，应当将其保存到服务端的“用户表”中，并且生成相应的随机字符串，当作登录凭证进行下发
      </View>
    </uni-card>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const loginResData = ref({})
onMounted(() => {
  uni.checkSession({
    success: (checkRes) => {
      console.log('checkRes: ', checkRes.errMsg)
    },
    fail: () => {},
  })
})

const handleLogin = () => {
  uni.showLoading({
    title: '登录中',
    mask: true,
  })
  // 获取服务供应商
  uni.getProvider({
    service: 'oauth', // 授权登录
    success: (res) => {
      console.log(res.provider, res.provider.includes('toutiao'))
      if (res.provider.includes('toutiao')) {
        uni.login({
          provider: 'toutiao',
          success: (loginRes) => {
            uni.hideLoading()
            console.log('loginRes: ', loginRes)
            uni.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000,
            })
            loginResData.value = loginRes
          },
          fail: (loginError) => {
            uni.hideLoading()
            console.log('loginError: ', loginError)
            uni.showToast({
              title: '登录失败',
              icon: 'error',
              duration: 2000,
            })
          },
        })

        // #ifdef MP-TOUTIAO
        // tt.login({
        //   force: false,
        //   success: (ttLoginRes: {
        //     code: string
        //     isLogin: boolean
        //     anonymousCode: string
        //     errMsg: string
        //   }) => {
        //     console.log('ttLoginRes: ', ttLoginRes)
        //     if (ttLoginRes.isLogin === false) {
        //       console.log('用户未登录')
        //     }
        //   },
        // })
        // #endif
      }
    },
    fail: () => {
      uni.hideLoading()
    },
  })
}
</script>

<style scoped>
.page-container {
  .text-view {
    word-break: break-all;
  }
}
</style>
