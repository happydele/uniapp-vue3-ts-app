<template>
  <view>
    <button @click="chooseAndUpload">选择并上传文件</button>
    <progress :percent="uploadProgress" stroke-width="6" v-if="uploadProgress > 0" />
    <text v-if="uploadProgress > 0">{{ uploadProgress }}%</text>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { uploadFile } from '@/utils/upload';

const uploadProgress = ref(0); // 当前上传进度

const chooseAndUpload = async () => {
  try {
    // 选择文件
    const res = await new Promise((resolve, reject) => {
      uni.chooseImage({
        count: 1, // 选择一张图片
        success: resolve,
        fail: reject,
      });
    });

    const filePath = (res as any).tempFilePaths[0]; // 获取文件路径

    // 调用上传接口
    const uploadedUrl = await uploadFile({
      url: 'https://example.com/upload', // 替换为你的上传地址
      filePath: filePath,
      name: 'file',
      formData: {
        userId: '12345', // 示例额外表单数据
      },
      onProgress: (progress) => {
        uploadProgress.value = progress; // 更新进度
      },
    });

    console.log('上传成功，文件地址：', uploadedUrl);
    uni.showToast({ title: '上传成功', icon: 'success' });
    uploadProgress.value = 0; // 重置进度条
  } catch (error) {
    console.error('上传失败：', error);
    uploadProgress.value = 0; // 重置进度条
  }
};
</script>