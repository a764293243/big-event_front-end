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

// 创建Vue应用实例
const app = createApp(App)

// 使用Element Plus
app.use(ElementPlus)

// 配置axios
app.config.globalProperties.$axios = axios

// 挂载应用
app.mount('#app')
