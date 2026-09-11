# Text to XHS Images

![License](https://img.shields.io/github/license/wanglin25/text-to-xhs-images?style=flat-square)
![Skill](https://img.shields.io/badge/Skill-Agent%20Ready-111111?style=flat-square)
![XHS](https://img.shields.io/badge/小红书-Images-FF4D6D?style=flat-square)
![Node](https://img.shields.io/badge/Node.js-%3E%3D18-339933?style=flat-square)

[English](#english-readme) | 中文

一个适配各种 AI Agent 的小红书图文生成技能，从文本内容和图片生成高质量的小红书风格卡片。

> 利用 HTML/CSS 的强大排版能力，配合浏览器截图功能，实现比纯代码绘图更灵活、比设计软件更高效的图片生成方案。
>
> 本skill完成使用AI生成。

## 30 秒开始

直接把这段话发给你的 AI 助手（Claude Code / Cursor / Copilot / 其他支持 Skill 的工具）：

```text
帮我安装 text-to-xhs-images 这个 skill。请执行以下步骤：

1. 确保 ~/.claude/skills/ 目录存在（不存在就创建）
2. 执行 git clone https://github.com/wanglin25/text-to-xhs-images.git ~/.claude/skills/text-to-xhs-images
3. 进入目录执行 npm install
4. 验证安装：node scripts/render.mjs 应该显示用法说明
5. 告诉我装好了，之后我说"做小红书图片"就会触发这个 skill
```

安装完成后，直接对 AI 说：

```text
帮我做一张小红书图片
文字："生活不是等待风暴过去，而是学会在雨中跳舞"
风格：简约，蓝色系
```

## 这是什么？

这是一个 **AI Agent Skill**——一套结构化的指令和工具，让 AI 助手能够帮你生成小红书风格的图片卡片。

**工作原理：**
1. 你告诉 AI 想要什么内容（文字、图片、风格）
2. AI 生成 HTML 文件进行精美排版
3. 使用 Playwright 将 HTML 截图为高清 PNG
4. 输出可直接发布到小红书的图片

**核心优势：**
- 🎨 **5 种预设风格**：杂志风、简约风、活力风、复古风、科技感
- 📐 **标准尺寸**：1080×1440px（3:4 竖版，小红书推荐比例）
- 🖼️ **高清图质**：2x 分辨率输出（2160×2880px）
- 📝 **多页支持**：自动规划封面→内容页→总结页的完整结构
- 🖼️ **图片集成**：支持用户上传自己的照片

## 安装方法

### 方法一：让 AI 帮你安装（推荐）

复制下面的文字，直接发给你正在使用的 AI 助手：

**Claude Code 用户：**
```text
帮我安装 text-to-xhs-images skill。请执行：
1. git clone https://github.com/wanglin25/text-to-xhs-images.git ~/.claude/skills/text-to-xhs-images
2. cd ~/.claude/skills/text-to-xhs-images && npm install
3. 验证：node scripts/render.mjs
```

**Cursor / 其他本地 Agent 用户：**
```text
帮我安装 text-to-xhs-images skill。请执行：
1. git clone https://github.com/wanglin25/text-to-xhs-images.git .cursor/skills/text-to-xhs-images
   （或其他你的 skill 目录）
2. cd 到该目录并执行 npm install
3. 验证：node scripts/render.mjs
```

### 方法二：手动命令行安装

```bash
# Claude Code
git clone https://github.com/wanglin25/text-to-xhs-images.git ~/.claude/skills/text-to-xhs-images
cd ~/.claude/skills/text-to-xhs-images
npm install

# 验证安装
node scripts/render.mjs
```

### 前提条件

- **Node.js** >= 18（[下载安装](https://nodejs.org/)）
- **Git**（用于克隆仓库）
- **支持 Skill 的 AI 助手**（Claude Code / Cursor / 其他）

## 使用方法

安装完成后，直接用自然语言告诉 AI 你想要什么：

### 基础用法

```
帮我做一张小红书图片
文字："生活不是等待风暴过去，而是学会在雨中跳舞"
风格：简约，蓝色系
```

### 多页教程卡片

```
帮我做一个减脂教程的小红书图文
内容包括：饮食、运动、常见问题
风格：活力风，紫色系
```

AI 会自动规划 6 页结构：封面 → 核心原则 → 饮食方案 → 运动方案 → 常见问题 → 总结

### 带图片的卡片

先把你的照片放到项目的 `assets/` 目录，然后：

```
帮我做一个旅行分享的小红书图文
文字：成都三日游攻略
图片：用 assets/ 目录下的照片
风格：复古风
```

## 风格选择

| 风格 | 特点 | 适合场景 |
|------|------|----------|
| **杂志风** | 衬线字体、大留白、优雅排版 | 深度内容、故事、观点类 |
| **简约风** | 无衬线字体、干净利落 | 产品、教程、清单类 |
| **活力风** | 渐变背景、高饱和度 | 推荐、种草、生活分享 |
| **复古风** | 暖色调、怀旧质感 | 旅行、文化、回忆类 |
| **科技感** | 深色背景、霓虹色 | 科技、数据、教程类 |

你也可以自由组合，比如"杂志风 + 绿色配色"、"简约 + 黑白"等。

## 输出规格

- **尺寸**：1080 × 1440 px（3:4 竖版）
- **实际输出**：2160 × 2880 px（2x 分辨率，清晰不模糊）
- **格式**：PNG
- **位置**：`local-tests/<项目名>/page-XX.png`

## 生成的文件在哪里？

所有生成的文件都在 `local-tests/<项目名>/` 目录下：

```
local-tests/weight-loss-plan/
├── assets/          # 你提供的图片
├── page-01.html     # 封面页源文件
├── page-01.png      # ← 这就是最终图片
├── page-02.html     # 内容页源文件
├── page-02.png      # ← 这就是最终图片
└── ...
```

直接拿 `.png` 文件发布到小红书即可。`.html` 文件保留着，如果想微调内容可以修改后重新生成。

## 平台支持

| 平台 | 状态 | 说明 |
|------|------|------|
| Claude Code | ✅ 完全支持 | 原生 Skill 工作流 |
| Cursor | ✅ 支持 | 需要能读写文件 + 执行 shell |
| Copilot | ✅ 支持 | 需要能读写文件 + 执行 shell |
| 其他本地 Agent | ✅ 可用 | 需要支持文件系统和 shell 执行 |
| 普通 Chatbot | ❌ 不推荐 | 没有文件系统和渲染管线时无法稳定出图 |

## 手动渲染

如果需要手动重新渲染某一页：

```bash
# 渲染单页
node scripts/render.mjs local-tests/demo/page-01.html

# 批量渲染整个项目
for file in local-tests/demo/page-*.html; do
  node scripts/render.mjs "$file"
done
```

## 项目结构

```
text-to-xhs-images/
├── README.md                     # 本文件
├── SKILL.md                      # Skill 定义文件（AI 读取）
├── package.json                  # 依赖配置
├── scripts/
│   └── render.mjs               # HTML 转图片渲染脚本
├── references/
│   ├── style-guide.md           # 排版规范和风格模板
│   └── multi-page-planning.md   # 多页卡片规划指南
└── local-tests/                  # 生成的项目（不提交到 git）
    └── <项目名>/
        ├── assets/               # 用户提供的图片
        ├── page-01.html          # 页面源文件
        └── page-01.png           # 渲染后的图片
```

## 常见问题

### 字体没有显示？

渲染脚本会等待 500ms 让字体加载。如果网络较慢导致字体没加载出来，可以修改 `scripts/render.mjs` 中的等待时间：

```javascript
await page.waitForTimeout(1000); // 增加到 1000ms
```

### 内容太多，一页放不下？

- 让 AI 拆分成多页
- 精简文案，只保留要点
- 调整布局（双栏、网格等）

### 图片变形？

在 HTML 中使用 CSS `object-fit` 控制图片缩放方式：

```css
img {
  object-fit: cover;   /* 裁剪填充，不变形 */
  /* 或 */
  object-fit: contain; /* 完整显示，可能留白 */
}
```

### 文字看不清？

- 正文字体不小于 32px
- 确保对比度足够（深底浅字 或 浅底深字）
- 行高设置在 1.4 以上

### 怎么更新到最新版？

进入 skill 目录执行 `git pull`，然后重新运行 `npm install`：

```bash
cd ~/.claude/skills/text-to-xhs-images  # 或你的安装路径
git pull
npm install
```

## 技术细节

**为什么用 HTML → 截图？**

- **排版精确**：CSS Grid + 严格字号/留白/网格，远超 Markdown 排版能力
- **Agent 友好**：HTML + CSS 是文本，AI 能直接写、读、改、验证
- **质量可控**：基于真实浏览器渲染，不是猜
- **交付简单**：PNG 直接发，不需要部署、不需要导出工具

## 依赖

- **Node.js** >= 18
- **Playwright** ^1.48.0（安装时自动下载浏览器引擎）

## License

MIT

---

## English README

A skill for generating Xiaohongshu (RedNote) style image cards from text and images, compatible with various AI agents.

### Quick Start

Tell your AI assistant:

```text
Install text-to-xhs-images skill:
1. git clone https://github.com/wanglin25/text-to-xhs-images.git ~/.claude/skills/text-to-xhs-images
2. cd ~/.claude/skills/text-to-xhs-images && npm install
3. Verify: node scripts/render.mjs
```

Then say:

```text
Create a Xiaohongshu image card
Text: "Life isn't about waiting for the storm to pass, it's about learning to dance in the rain"
Style: Minimal, blue color scheme
```

### Features

- 5 preset styles (Magazine, Minimal, Vibrant, Vintage, Tech)
- Standard 1080×1440px output (3:4 ratio)
- 2x resolution (2160×2880px)
- Multi-page support
- Custom image integration

### Requirements

- Node.js >= 18
- Git
- AI agent with file system and shell access (Claude Code, Cursor, etc.)

### Installation

```bash
git clone https://github.com/wanglin25/text-to-xhs-images.git ~/.claude/skills/text-to-xhs-images
cd ~/.claude/skills/text-to-xhs-images
npm install
```

See [中文文档](#30-秒开始) for detailed installation instructions.
