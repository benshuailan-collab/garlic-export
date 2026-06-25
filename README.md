# HUAKO Garlic — Export Landing Page

中国优质大蒜出口展示落地页。

## 在线访问

🟢 **Live Site:** [https://1b9cec2a4d4b4717a49a44a69b8c71ee.app.codebuddy.work](https://1b9cec2a4d4b4717a49a44a69b8c71ee.app.codebuddy.work)

## 网站结构

```
garlic-export/
├── index.html          # 主页面
├── styles.css          # 样式表
├── script.js           # 交互脚本
├── images/             # 图片资源
│   ├── *.png           # 大蒜展示图 & 种植基地图
├── .github/workflows/  # GitHub Pages 自动部署
│   └── deploy.yml
└── README.md
```

## 页面模块

- **Hero** — 品牌头图 + 核心数据 + CTA
- **关于我们** — 山东产地直供介绍
- **产品展示** — 纯白蒜 / 杂交蒜 / 脱水蒜片
- **核心优势** — 品质、价格、物流、资质、定制、服务
- **全球市场** — 覆盖 30+ 国家
- **资质认证** — ISO22000 / HACCP / GAP / Halal / BRC
- **合作流程** — 询价 → 方案 → 生产 → 发货
- **联系方式** — 询价表单 + 联系信息

## 部署到 GitHub Pages

```bash
# 1. 安装 GitHub CLI
winget install GitHub.cli

# 2. 登录
gh auth login

# 3. 部署
bash scripts/deploy_github_pages.sh garlic-export benshuailan-collab
```
