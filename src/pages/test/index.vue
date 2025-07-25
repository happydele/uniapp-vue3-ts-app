<route lang="json5">
{
  style: { navigationBarTitleText: '示例页' },
}
</route>

<template>
  <view class="test">
    <view>
      前端首先需要在 page 的 onLoad 方法调用 tt.login 换取
      code，然后在open-type="getPhoneNumber"的 button 组件的 bindgetphonenumber
      回调中，将 iv, encryptedData 和 token
      一同传给开发者服务端解密用户电话号码。同样，此处也需要考虑用户未登录抖音
      App 宿主的情况。
    </view>

    <button
      size="default"
      open-type="getPhoneNumber"
      @getphonenumber="decryptPhoneNumber"
    >
      获取手机号
    </button>
    <view v-show="Object.keys(detail).length" class="text-view">
      {{ JSON.stringify(detail) }}
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const detail = ref({})
const userStore = useUserStore()
const { getPhoneNumber } = userStore

const decryptPhoneNumber = (e: any) => {
  console.log('e: ', e)
  if (e.detail.errMsg === 'getPhoneNumber:ok') {
    const encryptedData = e.detail.encryptedData
    const iv = e.detail.iv
    const code = userStore.userCodeRes.code
    if (code) {
      handleGetPhoneNumber({ encryptedData, iv, code })
    } else {
      // 先获取code
      // #ifdef MP-TOUTIAO
      tt.login({
        force: false,
        success: async (ttLoginRes) => {
          if (ttLoginRes.isLogin === false) {
            userStore.setUserCodeRes({})
            // 提示用户先登录抖音宿主账号
            uni.showModal({
              title: '提示',
              content: '请先登录抖音账号,再进行code获取',
              showCancel: false,
              success: ({ confirm, cancel }) => {},
            })
          } else {
            await userStore.setUserCodeRes(ttLoginRes)
            // 获取手机号
          }
        },
        fail: (ttLoginError) => {
          uni.showToast({
            title: '获取Code失败',
            icon: 'error',
            duration: 2000,
          })
        },
      })
      // #endif
    }
  } else {
    uni.showModal({
      title: '提示',
      content: e.detail.errMsg,
      showCancel: false,
      success: ({ confirm, cancel }) => {}
    })
  }
}

const handleGetPhoneNumber = async (payload: {
  iv: string
  encryptedData: string
  code: string
}) => {
  uni.showLoading({
    title: '请求中',
    mask: true,
  })
  try {
    const response = await getPhoneNumber(payload)
    console.log('response: ', response)
    detail.value = response
    uni.hideLoading()
    uni.showToast({
      title: '获取手机号成功',
      icon: 'success',
      duration: 2000,
    })
  } catch (error) {
    console.log('error: ', error)
    uni.hideLoading()
    uni.showToast({
      title: '获取失败',
      icon: 'error',
      duration: 2000,
    })
  }
}
</script>

<style scoped>
.test {
  padding: 24rpx;
}

.text-view {
  word-break: break-all;
}
</style>
