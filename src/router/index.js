import { createRouter, createWebHistory } from 'vue-router'

//导入布局组件
import LayoutVue from '@/views/Layout.vue'
import LoginVue from '@/views/Login.vue'
import ArticleCategoryVue from '@/views/article/ArticleCategory.vue'
import ArticleManageVue from '@/views/article/ArticleManage.vue'
import UserAvatarVue from '@/views/user/UserAvatar.vue'
import UserResetPasswordVue from '@/views/user/UserResetPassword.vue'
import UserInfoVue from '@/views/user/UserInfo.vue'

//定义路由关系
const routes = [
    {
        path: '/login',
        component: LoginVue
    },
    {
        path: '/',
        component: LayoutVue,
        redirect: '/article/manage',
        children: [
            {
                path: '/article/category',
                component: ArticleCategoryVue
            },
            {
                path: '/article/manage',
                component: ArticleManageVue
            },
            {
                path: '/user/avatar',
                component: UserAvatarVue
            },
            {
                path: '/user/resetPassword',
                component: UserResetPasswordVue
            },
            {
                path: '/user/info',
                component: UserInfoVue
            }
        ]
    }
]

//创建路由器
const router = createRouter({
    // 使用HTML5历史模式，提供更友好的URL格式（无#号）
    history: createWebHistory(),
    // 配置路由规则数组，定义应用的页面路由关系
    routes: routes
})

//导出路由器
export default router;