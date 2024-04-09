import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import 'normalize.css'
import 'nprogress/nprogress.css'
import 'virtual:windi.css'
import { createApp } from 'vue'
import App from './App.vue'
import './permission'
import { router } from './router'
import store from './store'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
app.use(store)
app.mount('#app')
