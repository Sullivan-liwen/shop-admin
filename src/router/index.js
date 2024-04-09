import { createRouter, createWebHashHistory } from 'vue-router'
import Admin from '~/layouts/admin.vue'
import NotFound from '~/pages/404.vue'
import GoodList from '~/pages/goods/list.vue'
import Index from '~/pages/index.vue'
import Login from '~/pages/login.vue'

// 默认路由 所有用户共享
const routes = [
  {
    path: '/',
    name: 'admin',
    component: Admin
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '404'
    }
  }
]

// 动态路由 用户匹配菜单动态添加路由
const asyncRoutes = [
  {
    path: '/',
    name: '/',
    component: Index,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/goods/list',
    name: '/goods/list',
    component: GoodList,
    meta: {
      title: '商品管理'
    }
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 动态添加路由的方法
export function addRoutes(menus) {
  // 是否有新的路由
  let hasNewRoutes = false
  const findAndAddRoutesByMenus = (arr) => {
    arr.forEach((element) => {
      let existItem = asyncRoutes.find((item) => item.path == element.frontpath)
      if (existItem && !router.hasRoute(existItem.path)) {
        router.addRoute('admin', existItem)
        hasNewRoutes = true
      }
      let child = element.child
      if (child && child.length > 0) {
        findAndAddRoutesByMenus(child)
      }
    })
  }
  findAndAddRoutesByMenus(menus)
  return hasNewRoutes
}
