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

/**
 * 配置响应拦截器
 * 用于统一处理响应数据和错误
 */
instance.interceptors.response.use(
    // 成功响应处理
    result => {
        // 直接返回响应数据，简化后续处理
        return result.data;
    },
    // 错误响应处理
    err => {
        // 显示详细的错误信息，帮助调试
        console.error('请求错误详情:', err);
        if (err.response) {
            // 服务器返回了错误状态码
            console.error('错误状态码:', err.response.status);
            console.error('错误数据:', err.response.data);
            alert(`请求失败: ${err.response.status} - ${err.response.data?.message || '未知错误'}`);
        } else if (err.request) {
            // 请求已发出但没有收到响应
            console.error('网络错误:', err.request);
            alert('网络连接失败，请检查网络连接');
        } else {
            // 其他错误
            console.error('其他错误:', err.message);
            alert(`请求配置错误: ${err.message}`);
        }
        // 将错误传递给调用方处理
        return Promise.reject(err);
    }
);

// 导出配置好的axios实例
export default instance;