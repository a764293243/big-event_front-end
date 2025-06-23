//定义store
import { defineStore } from 'pinia';
import { ref } from 'vue';
//第一个参数：名字，具有唯一性
//第二个参数：函数，函数内部可以定义状态的所有内容
//返回值：函数
//注意分清楚defineStore和第二个参数的返回值的区别，一个是函数，一个是对象
export const useTokenStore = defineStore('token', () => {
    //1定义状态
    const token = ref('');

    //定义函数用于修改token值
    const setToken = (newToken) => {
        token.value = newToken;
    }

    //定义函数用于移除token值
    const removeToken = () => {
        token.value = '';
    }

    //返回值：对象，对象中包含状态和函数
    return {
        token,
        setToken, //设置token值
        removeToken //移除token值
    }
    
}, {
    persist: true//持久化存储
});