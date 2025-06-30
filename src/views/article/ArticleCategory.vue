<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'
import { ref } from 'vue'
const categorys = ref([
    {
        "id": 3,
        "categoryName": "美食",
        "categoryAlias": "my",
        "createTime": "2023-09-02 12:06:59",
        "updateTime": "2023-09-02 12:06:59"
    },
    {
        "id": 4,
        "categoryName": "娱乐",
        "categoryAlias": "yl",
        "createTime": "2023-09-02 12:08:16",
        "updateTime": "2023-09-02 12:08:16"
    },
    {
        "id": 5,
        "categoryName": "军事",
        "categoryAlias": "js",
        "createTime": "2023-09-02 12:08:33",
        "updateTime": "2023-09-02 12:08:33"
    }
])
// 获取文章分类列表
import { articleCategoryListService } from '@/api/article';
const articleCategoryList = async () => {
    const result = await articleCategoryListService();
    categorys.value = result.data;
}
import { onMounted } from 'vue';

//添加文章分类功能

//控制添加分类弹窗
const dialogVisible = ref(false);

//添加分类数据模型
const categoryModel = ref({
    categoryName: '',
    categoryAlias: ''
})

//添加分类表单校验
const rules = {
    categoryName: [
        {required: true, message: "请输入分类名称", trigger: 'blur'},
    ],
    categoryAlias: [
        {required: true, message: '请输入分类别名', trigger: 'blur'},
    ]
}

//调用接口添加表单
import { articleCategoryAddService } from '@/api/article';
import { ElMessage, ElMessageBox } from 'element-plus';
const addCategory = async () => {
    const result = await articleCategoryAddService(categoryModel.value);
    ElMessage.success( result.message ? result.message : '添加成功' );
    //刷新列表
    articleCategoryList();
    //关闭窗口
    dialogVisible.value = false;

}

//弹窗名称
let dialogTitle = ref('');

import { articleCategoryUpdateService } from '@/api/article';
//展示编辑弹窗
const showEditDialog = (row) => {
    //注意如果不在标签内部的话，需要加上.value
    dialogVisible.value = true; 
    dialogTitle.value ='编辑分类';
    //数据拷贝
    categoryModel.value.categoryName = row.categoryName;
    categoryModel.value.categoryAlias = row.categoryAlias;
    //扩张id属性，将来需要时候传递给后台
    categoryModel.value.id = row.id;
}

//编辑分类后确定
const updateCategory = async () => {
    let result = await articleCategoryUpdateService(categoryModel.value);
    ElMessage.success(result.message ? result.message : '修改成功');

    //刷新一下，调用获取所有分类的函数
    articleCategoryList();

    //关闭弹窗
    dialogVisible.value = false;
}

//清空模型的数据
const clearData = () => {
    categoryModel.value.categoryAlias = '';
    categoryModel.value.categoryName = '';
}

//删除分类
import { articleCategoryDeleteService } from '@/api/article'
const deleteCategory = (row) => {
    //提示用户
    ElMessageBox.confirm(
        '您确认要删除该分类信息吗？',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        }
    )
    .then(
        async () => {
            //调用接口
            let result = await articleCategoryDeleteService(row.id);
            ElMessage({
                type: 'success',
                message: '删除成功'
            })
            //刷新列表
            articleCategoryList();
        }
    )
    .catch(
        () => {
            ElMessage({
                type: 'info',
                message: '用户取消了删除'
            })
        }
    )
}
// 页面加载时获取文章分类列表
onMounted(() => {
    articleCategoryList();
})
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>文章分类</span>
                <div class="extra">
                    <el-button type="primary" @click="dialogVisible = true; dialogTitle = '添加分类'; clearData()">添加分类</el-button>
                </div>
            </div>
        </template>
        <!-- 
            你问：row 是怎么通过一个“列”就获取到“行”的数据的？

            其实，<el-table> 组件渲染时，每一行都会渲染所有的列。
            在 <el-table-column> 里用 <template #default="{ row }">，Element Plus 会自动把当前这一行的数据对象传进来。
            也就是说，不管你在哪一列的作用域插槽里，row 都是“当前行的数据”。

            这是因为表格组件在渲染每一行每一列时，都会把这一行的数据对象（row）传递给每个列的插槽。
            所以你在“操作”这一列里，也能拿到 row，row 就是当前行的完整数据对象。

            举个例子：
            - categorys 里有三条数据，表格就渲染三行。
            - 每一行渲染“操作”列时，Element Plus 都会把这一行的数据对象传给 <template #default="{ row }">。
            - 这样你在“操作”列里就能拿到 row，row.categoryName、row.categoryAlias 等等。

            总结：row 是 Element Plus 表格自动帮你传进来的“当前行数据”，每一列的插槽都能拿到。
        -->
        <!-- 
            这里的 row 和数据模型的关系说明：

            row 是 Element Plus 表格组件自动传递给每一行每一列插槽的“当前行数据对象”。
            你传给 <el-table> 的 :data="categorys"，categorys 是一个数组，里面每一项就是一行的数据对象。
            row 就是 categorys 里的某一项（对象的引用），所以 row 和 categorys 里的数据是同一个对象。

            例如：
            categorys = [
                { categoryName: '前端', categoryAlias: 'web' },
                { categoryName: '后端', categoryAlias: 'server' }
            ]
            那么 row 就会分别等于上面数组里的每一个对象。

            这和你的数据模型（比如 categoryModel）是分开的，row 只是表格当前行的数据对象。
            你可以把 row 的内容赋值给 categoryModel，实现“编辑”功能。
        -->
        <el-table :data="categorys" style="width: 100%">
            <el-table-column label="序号" width="100" type="index"> </el-table-column>
            <el-table-column label="分类名称" prop="categoryName"></el-table-column>
            <el-table-column label="分类别名" prop="categoryAlias"></el-table-column>
            <el-table-column label="操作" width="100">
                <!-- row 就是 categorys 数组里的某一项，和数据模型 categoryModel 没有直接关系，但你可以用 row 的数据去更新 categoryModel -->
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="showEditDialog(row)" ></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteCategory(row)"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>

        <!-- 添加分类弹窗 -->
        <el-dialog v-model="dialogVisible" :title="dialogTitle" width="30%">
            <el-form :model="categoryModel" :rules="rules" label-width="100px" style="padding-right: 30px">
                <el-form-item label="分类名称" prop="categoryName">
                    <el-input v-model="categoryModel.categoryName" minlength="1" maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="分类别名" prop="categoryAlias">
                    <el-input v-model="categoryModel.categoryAlias" minlength="1" maxlength="15"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogTitle === '添加分类' ? addCategory : updateCategory()"> 确认 </el-button>
                </span>
            </template>
        </el-dialog>
    </el-card>
</template>

<style lang="scss" scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>