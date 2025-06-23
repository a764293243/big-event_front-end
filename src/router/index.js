import { createRouter, createWebHistory } from 'vue-router'

//导入布局组件
import LayoutVue from '@/views/Layout.vue'
import ArticleCategoryVue from '@/views/article/ArticleCategory.vue'
import ArticleManageVue from '@/views/article/ArticleManage.vue'
import UserAvatarVue from '@/views/user/UserAvatar.vue'
import UserResetPasswordVue from '@/views/user/UserResetPassword.vue'
import UserInfoVue from '@/views/user/UserInfo.vue'

//定义路由关系
const routes = [
    {
        // 这里使用了路由懒加载（异步加载组件），只有当访问 /login 路由时，才会去加载 Login.vue 组件
        // 这样可以减少首次加载时需要加载的资源，提高页面加载速度
        // 如果你直接 import LoginVue from '@/views/Login.vue'，则会在项目启动时就加载该组件
        // 但如果你用 component: LoginVue，且 LoginVue 没有被正确导入，就会出现未加载的情况
        // 推荐如下写法，确保 /login 路由访问时一定能加载到组件
        path: '/login',
        component: () => import("@/views/Login.vue")
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