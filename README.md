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

## 主题

站点支持多主题，默认 **官方主题**（风格贴近海思 ModelZoo 门户：白色卡片、浅灰页面、单一红色强调色），可在页头切换到 **小黄鸭主题**。选择保存在浏览器 `localStorage`（键 `modelzoo.theme`），三个页面共享。

实现方式：

- `assets/css/style.css` 是共享基础层（即小黄鸭视觉，含全部响应式 / 折叠屏 / 安全区规则），**不做主题作用域**。
- 每个非默认外观是一层覆盖样式，作用域为 `html[data-theme="<id>"]`，例如 `assets/css/theme-official.css`。官方主题主要通过重定义基础层的自定义属性（`--ink`、`--paper`、`--cream`、`--comic-shadow`、`--display-font`、`--compact-header-height`、`--compact-ticker-height` 等）实现，剩余硬编码的视觉（粗边框、偏移阴影、旋转、点阵背景）按选择器覆盖。
- `assets/js/theme.js` 维护主题注册表 `THEMES`（id、文案键、图标、`theme-color`、favicon），负责持久化、生成页头切换控件（桌面为分段按钮，窄屏为单键循环）、更新 `<meta name="theme-color">` 与 `<link rel="icon">`，并在切换完成后触发 `site-theme-change` 事件（`detail.theme` / `detail.previous`）。切换时优先使用 View Transitions 交叉淡入；不支持的浏览器退回到 380ms 的属性过渡；`prefers-reduced-motion` 下直接切换。
- 与主题绑定的文案（品牌名、页头日期标签、首页横幅、卡片编号、详情页面包屑等）放在 `assets/js/i18n.js` 的 `THEME_COPY`，`t()` 会先查主题覆盖，再查语言字典。
- 默认主题写死在 `<html data-theme="official">`，三个 HTML 的静态文案、`<title>`、描述与 favicon 也都是官方主题版本；`<head>` 里的内联脚本只在 `localStorage` 存有不同选择时才改写，因此无 JS 也能正确显示、首屏不会闪烁。

### 新增一个主题

1. 在 `assets/js/theme.js` 的 `THEMES` 中追加一项：`{ id, labelKey, fallback, icon, themeColor, favicon }`。
2. 新建 `assets/css/theme-<id>.css`，所有规则以 `html[data-theme="<id>"] body` 开头（比基础层的 `body[data-title-key] .x` 高一级特异性），并在三个 HTML 的 `style.css` 之后引入。先重定义 `:root` 变量，再按需覆盖选择器；响应式行为沿用基础层，只需在需要时改 `--compact-header-height` / `--compact-ticker-height`。
3. 在 `assets/js/i18n.js` 增加 `theme.<id>` 的中英文标签；如需主题专属文案，在 `THEME_COPY.<id>` 下按语言给出键值。
4. 用桌面与 375px 宽度分别检查三个页面（`index.html`、`modelzoo.html`、`model-detail.html`）。

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

代码仓库 / 快速开始链接原样来自上游，但 gitee 对“用 `/tree/` 指向文件”或“用 `/blob/` 指向目录”一律返回 404（GitHub、GitCode 会自动纠正），上游有 7 条这样的链接。`build-static-site.js` 的 `normalizeGiteeUrl` 只按目标末段是否带扩展名改写 tree/blob（模式本来就对的链接原样保留），仓库、分支、路径不变；非 gitee 链接不做处理。

上游详情页的“模型工具”（侧栏锚点叫“工具链下载”）按平台（Hi3403V100 SVP_NNN / NNN、Hi3516CV610 …）列出 CANN工具 / 编译工具链 / SDK 及其说明文字——说明里往往就是要向 FAE 索取的 SDK/CANN 版本号，而且约一半条目没有链接。这些数据来自 `apiDetail.modelAdaptor[].toolkit[]`，构建时原样写入每个模型的 `toolchains`（平台、规格、系统、条目顺序都按 API 顺序，名称和说明逐字保留，不去重），详情页在“下载清单”之后以“模型工具”分组展示；有链接的条目按下载表同样的规则改写（SDK 包指向镜像、gitee tree/blob 纠正），无链接的只显示说明。下载清单里不再重复出现“工具链”行，`可用文件`计数因此只统计模型文件。

上游会把模型换一个 ID 重新上架（2026-09-16 的 YOLO26s、YOLO11s-pose），旧 ID 随即失效；`daily-sync.js` 发现“同名、旧 ID 下架、新 ID 上架”时把 `旧 ID → 新 ID` 记进 `id-aliases.json`，构建时随 `models.js` 一起输出 `modelIdAliases`（多级别名折叠到当前 ID），详情页据此把旧链接解析到现在的模型。

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
