# Hisilicon Developer Portal Mirror

华为海思开发者门户 GitHub Pages 镜像项目

## 功能

本项目是华为海思开发者门户的静态镜像，主要实现了以下功能：

- **首页** - 开发者门户欢迎页面
- **ModelZoo** - AI模型库，包含54个模型条目与本地化下载映射

## 页面

- `index.html` - 开发者门户首页
- `modelzoo.html` - ModelZoo模型市场页面
- `model-detail.html` - 模型详情与下载清单页面

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

# 根据最新抓取结果重建静态站点数据
node build-static-site.js

# 访问 http://localhost:8000
```

### 与上游同步

```bash
# 增量同步：抓取列表 + 详情载荷 → 对比本地 → 只重抓有变化的模型 → 暂存文件 → 构建 → 上传 HF → 刷新 HF 清单 → 重建 → 提交 → 推送
node daily-sync.js

# 只看会重抓哪些模型，不构建/不上传/不提交
node daily-sync.js --skip-build --skip-hf --skip-commit
```

- 变化检测同时比较列表指纹（id/name/日期）和 `findByIdAll` 详情载荷（工具链链接、OM 文件、快速开始等）。上游经常只改详情、不动 `lastUpdateDate`，只看列表会漏掉。
- 登录：`scrape.js` 先复用 `cookies.json`；出现 Uniportal 登录页时会在终端提示输入账号密码（需要真实 TTY），或用 `--headed` 在浏览器里手动登录。非交互 shell 且未导出 `HISILICON_USERNAME/HISILICON_PASSWORD` 时会直接失败。
- 手动补一批模型：`node scrape.js --headed --only-ids <id1,id2> --details-output sync-logs/x_changed_details.json`，再 `node stage-scraped-downloads.js --details sync-logs/x_changed_details.json`，合并进 `api_all_details.json` 后按上面的顺序构建/上传/刷新/重建。
- `refresh-hf-files.js` / `audit-links.js` 在有 `HTTPS_PROXY` 的机器上会自动带 `NODE_USE_ENV_PROXY=1` 重启自身（Node 的 `fetch` 默认不走代理）。

### 链接精确性保障

站点上的每个下载链接都必须指向字节数与上游一致的镜像文件，链路上有三道门：

1. `canonicalize-rows.js` + `verify-downloads.py`（抓取后、暂存前）：同一模型内两个引擎共用一个文件名时（如 `resnet50.om` 的 SVP_NNN 与 NNN 版本），按 API 顺序第一个变体保留原名，其余改为 `<名>_<规格>_<引擎>.om`；每个文件按上游声明的字节数（或门户实际下发的字节数）校验，不符则不暂存。
2. `build-static-site.js`：只有当镜像文件（HF 清单 `hf-repo-files.json` 带 size，本地快照优先）的字节数与上游一致时才生成链接，否则该行不带链接并在构建末尾列出；不再展示无法核实的“镜像补充”文件。
3. `audit-links.js`（上传后、提交前）：逐行对照 HF 上的真实文件大小，任何 WRONG/MISSING 都会让 `daily-sync.js` 在提交前中止。上游元数据与实际下发文件不一致时（如 MobileNetV2 的 OM 相差 12 字节），以实际下发文件为准，并在构建/审计日志中以 NOTE 标出。

已知的上游特例：量化名为 `f16` 的 NNN 变体，其下载页只有用 `platform=FP16` 才会列出文件（`scrape.js` 已处理）；CodeFormer 的 OM 是 3 字节占位文件，按“无可下载文件”处理。

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
