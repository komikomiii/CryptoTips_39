# Crypto Tips - Web3 加密货币打赏平台

一个基于 Web3 技术构建的去中心化打赏平台，让内容创作者能够从支持者那里接收加密货币打赏。

## 项目特点

- **Web3 集成**: 通过 MetaMask 钱包进行安全交易
- **便捷打赏**: 只需几次点击即可发送 ETH/USDT 打赏
- **创作者主页**: 为每位创作者提供个性化打赏页面
- **打赏历史**: 追踪所有发送和接收的打赏记录
- **社交分享**: 通过二维码或链接分享您的打赏页面

## 技术栈

### 前端

- React 18 + TypeScript
- Vite (构建工具)
- Tailwind CSS (样式框架)
- ethers.js (Web3 集成)

### 后端

- Node.js + Express + TypeScript
- Prisma (ORM)
- SQLite (数据库)
- JWT (身份认证)

### 区块链

- Ethereum (Sepolia 测试网)
- MetaMask 钱包集成

## 项目结构

```
crypto-tips/
├── frontend/          # React 前端应用
├── backend/           # Node.js 后端 API
├── docs/              # 文档和分析
└── README.md
```

## 快速开始

### 环境要求

- Node.js 18+
- MetaMask 浏览器扩展
- Git

### 安装步骤

1. 克隆仓库：

```bash
git clone https://github.com/komikomiii/CryptoTips_39.git
cd CryptoTips_39
```

2. 安装前端依赖：

```bash
cd frontend
npm install
```

3. 安装后端依赖：

```bash
cd backend
npm install
```

4. 配置环境变量：

```bash
# 后端 (.env)
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
PORT=3000
```

5. 初始化数据库：

```bash
cd backend
npx prisma migrate dev
```

6. 运行应用：

```bash
# 终端 1 - 后端
cd backend
npm run dev

# 终端 2 - 前端
cd frontend
npm run dev
```

## 使用说明

### 对于创作者

1. 连接您的 MetaMask 钱包
2. 创建您的个人资料页面
3. 分享您的专属打赏链接

### 对于支持者

1. 访问创作者的打赏页面
2. 连接您的钱包
3. 发送打赏并附上留言（可选）

## 开发路线图

- [x] 项目初始化
- [ ] 用户认证系统
- [ ] 创作者资料管理
- [ ] MetaMask 钱包集成
- [ ] 打赏功能
- [ ] 交易历史记录
- [ ] 二维码生成
- [ ] 社交分享功能
- [ ] 数据分析仪表板

## 贡献指南

欢迎贡献代码！请随时提交 Pull Request。

1. Fork 本项目
2. 创建您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m '添加某个功能'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系方式

项目链接: [https://github.com/komikomiii/CryptoTips_39](https://github.com/komikomiii/CryptoTips_39)

## 致谢

- 本项目作为 Web3 技术探索的课程项目
- 灵感来源于 Ko-fi 和 Buy Me a Coffee 等平台
- 特别感谢以太坊和 Web3 社区

## 相关文档

- [五看三定分析](docs/五看三定分析.md) - 项目战略分析
- [开发指南](docs/开发指南.md) - 详细的开发文档
- [部署指南](docs/部署指南.md) - 生产环境部署说明

## 新功能更新

### 用户资料展示
- 显示用户钱包地址
- 显示账户余额信息
- 个性化用户信息展示
- 支持头像和简介设置
