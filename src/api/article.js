import request from '@/utils/request'
//文章分类列表查询
export const articleCategoryListService = () => {
    return request.get('/category');
}

//添加文章分类
export const articleCategoryAddService = (categoryData) => {
    return request.post('/category', categoryData);
}