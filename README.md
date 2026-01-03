# 千幻图卡

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/hao430/image-display@main/public/logo.png" alt="千幻图卡 Logo" width="120px" height="120px" />
  <h3>✨ 一个美观易用的图片上传与展示工具 ✨</h3>
  <p>支持多种图片格式，具有优雅的双层玻璃拟态效果，一键生成精美图片卡片</p>
</div>

## 📸 项目预览

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/hao430/image-display@main/screenshots/demo.png" alt="千幻图卡 预览" width="600px" />
</div>

## ✨ 功能特性

- 📤 **图片上传**：支持选择本地图片文件，支持多种图片格式
- 👀 **实时预览**：上传后立即查看图片效果
- 📊 **上传进度**：实时显示上传进度，提供良好的用户反馈
- 🎨 **双层展示**：底层玻璃拟态效果 + 顶层清晰图片，营造立体视觉效果
- 💾 **一键下载**：将生成的图片卡片一键下载到本地，图片不失真
- 🌍 **国际化支持**：支持中英文切换，适应不同用户需求
- 📱 **响应式设计**：完美适配各种屏幕尺寸，从手机到桌面设备
- ⚠️ **智能验证**：自动验证文件格式和大小，提供友好的错误提示
- 🎯 **组件化设计**：采用现代化组件化架构，代码结构清晰易维护

## 🛠️ 技术栈

| 技术栈 | 版本 | 用途 |
|--------|------|------|
| Vue 3 | ^3.5.18 | 前端框架 |
| TypeScript | ~5.8.3 | 开发语言 |
| Vite | ^7.3.0 | 构建工具 |
| Vue I18n | ^12.0.0 | 国际化支持 |
| html2canvas | ^1.4.1 | DOM转图片，实现下载功能 |
| @iconify/vue | ^5.0.0 | 图标支持 |
| CSS3 | - | 样式设计 |

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看应用

### 构建生产版本

```bash
npm run build
```

构建后的文件将输出到 `dist` 目录

### 预览生产版本

```bash
npm run preview
```

## 📁 项目结构

```
.
├── public/              # 静态资源
│   └── logo.png         # 项目logo
├── screenshots/         # 项目截图
│   └── demo.png         # 演示图片
├── src/                 # 源代码
│   ├── assets/          # 资源文件
│   ├── components/      # 组件目录
│   │   ├── DownloadButton.vue   # 下载按钮组件
│   │   ├── Footer.vue           # 页脚组件
│   │   ├── ImageDisplay.vue     # 图片展示组件
│   │   └── ImageUploader.vue    # 图片上传组件
│   ├── i18n/            # 国际化配置
│   │   ├── en.ts         # 英文翻译
│   │   ├── zh.ts         # 中文翻译
│   │   └── index.ts      # i18n配置
│   ├── App.vue          # 主应用组件
│   ├── main.ts          # 应用入口
│   └── style.css        # 全局样式
├── index.html           # HTML模板
├── package.json         # 项目配置
├── tsconfig.json        # TypeScript配置
└── vite.config.ts       # Vite配置
```

## 📖 使用说明

1. **选择图片**：点击"选择图片"按钮，从本地选择一张图片
2. **查看预览**：系统会自动验证图片格式和大小，并生成预览效果
3. **下载图片**：点击"下载图片"按钮，将生成的图片卡片下载到本地
4. **重新选择**：点击"重新选择"按钮，可以上传新的图片
5. **切换语言**：点击右上角的语言切换按钮，可以在中英文之间切换

## 🎨 设计特点

### 玻璃拟态效果

千幻图卡采用了现代流行的玻璃拟态（Glassmorphism）设计风格：

- 半透明背景，带有模糊效果
- 微妙的边框和阴影
- 层次感强的双层图片设计
- 柔和的色彩过渡

### 响应式设计

- 桌面端：完整展示所有元素，提供最佳视觉体验
- 平板端：自适应布局，保持良好的可用性
- 移动端：简化布局，优化触摸操作

## 🌐 国际化

- 支持中文和英文两种语言
- 自动保存用户语言偏好
- 无缝切换，不影响用户操作

## 📦 部署信息

### 在线访问

- 域名：https://image.hao430.xyz
- 状态：正常运行

### 项目仓库

- GitHub：https://github.com/hao430/image-display
- 分支：main
- 许可证：MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 开发流程

1. Fork 仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

### 代码规范

- 遵循 TypeScript 编码规范
- 使用 ESLint 和 Prettier 格式化代码
- 保持组件化设计原则
- 注释清晰，便于理解

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

- 邮箱：fervent430@163.com
- GitHub：https://github.com/hao430
- 微信：wx2094411638

## 📋 更新日志

### v1.0.0 (2026-01-03)

- ✨ 初始版本发布
- 📤 实现图片上传功能
- 🎨 添加玻璃拟态效果
- 💾 实现图片下载功能
- 🌍 添加国际化支持
- 📱 实现响应式设计

---

<div align="center">
  <p>📸 用千幻图卡，让你的图片更精彩！</p>
  <p>Made with ❤️ by <a href="https://github.com/hao430">hao430</a></p>
</div>