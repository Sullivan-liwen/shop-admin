<template>
  <div>
    <el-row :gutter="20">
      <template v-if="panels.length == 0">
        <el-col :span="6" :offset="0" v-for="index in 4" :key="index">
          <el-skeleton style="width: 100%" animated loading>
            <template #template>
              <el-card shadow="hover" class="border-0">
                <template #header>
                  <div class="flex justify-between">
                    <el-skeleton-item variant="text" style="width: 50%" />
                    <el-skeleton-item variant="text" style="width: 10%" />
                  </div>
                </template>
                <el-skeleton-item variant="h3" style="width: 80%" />
                <el-divider />
                <div class="flex justify-between">
                  <el-skeleton-item variant="text" style="width: 50%" />
                  <el-skeleton-item variant="text" style="width: 20%" />
                </div>
              </el-card>
            </template>
          </el-skeleton>
        </el-col>
      </template>
      <el-col :span="6" :offset="0" v-for="(item, index) in panels" :key="index">
        <el-card shadow="hover" class="border-0">
          <template #header>
            <div class="flex justify-between">
              <span class="text-sm">{{ item.title }}</span>
              <el-tag :type="item.unitColor" effect="plain">
                {{ item.unit }}
              </el-tag>
            </div>
          </template>
          <span class="text-3xl font-bold text-gray-500">
            <CountTo :value="item.value" />
          </span>
          <el-divider />
          <div class="flex justify-between">
            <span>{{ item.subTitle }}</span>
            <span>{{ item.subValue }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <IndexNavs />
    <el-row :gutter="20" class="mt-5">
      <el-col :span="12" :offset="0">
        <IndexChart />
      </el-col>
      <el-col :span="12" :offset="0">
        <IndexCard title="店铺及商品提示" tip="店铺及商品提示" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getStatistics1 } from '~/api/statistics.js'
import CountTo from '~/components/CountTo.vue'
import IndexNavs from '~/components/IndexNavs.vue'
import IndexChart from '~/components/IndexChart.vue'
import IndexCard from '~/components/IndexCard.vue'

const panels = ref([])
getStatistics1().then((res) => {
  panels.value = res.panels
})
</script>

<style></style>
