<template>
  <el-drawer
    v-model="showDrawer"
    :title="title"
    :size="size"
    :close-on-click-modal="false"
    :destroy-on-close="destroyOnClose"
  >
    <div class="formDrawer">
      <div class="body">
        <slot></slot>
      </div>
      <div class="actions">
        <el-button type="primary" :loading="loading" @click="submit">
          {{ confirmText }}
        </el-button>
        <el-button type="default" @click="closeDrawer"> 取 消 </el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
  title: String,
  size: {
    type: String,
    default: '45%'
  },
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  confirmText: {
    type: String,
    default: '提 交'
  }
})

const emit = defineEmits(['submit'])

const showDrawer = ref(false)

const loading = ref(false)
const showLoading = () => (loading.value = true)
const hideLoading = () => (loading.value = false)
// 打开
const openDrawer = () => (showDrawer.value = true)
// 关闭
const closeDrawer = () => (showDrawer.value = false)
// 提交
const submit = () => emit('submit')

// 向父组件暴露方法
defineExpose({ openDrawer, closeDrawer, showLoading, hideLoading })
</script>

<style scoped>
.formDrawer {
  width: 100%;
  height: 100%;
  position: relative;
  @apply flex flex-col;
}

.formDrawer .body {
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}

.formDrawer .actions {
  height: 50px;
  @apply mt-auto flex items-center;
}
</style>
