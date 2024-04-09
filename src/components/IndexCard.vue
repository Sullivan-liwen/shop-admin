<template>
  <el-card shadow="never">
    <template #header>
      <div class="flex justify-between">
        <span class="text-sm">{{ title }}</span>
        <el-tag type="danger" effect="plain">
          {{ tip }}
        </el-tag>
      </div>
    </template>
    <el-row :gutter="20">
      <el-col :span="6" :offset="0">
        <el-card shadow="hover">
          <div class="flex flex-col items-center justify-center">
            <span class="text-xl mb-2">1</span>
            <span class="text-xs text-gray-500">代付款</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
defineProps({
  title: String,
  tip: String
})
</script>

<style scoped>
:deep(.el-card) {
  @apply border-0 bg-light-400;
}
</style>
