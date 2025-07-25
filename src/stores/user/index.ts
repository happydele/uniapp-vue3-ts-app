import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { postUserPhoneNumber, login } from './service'

export const useUserStore = defineStore(
  'user',
  () => {
    // 定义数据state
    const userProfile = ref({})
    const userCodeRes: Ref<{ code?: string; anonymousCode?: string }> = ref({})

    // getters
    const getProfile = computed(() => userProfile)

    // actions
    const setProfile = async () => {
      // TODO: axios request data
      userProfile.value = {}
    }
    const setUserCodeRes = (res: object) => {
      userCodeRes.value = res
    }
    // 获取唯一标识
    const getSessionKey = async (params: {
      brand?: string
      code: string
      anonymousCode: string
      appId?: string
    }) => {
      const res = await login(params)
      return res
    }
    // 获取手机号
    const getPhoneNumber = async (payload: {
      brand?: string
      encryptedData: string
      iv: string
      code: string
    }) => {
      const response = await postUserPhoneNumber(payload)
      return response
    }

    return {
      userProfile,
      getProfile,
      setProfile,
      userCodeRes,
      setUserCodeRes,
      getPhoneNumber,
      getSessionKey,
    }
  },
  {
    persist: true,
  }
)

// 使用
// import { useUserStore } from '@/stores/user'
// const userStore = useUserStore()

// 解构必须使用storeToRefs包裹来保持响应式
// const {userCode} = storeToRefs(userStore)
// import { storeToRefs } from 'pinia'