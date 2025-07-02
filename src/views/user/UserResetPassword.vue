<script setup>
import { ref } from 'vue'
// 定义表单校验规则，包含新密码和确认新密码一致性校验
const rules = {
    old_pwd: [
        { required: true, message: '请输入原密码', trigger: 'blur' },
        { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
    ],
    new_pwd: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' },
        { 
            validator: (rule, value, callback) => {
                // 如果用户没有输入内容，直接提示"请输入新密码"
                if (!value) {
                    callback(new Error('请输入新密码'));
                } 
                else if (value === passwordInfo.value.old_pwd) {
                    callback(new Error('新密码和旧密码不能相同'));
                } 
                else {
                    callback();
                }
            }, 
            trigger: 'blur' 
        }
    ],
    // 这里是对"确认新密码"输入框的校验规则
    // 第一个规则：必须填写（required），否则提示"请再次输入新密码"
    // 第二个规则：自定义校验函数，判断两次输入的新密码是否一致
    re_pwd: [
        { 
            required: true, 
            message: '请再次输入新密码', 
            trigger: 'blur' 
        },
        { 
            // 下面是"确认新密码"输入框的自定义校验函数
            // 这个函数的作用是：判断用户输入的"确认新密码"是否和上面输入的"新密码"一致
            // 这里不能用this获取数据，因为<script setup>语法糖下没有this，所以我们用passwordInfo.value来获取表单数据
            validator: (rule, value, callback) => {
                // 如果用户没有输入内容，直接提示"请再次输入新密码"
                if (!value) {
                    callback(new Error('请再次输入新密码'));
                } 
                // 如果"确认新密码"和"新密码"不一致，提示"两次输入的新密码不一致"
                else if (value !== passwordInfo.value.new_pwd) {
                    callback(new Error('两次输入的新密码不一致'));
                } 
                // 如果都通过了，说明校验成功，调用callback()表示校验通过
                else {
                    callback();
                }
            }, 
            trigger: 'blur' 
        }
    ]
}

//密码信息数据模型
const passwordInfo = ref({
    old_pwd: '',
    new_pwd: '',
    re_pwd: ''
});

import { useRouter } from 'vue-router'
const router = useRouter()

//修改密码
import { userPasswordUpdateService } from '@/api/user'
import { ElMessage } from 'element-plus';
const updatePassword = async () => {
    let result = await userPasswordUpdateService(passwordInfo.value);
    ElMessage.success(result.message ? result.message : '修改成功');
    //跳转到登录页面
    router.push('/login')
}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>基本资料</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="passwordInfo" :rules="rules" label-width="100px" size="large">
                    <el-form-item label="原密码" prop="old_pwd">
                        <el-input type="password" v-model="passwordInfo.old_pwd" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="new_pwd">
                        <el-input type="password" v-model="passwordInfo.new_pwd" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" prop="re_pwd">
                        <el-input type="password" v-model="passwordInfo.re_pwd" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updatePassword">提交修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>