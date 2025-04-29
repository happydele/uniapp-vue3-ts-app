<route lang="json5">
{
  style: { navigationBarTitleText: '示例页' },
}
</route>

<template>
  <view class="test">
    <view
      >前端首先需要在 page 的 onLoad 方法调用 tt.login 换取
      code，然后在open-type="getPhoneNumber"的 button 组件的 bindgetphonenumber
      回调中，将 iv, encryptedData 和 token
      一同传给开发者服务端解密用户电话号码。同样，此处也需要考虑用户未登录抖音
      App 宿主的情况。</view
    >
    <button size="default" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">
      获取手机号
    </button>
    <view v-show="Object.keys(detail).length" class="text-view">{{ JSON.stringify(detail) }}</view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const detail = ref({})
function decryptPhoneNumber(res: any) {
  console.log('res: ', res)
  detail.value = res.detail
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
