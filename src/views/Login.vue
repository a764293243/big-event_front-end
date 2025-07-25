<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false)
//定义数据模型
const registerData = ref({
    username: '',
    password: '',
    rePassword: ''
})

//校验密码的函数
/**
 * 校验确认密码是否与密码一致
 * @param {Object} rule - 验证规则对象
 * @param {string} value - 当前输入的值
 * @param {Function} callback - 验证完成后的回调函数
 */
const checkRePassword = (rule, value, callback) => {
    // 判断是否为空
    if(value === ''){
        callback(new Error('请再次输入密码'))
    }
    // 判断两次密码是否一致
    else if(value !== registerData.value.password){
        callback(new Error('两次密码不一致'))
    }
    // 验证通过
    else{
        callback()
    }
}

//定义表单校验规则
// 定义表单验证规则对象
const rules = {
    // 用户名验证规则
    username: [
        // 必填项验证
        { required: true, message: '请输入用户名', trigger: 'blur' },
        // 长度验证：5-16位字符
        { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
    ],
    // 密码验证规则
    password: [
        // 必填项验证
        { required: true, message: '请输入密码', trigger: 'blur' },
        // 长度验证：5-16位字符
        { min:5, max:16, message:"长度为5~16位非空字符", trigger:"blur"}
    ],
    // 确认密码验证规则
    rePassword: [
        // 使用自定义验证函数验证两次密码是否一致
        { validator: checkRePassword, trigger: 'blur' }
    ]
}

//调用后台接口，完成注册
//先获取定义好的api
import { userRegisterService, userLoginService } from '@/api/user.js'
const register = async () => {
    let result = await userRegisterService(registerData.value);
    // if(result.code === 0){
    //     //成功了
    //     alert(result.message ? result.message : '注册成功');
    // }
    // else {
    //     alert('注册失败');
    // }
    //响应拦截器已经处理了错误信息，所以不需要再处理
    // alert(result.message ? result.message : '注册成功');
    ElMessage.success(result.message ? result.message : '注册成功');
}

//绑定数据，复用注册表单的数据模型
//表单数据校验(复用注册表单的校验规则)
//登录函数
import { useRouter } from 'vue-router'
import { useTokenStore } from '@/stores/token';
const tokenStore = useTokenStore();
const router = useRouter();
const login = async () => {
    //调用接口，完成登录
    let result = await userLoginService(registerData.value);
    // if( result.code === 0){
    //     alert(result.massage ? result.message : '登录成功');
    // }
    // else {
    //     alert("登录失败");
    // }
    // alert(result.message ? result.message : '登录成功');
    //把得到的token存储到pinia中
    tokenStore.setToken(result.data);
    ElMessage.success(result.message ? result.message : '登录成功');
    //跳转到首页
    router.push('/');
}

//定义清空数据模型函数
const clearRegisterData = () => {
    registerData.value.username = '';
    registerData.value.password = '';
    registerData.value.rePassword = '';
}
</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <!-- 注册表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules"> 
                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password" show-password></el-input>
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码" v-model="registerData.rePassword" show-password></el-input>
                </el-form-item>
                <!-- 注册按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="register">
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = false; clearRegisterData()">
                        ← 返回
                    </el-link>
                </el-form-item>
            </el-form>
            <!-- 登录表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password" show-password></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>记住我</el-checkbox>
                        <el-link type="primary" :underline="false">忘记密码？</el-link>
                    </div>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = true; clearRegisterData()">
                        注册 →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
    height: 100vh;
    background-color: #fff;

    .bg {
        background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
            url('@/assets/login_bg.jpg') no-repeat center / cover;
        border-radius: 0 20px 20px 0;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;

        .title {
            margin: 0 auto;
        }

        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>