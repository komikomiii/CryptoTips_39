# Crypto Tips 后端

基于 Node.js + Express + TypeScript + Prisma 构建的 Web3 打赏平台后端 API。

## 技术栈

- **Node.js** - JavaScript 运行时
- **Express** - Web 框架
- **TypeScript** - 类型安全
- **Prisma** - 现代化 ORM
- **SQLite** - 轻量级数据库
- **JWT** - 身份认证
- **bcryptjs** - 密码加密

## 项目结构

```
backend/
├── src/
│   ├── controllers/     # 控制器
│   │   ├── userController.ts    # 用户相关
│   │   └── tipController.ts     # 打赏相关
│   ├── routes/          # 路由定义
│   │   ├── userRoutes.ts
│   │   └── tipRoutes.ts
│   ├── middleware/      # 中间件
│   ├── utils/           # 工具函数
│   │   └── prisma.ts            # Prisma 客户端
│   └── index.ts         # 应用入口
├── prisma/
│   ├── schema.prisma    # 数据库模型
│   └── migrations/      # 数据库迁移
├── package.json
└── tsconfig.json
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 环境配置

创建 `.env` 文件：

```env
DATABASE_URL="file:./dev.db"
PORT=3000
JWT_SECRET="your-secret-key-change-this-in-production"
NODE_ENV=development
```

### 数据库设置

```bash
# 生成 Prisma 客户端
npm run prisma:generate

# 运行数据库迁移
npm run prisma:migrate

# 查看数据库（可选）
npx prisma studio
```

### 开发环境运行

```bash
npm run dev
```

API 服务将在 http://localhost:3000 运行

### 构建生产版本

```bash
npm run build
npm start
```

## API 接口文档

### 用户接口

#### 创建用户
```
POST /api/users
Content-Type: application/json

{
  "username": "alice",
  "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "displayName": "Alice",
  "bio": "内容创作者",
  "avatarUrl": "https://..."
}
```

#### 通过钱包地址获取用户
```
GET /api/users/wallet/:walletAddress
```

响应示例：
```json
{
  "id": "uuid",
  "username": "alice",
  "walletAddress": "0x...",
  "displayName": "Alice",
  "bio": "内容创作者",
  "tipsReceived": [...]
}
```

#### 通过用户名获取用户
```
GET /api/users/username/:username
```

### 打赏接口

#### 创建打赏记录
```
POST /api/tips
Content-Type: application/json

{
  "fromAddress": "0x...",
  "toAddress": "0x...",
  "amount": "0.01",
  "message": "感谢你的分享！",
  "txHash": "0x..."
}
```

#### 获取用户的所有打赏记录
```
GET /api/tips/user/:walletAddress
```

#### 获取用户接收的打赏
```
GET /api/tips/received/:walletAddress
```

### 健康检查

```
GET /health
```

响应：
```json
{
  "status": "ok",
  "message": "Crypto Tips API is running"
}
```

## 数据库模型

### User 表

```prisma
model User {
  id            String   @id @default(uuid())
  username      String   @unique
  walletAddress String   @unique
  displayName   String?
  bio           String?
  avatarUrl     String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  tipsReceived  Tip[]    @relation("TipRecipient")
  tipsSent      Tip[]    @relation("TipSender")
}
```

### Tip 表

```prisma
model Tip {
  id          String   @id @default(uuid())
  fromAddress String
  toAddress   String
  amount      String
  message     String?
  txHash      String   @unique
  createdAt   DateTime @default(now())

  fromUser    User?    @relation("TipSender", fields: [fromAddress], references: [walletAddress])
  toUser      User?    @relation("TipRecipient", fields: [toAddress], references: [walletAddress])
}
```

## 开发说明

### 添加新路由

1. 创建控制器 `src/controllers/myController.ts`
2. 创建路由 `src/routes/myRoutes.ts`
3. 在 `src/index.ts` 中注册路由

```typescript
import myRoutes from './routes/myRoutes';
app.use('/api/my', myRoutes);
```

### 数据库迁移

```bash
# 创建新迁移
npx prisma migrate dev --name migration_name

# 重置数据库
npx prisma migrate reset

# 部署到生产环境
npx prisma migrate deploy
```

### 查看数据库

```bash
npx prisma studio
```

在浏览器中打开 http://localhost:5555

## 错误处理

所有 API 错误返回格式：

```json
{
  "error": "错误信息"
}
```

HTTP 状态码：
- `200` - 成功
- `201` - 创建成功
- `400` - 请求错误
- `404` - 未找到
- `500` - 服务器错误

## 安全注意事项

### 生产环境配置

- 使用强随机 JWT_SECRET
- 启用 HTTPS
- 配置 CORS 白名单
- 限制请求速率
- 添加日志监控

### CORS 配置

```typescript
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
```

## 测试

```bash
# 运行测试（待实现）
npm test

# 测试覆盖率
npm run test:coverage
```

## 部署

### 使用 Railway

1. 访问 https://railway.app
2. 连接 GitHub 仓库
3. 配置环境变量
4. 自动部署

### 使用 Render

1. 访问 https://render.com
2. 创建 Web Service
3. 配置构建命令: `npm run build`
4. 配置启动命令: `npm start`

### 使用 Docker（可选）

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 常见问题

### 数据库连接失败

检查 `DATABASE_URL` 是否正确配置

### 端口被占用

修改 `.env` 中的 `PORT` 配置

### Prisma 生成失败

```bash
npx prisma generate --force
```

## 待开发功能

- [ ] JWT 身份认证
- [ ] API 请求速率限制
- [ ] 数据验证中间件
- [ ] 日志系统
- [ ] 单元测试
- [ ] API 文档（Swagger）
- [ ] 邮件通知
- [ ] WebSocket 实时更新

## 相关文档

- [开发指南](../docs/开发指南.md)
- [部署指南](../docs/部署指南.md)
- [项目主页](../README.md)
