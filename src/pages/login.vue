<template>
  <el-row class="min-h-screen bg-indigo-500">
    <el-col :lg="16" :md="12" class="flex_box flex items-center justify-center">
      <div>
        <div class="font-bold text-5xl text-light-50 mb-4">欢迎光临</div>
        <div class="text-gray-200 text-sm">
          此站点是《vue3 + vite实战商城后台开发》视频课程的演示地址
        </div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="flex_box bg-light-50 flex items-center justify-center flex-col">
      <h2 class="font-bold text-3xl text-gray-800">欢迎回来</h2>
      <div class="flex items-center justify-center my-5 text-gray-300 space-x-2">
        <span class="h-[1px] w-16 bg-gray-200"></span>
        <span>账号密码登录</span>
        <span class="h-[1px] w-16 bg-gray-200"></span>
      </div>
      <el-form ref="fromRef" :rules="rules" :model="form" class="w-[250px]">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon><user /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password>
            <template #prefix>
              <el-icon><lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            round
            color="#626aef"
            class="w-[250px]"
            type="primary"
            :loading="loading"
            @click="onSubmit"
          >
            登 录
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { login } from '~/api/manager'
import { toast } from '~/utils/util'

const router = useRouter()
const store = useStore()

const form = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 5, max: 20, message: '密码长度应该在5到20个字符之间', trigger: 'blur' }
  ]
}

// 使用ref编程响应式的fromRef
const fromRef = ref(null)
let loading = ref(false)
const onSubmit = () => {
  fromRef.value.validate((valid) => {
    if (!valid) {
      return false
    }
    loading = true
  })
  store
    .dispatch('login', form)
    .then((res) => {
      toast('登录成功')
      router.push('/')
    })
    .finally(() => (loading = false))
}

// 监听回车事件
function onKeyUp(event) {
  if (event.key == 'Enter') onSubmit()
}

// 添加键盘监听
onMounted(() => {
  document.addEventListener('keyup', onKeyUp)
})

// 移除键盘监听
onBeforeUnmount(() => {
  document.removeEventListener('keyup', onKeyUp)
})
</script>

<style scoped>
.flex_box {
  display: flex !important;
}
</style>
