# Big Event 前端项目

这是一个基于 Vue 3 + Vite 的前端项目，用于实现用户注册和登录功能。

## 项目功能

### 用户注册功能
- **功能描述**: 用户可以通过填写用户名、密码和确认密码进行注册
- **使用方法**: 
  1. 在登录页面点击"注册 →"链接切换到注册表单
  2. 填写用户名（5-16位字符）
  3. 填写密码（5-16位字符）
  4. 确认密码（必须与密码一致）
  5. 点击"注册"按钮完成注册
- **参数说明**: 
  - `username`: 用户名，必填，5-16位字符
  - `password`: 密码，必填，5-16位字符
  - `rePassword`: 确认密码，必填，必须与密码一致
- **返回值说明**: 
  - 成功: `{code: 0, message: "注册成功"}`
  - 失败: `{code: 1, message: "错误信息"}`

### 用户登录功能
- **功能描述**: 用户可以通过用户名和密码进行登录
- **使用方法**: 
  1. 在登录页面填写用户名和密码
  2. 可选择"记住我"功能
  3. 点击"登录"按钮完成登录

## 技术架构

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **UI组件库**: Element Plus
- **HTTP客户端**: Axios
- **代理配置**: 开发环境通过 Vite 代理将 `/api` 请求转发到 `http://localhost:8080`

## 项目结构

```
src/
├── api/           # API接口定义
│   └── user.js    # 用户相关API
├── utils/         # 工具函数
│   └── request.js # HTTP请求配置
├── views/         # 页面组件
│   └── Login.vue  # 登录注册页面
└── main.js        # 应用入口
```

## 开发环境设置

### 推荐IDE
[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (并禁用 Vetur)

### 安装依赖
```sh
npm install
```

### 开发模式运行
```sh
npm run dev
```

### 生产环境构建
```sh
npm run build
```

## 问题解决方案

### 注册功能失败问题 (已解决)
**问题描述**: 前端注册失败，但Postman测试成功

**原因分析**:
1. API调用数据格式不正确 - 创建了URLSearchParams但发送的是JSON对象
2. 错误处理不够详细，无法定位具体问题

**解决方案**:
1. 修复 `src/api/user.js` 中的数据发送格式，确保使用URLSearchParams发送数据
2. 改进 `src/utils/request.js` 中的错误处理，添加详细的错误信息输出
3. 优化 `src/views/Login.vue` 中的注册函数，添加表单验证和更好的用户体验

**修改内容**:
- 修复API数据格式: `request.post('/user/register', params)` 而不是 `registerData`
- 添加详细的错误日志和控制台输出
- 使用Element Plus的Message组件替代alert
- 添加表单验证和错误处理

### 响应拦截器逻辑错误问题 (已解决)
**问题描述**: `src/utils/request.js` 中的响应拦截器存在多余的return语句

**原因分析**:
1. 在响应拦截器的成功处理函数中，存在一个永远不会执行到的 `return result.data` 语句
2. 这个多余的return语句位于 `else` 分支之后，导致代码逻辑不清晰

**解决方案**:
1. 删除多余的 `return result.data` 语句
2. 确保响应拦截器的逻辑清晰：成功时返回 `result.data`，失败时返回 `Promise.reject(result)`

**修改内容**:
- 删除 `src/utils/request.js` 第32行的多余return语句
- 优化代码逻辑，确保每个分支都有明确的返回值

## 注意事项

1. 确保后端服务器运行在 `http://localhost:8080`
2. 注册时用户名和密码长度必须在5-16位之间
3. 确认密码必须与密码一致
4. 如遇到网络问题，请检查后端服务是否正常运行
