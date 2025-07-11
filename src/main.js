import './assets/main.scss'

import App from './App.vue'
// 导入Vue的createApp方法，用于创建Vue应用实例
import { createApp } from 'vue'
// 导入Element Plus UI组件库
import ElementPlus from 'element-plus'
// 导入Element Plus的样式文件
import 'element-plus/dist/index.css'
// 导入axios用于发送HTTP请求
import axios from 'axios'
// 导入路由器
import router from '@/router'
// 导入pinia
import { createPinia } from 'pinia'
// 导入pinia持久化插件，用于在刷新页面后依然保留pinia中的状态数据
import { createPersistedState } from 'pinia-persistedstate-plugin'
// 导入Element Plus的中文语言包
import locale from 'element-plus/dist/locale/zh-cn.mjs'

const persist = createPersistedState();
const pinia = createPinia();
//注意是pinia使用该插件！
pinia.use(persist);
// 创建Vue应用实例
const app = createApp(App)

app.use(pinia)
// 使用Element Plus,同时设置分页条为中文
app.use(ElementPlus,{locale})

// 配置axios
app.config.globalProperties.$axios = axios;
// 使用路由器
app.use(router);
// 挂载应用
app.mount('#app')
