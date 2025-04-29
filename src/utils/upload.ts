// 定义上传接口参数类型
interface UploadOptions {
  url: string // 上传地址
  filePath: string // 文件路径（本地路径）
  name: string // 文件对应的 key
  formData?: Record<string, any> // 额外的表单数据
  header?: Record<string, string> // 自定义请求头
  onProgress?: (progress: number) => void // 进度回调函数
}

/**
 * 封装上传接口
 * @param options 
 * @returns 
 */
export const uploadFile = (options: UploadOptions): Promise<string> => {
  return new Promise((resolve, reject) => {
    const task = uni.uploadFile({
      url: options.url,
      filePath: options.filePath,
      name: options.name,
      formData: options.formData || {},
      header: options.header || { 'Content-Type': 'multipart/form-data' },
      success: (res) => {
        if (res.statusCode === 200) {
          const data = JSON.parse(res.data) // 假设服务器返回的是 JSON 格式
          resolve(data.url || '') // 返回上传后的文件 URL
        } else {
          uni.showToast({ title: `上传失败：${res.errMsg}`, icon: 'none' })
          reject(res)
        }
      },
      fail: (err) => {
        uni.showToast({ title: '上传失败，请检查网络', icon: 'none' })
        reject(err)
      },
    })

    // 监听上传进度
    task.onProgressUpdate((res) => {
      if (options.onProgress) {
        options.onProgress(res.progress) // 调用进度回调函数
      }
    })
  });
}
