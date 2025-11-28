# Crypto Tips 前端

基于 React + TypeScript + Vite 构建的 Web3 打赏平台前端应用。

## 技术栈

- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 快速的开发构建工具
- **Tailwind CSS** - 实用优先的 CSS 框架
- **ethers.js** - 以太坊交互库
- **React Router** - 路由管理

## 项目结构

```
frontend/
├── src/
│   ├── components/      # React 组件
│   │   ├── WalletButton.tsx    # 钱包连接按钮
│   │   └── TipForm.tsx         # 打赏表单
│   ├── hooks/           # 自定义 Hooks
│   │   └── useWallet.ts        # 钱包状态管理
│   ├── pages/           # 页面组件
│   ├── types/           # TypeScript 类型定义
│   ├── utils/           # 工具函数
│   │   └── web3.ts             # Web3 服务
│   ├── App.tsx          # 主应用组件
│   └── main.tsx         # 应用入口
├── public/              # 静态资源
├── index.html           # HTML 模板
└── package.json
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

应用将在 http://localhost:5173 运行

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 核心功能

### 1. 钱包连接

使用 MetaMask 连接以太坊钱包：

```typescript
import { useWallet } from './hooks/useWallet';

function MyComponent() {
  const { address, isConnected, connectWallet } = useWallet();

  return (
    <button onClick={connectWallet}>
      {isConnected ? address : '连接钱包'}
    </button>
  );
}
```

### 2. 发送打赏

通过 ethers.js 发送 ETH：

```typescript
import { web3Service } from './utils/web3';

const txHash = await web3Service.sendTip(
  recipientAddress,
  '0.01' // 金额（ETH）
);
```

### 3. 钱包状态管理

自动监听账户和网络变化：

- 账户切换自动更新
- 网络切换自动刷新
- 错误处理

## 环境变量

创建 `.env` 文件：

```env
VITE_API_URL=http://localhost:3000
VITE_CHAIN_ID=11155111
VITE_NETWORK_NAME=sepolia
```

## 开发说明

### 添加新组件

```bash
# 创建新组件
touch src/components/MyComponent.tsx
```

### 样式规范

使用 Tailwind CSS 实用类：

```tsx
<div className="bg-white rounded-lg p-6 shadow-lg">
  <h2 className="text-2xl font-bold mb-4">标题</h2>
</div>
```

### TypeScript 类型

类型定义在 `src/types/index.ts`：

```typescript
export interface User {
  id: string;
  username: string;
  walletAddress: string;
}
```

## 部署

### Vercel 部署

```bash
npm install -g vercel
vercel --prod
```

### Netlify 部署

1. 连接 GitHub 仓库
2. 构建命令: `npm run build`
3. 发布目录: `dist`

## 常见问题

### MetaMask 连接失败

确保：
- MetaMask 已安装
- 浏览器允许弹出窗口
- 使用 HTTPS 或 localhost

### 交易失败

检查：
- 账户余额充足
- Gas 费设置合理
- 网络连接正常

## 待开发功能

- [ ] 用户个人主页
- [ ] 打赏记录展示
- [ ] 二维码分享
- [ ] 深色模式
- [ ] 多语言支持
- [ ] 移动端适配优化

## 相关文档

- [开发指南](../docs/开发指南.md)
- [部署指南](../docs/部署指南.md)
- [项目主页](../README.md)
