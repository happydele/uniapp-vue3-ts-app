<route lang="json5">
{
  style: { navigationBarTitleText: '登录页' },
}
</route>

<template>
  <view class="page-container">
    <uni-card title="静默登录">
      <view>
        静默登录指“已登录抖音宿主”的用户，在访问小程序页面时，静默获取该用户的「唯一用户标识」：open_id
        和 union_id。
      </view>
      <view>
        在小程序整个冷启动生命周期内，最多只调用一次 tt.login。抖音登录 session
        仅用于一次性获取用户在抖音服务端的信息，在获取到用户的抖音信息（如：open_id、union_id、手机号等）以后，应当将其保存到服务端的“用户表”中，并且生成相应的随机字符串，当作登录凭证进行下发
      </view>

      <view v-if="userStore.userCodeRes.code" class="text-view">
        登录成功code：{{ userStore.userCodeRes.code }}
        <button
          type="default"
          :plain="true"
          size="mini"
          @click="handleCopy(userStore.userCodeRes.code)"
        >
          复制code
        </button>
      </view>
      <button v-else @click="handleLogin">获取Code</button>

      <button
        v-if="userStore.userCodeRes.code && userStore.userCodeRes.anonymousCode"
        class="login-button"
        @click="handleGetProfile"
      >
        Login
      </button>

      <div v-if="Object.keys(loginInfo).length">
        <div v-for="[key, value] in Object.entries(loginInfo)" :key="key">
          {{ key }}：{{ value || '-' }}
        </div>
      </div>
    </uni-card>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useUserStore } from '@/stores/user'
import { http } from '@/utils/request'

const userStore = useUserStore()
const loginInfo: Ref<{
  openid?: string
  session_key?: string
  unionid?: string
}> = ref({})

onLoad((option: any) => {
  // option为object类型，会序列化上个页面传递的参数
  // console.log('option: ', option)

  // #ifdef MP-TOUTIAO
  // 校验用户登录态
  tt.checkSession({
    success: (res) => {
      console.log('登录态有效: ', res, userStore.userCodeRes)
      if (!userStore.userCodeRes.code) {
        handleLogin()
      }
    },
    fail: (err) => {
      console.error('登录态失效err: ', err)
      userStore.setUserCodeRes({})
      handleLogin()
    },
  })
  // #endif
})

const handleLogin = () => {
  // 抖音小程序登录
  // #ifdef MP-TOUTIAO
  tt.login({
    force: false,
    success: (ttLoginRes) => {
      console.log('ttLoginRes: ', ttLoginRes)
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
        userStore.setUserCodeRes(ttLoginRes)
      }
    },
    fail: (ttLoginError) => {
      console.log('ttLoginError: ', ttLoginError)
      uni.showToast({
        title: '获取Code失败',
        icon: 'error',
        duration: 2000,
      })
    },
  })
  // #endif
}

const handleGetProfile = async () => {
  await handleLogin()

  uni.showLoading({
    title: '登录中',
    mask: true,
  })
  const { code, anonymousCode } = userStore.userCodeRes
  if (!code || !anonymousCode) return
  userStore
    .getSessionKey({ code, anonymousCode })
    .then((res) => {
      console.log(res.data, '登录成功')
      loginInfo.value = res.data
      uni.hideLoading()
      uni.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 2000,
      })
    })
    .catch(() => {
      uni.hideLoading()
      uni.showToast({
        title: '登录失败',
        icon: 'error',
        duration: 2000,
      })
    })
}

const handleCopy = (text: string) => {
  uni.setClipboardData({
    data: text,
    success: () => {
      uni.showToast({
        title: '复制成功',
        icon: 'success',
      })
    },
    fail: (err) => {
      console.error('复制失败', err)
      uni.showToast({
        title: '复制失败',
        icon: 'none',
      })
    },
  })
}
</script>

<style scoped>
.page-container {
  .text-view {
    word-break: break-all;
    margin-top: 45px;
  }
}

.login-button {
  margin-top: 24px;
}
</style>
