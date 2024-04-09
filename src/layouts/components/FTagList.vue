<template>
  <div class="f-tag-list" :style="{ left: $store.state.asideWidth }">
    <el-tabs
      v-model="activeTab"
      type="card"
      class="demo-tabs"
      style="min-width: 100px"
      @tab-change="changeTab"
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="item in tabList"
        :closable="item.path != '/'"
        :key="item.path"
        :label="item.title"
        :name="item.path"
      >
      </el-tab-pane>
    </el-tabs>
    <span class="tag-btn">
      <el-dropdown @command="handlerClose">
        <span class="el-dropdown-link">
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="clearOther">关闭其他</el-dropdown-item>
            <el-dropdown-item command="clearAll">全部关闭</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
  <div style="height: 44px"></div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, onBeforeRouteUpdate, useRouter } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'

const route = useRoute()
const router = useRouter()
const cookie = useCookies()

const activeTab = ref(route.path)
const tabList = ref([
  {
    title: '后台首页',
    path: '/'
  }
])

// 初始化标签导航列表
initTabList()
function initTabList() {
  let tabs = cookie.get('tabList')
  if (tabs) {
    tabList.value = tabs
  }
}

// 添加标签导航
function addTab(tab) {
  let noTab = tabList.value.findIndex((t) => t.path == tab.path) == -1
  if (noTab) {
    tabList.value.push(tab)
  }
  cookie.set('tabList', tabList.value)
}

onBeforeRouteUpdate((to, from) => {
  activeTab.value = to.path
  addTab({
    title: to.meta.title,
    path: to.path
  })
})

const changeTab = (t) => {
  activeTab.value = t
  router.push(t)
}

const removeTab = (targetTabPath) => {
  console.log(targetTabPath)
  let activeTabPath = activeTab.value
  let tabs = tabList.value
  if (activeTabPath == targetTabPath) {
    tabs.forEach((eachTab, index) => {
      if (eachTab.path == targetTabPath) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeTabPath = nextTab.path
        }
      }
    })
  }
  activeTab.value = activeTabPath
  tabList.value = tabList.value.filter((tab) => tab.path != targetTabPath)
  cookie.set('tabList', tabList.value)
  router.push(activeTabPath)
}

const handlerClose = (close) => {
  if (close == 'clearAll') {
    // 切换到首页
    activeTab.value = '/'
    tabList.value = [
      {
        title: '后台首页',
        path: '/'
      }
    ]
  } else {
    tabList.value = tabList.value.filter((tab) => tab.path == '/' || tab.path == activeTab.value)
  }
  cookie.set('tabList', tabList.value)
  router.push(activeTab.value)
}
</script>

<style scoped>
.f-tag-list {
  @apply fixed bg-gray-100 flex items-center px-2;
  top: 64px;
  right: 0;
  height: 44px;
  border: 0;
  z-index: 100;
}

.tag-btn {
  @apply bg-white rounded ml-auto flex items-center justify-center px-2;
  height: 32px;
}

:deep(.el-tabs__header) {
  border: 0 !important;
  @apply mb-0 flex items-center justify-center;
}

:deep(.el-tabs__nav) {
  border: 0 !important;
}

:deep(.el-tabs__item) {
  border: 0 !important;
  height: 32px;
  line-height: 32px;
  @apply bg-white mx-1 rounded;
}
:deep(.el-tabs__nav-next),
:deep(.el-tabs__nav-prev) {
  line-height: 32px;
  height: 32px;
}
:deep(.is-disabled) {
  cursor: not-allowed;
  @apply text-gray-300;
}
</style>
