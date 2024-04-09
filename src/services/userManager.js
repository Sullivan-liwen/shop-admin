import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { logout, updatepassword } from '~/api/manager'
import { showModel, toast } from '~/utils/util'

export function useRePassword() {
  const router = useRouter()
  const store = useStore()
  // 修改密码
  const formDrawerRef = ref(null)
  const form = reactive({
    oldpassword: '',
    password: '',
    repassword: ''
  })

  const rules = {
    oldpassword: [{ required: true, message: '旧密码不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '新密码不能为空', trigger: 'blur' }],
    repassword: [{ required: true, message: '重复新密码不能为空', trigger: 'blur' }]
  }

  // 使用ref编程响应式的fromRef
  const fromRef = ref(null)
  const onSubmit = () => {
    fromRef.value.validate((valid) => {
      if (!valid) {
        return false
      }
      formDrawerRef.value.showLoading()
      updatepassword(form)
        .then((res) => {
          toast('修改密码成功,请重新登录.')
          store.dispatch('logout')
          // 跳转回登录页
          router.push('/login')
        })
        .finally(() => {
          formDrawerRef.value.hideLoading()
        })
    })
  }

  const openRePasswordForm = () => formDrawerRef.value.openDrawer()

  return {
    formDrawerRef,
    form,
    rules,
    fromRef,
    onSubmit,
    openRePasswordForm
  }
}

export function useLogout() {
  const router = useRouter()
  const store = useStore()

  const hanlerLogout = () => {
    showModel('是否退出登录?', '退出登录').then((res) => {
      logout().finally((res) => {
        store.dispatch('logout')
        // 跳转回登录页
        router.push('/login')
        // 提示退出登录成功
        toast('退出登录成功.')
      })
    })
  }

  return {
    hanlerLogout
  }
}
