# Hisilicon Developer Portal Mirror

华为海思开发者门户 GitHub Pages 镜像项目

## 功能

本项目是华为海思开发者门户的静态镜像，主要实现了以下功能：

- **首页** - 开发者门户欢迎页面
- **ModelZoo** - AI模型库，包含47个预训练模型

## 页面

- `index.html` - 开发者门户首页
- `modelzoo.html` - ModelZoo模型市场页面

## 部署

本项目已部署到 GitHub Pages：
https://gitbubble.github.io/hisilicon-developer-portal-mirror/

### 本地开发

```bash
# 克隆项目
git clone https://github.com/gitbubble/hisilicon-developer-portal-mirror.git
cd hisilicon-developer-portal-mirror

# 使用 Python 启动本地服务器
python3 -m http.server 8000

# 访问 http://localhost:8000
```

### 部署到 GitHub Pages

```bash
# 添加更改
git add .
git commit -m "Add ModelZoo page"

# 推送到 GitHub
git push origin main
```

## 技术栈

- 纯 HTML/CSS/JavaScript
- 无需后端依赖
- 响应式设计

## 注意事项

1. 本项目仅供学习和研究使用
2. 模型数据来源于公开信息
3. 如需商业使用，请遵守华为海思相关许可证
