/**
 * 创建并配置axios请求实例
 * 用于统一管理API请求的配置和拦截器
 */

// 导入axios库
import axios from 'axios';

/**
 * 配置基础URL
 * 所有请求都会基于这个基础URL进行
 */
const baseURL = '/api';

/**
 * 创建axios实例
 * 使用create方法创建一个新的axios实例，并传入基础配置
 */
const instance = axios.create({ baseURL });

//导入element-plus的message组件
import { ElMessage } from 'element-plus';
// 配置请求拦截器
import { useTokenStore } from '@/stores/token';
instance.interceptors.request.use(
    config => {//请求前的回调
        const tokenStore = useTokenStore();
        //如果有token，就添加到请求头中
        if( tokenStore.token ) {
            config.headers.Authorization = tokenStore.token;
        }
        return config;
    },
    err =>  {
        //请求错误时候的回调
        Promise.reject(err);
    }
)

// 不能直接在这里使用useRouter，因为useRouter只能在setup函数或Vue组件的setup上下文中使用，
// 在这个文件（非组件、非setup环境）中无法获取到router实例。
// 正确做法是直接从你在main.js中创建的router实例导入使用。
// 例如：在src/main.js中已经创建了router，可以在这里直接import router
import router from '@/router';
/**
 * 配置响应拦截器
 * 用于统一处理响应数据和错误
 */
instance.interceptors.response.use(
    // 成功响应处理
    result => {
        if(result.data.code === 0){
            // console.log("result.data.data:" + result.data.data);
            return result.data;    
        }
        else {
            //操作失败
            // alert(result.data.message ? result.data.message : '服务异常');
            ElMessage.error(result.data.message ? result.data.message : '服务异常')
            return Promise.reject(result.data);
        }
    },
    // 错误响应处理
    err => {
        //判断响应状态码，如果是401，则说明未登录，提示请登录并且跳转到登录页面
        if( err.response.status === 401 ) {
            ElMessage.error('请先登录');
            router.push('/login');
        }
        else {
            // 将错误传递给调用方处理
            return Promise.reject(err);
        }
    }
);

// 导出配置好的axios实例
export default instance;