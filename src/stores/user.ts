import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    // 定义数据state
    const userProfile = ref({})
    // getters
    const getProfile = computed(() => userProfile)
    // actions
    const setProfile = async () => {
      // TODO: axios request data
      userProfile.value = {}
    }

    return { userProfile, getProfile, setProfile }
  },
  {
    persist: true,
  }
)

// 使用
// import { useUserStore } from '@/stores/user'
// const userStore = useUserStore()
// 解构必须使用storeToRefs包裹来保持响应式
