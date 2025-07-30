<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
onLaunch((options) => {
  console.log('App Launch：小程序冷启动完成时触发，全局只触发一次')
})
onShow((options) => {
  console.log('App Show：当小程序启动，或从后台进入前台显示')
})
onHide(() => {
  console.log('App Hide：当小程序从前台进入后台')
})
</script>

<style>
/* 图标必须 */
@import url(@/uni_modules/tm-ui/css/remixicon.min.css);
/* 自定预处理类，可选 */
@import url(@/uni_modules/tm-ui/css/tmui.css);
</style>
