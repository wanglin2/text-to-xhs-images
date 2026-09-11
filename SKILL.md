# 文本+图片生成小红书图片 Skill

将用户提供的文本内容和图片，按照指定的风格要求，生成适合小红书发布的图片卡片。

## 工作原理

1. **分析输入**：理解用户提供的文本内容、图片、风格要求
2. **规划页面**：根据内容量决定单页或多页卡片
3. **生成 HTML**：为每页创建一个 HTML 文件，使用 CSS 排版
4. **渲染图片**：使用 Playwright 将 HTML 截图为 PNG
5. **输出结果**：返回生成的图片文件路径

## 使用流程

### 1. 收集信息

向用户确认以下信息（如未提供）：

**必需信息：**
- 文本内容（标题、正文、要点等）
- 风格要求（杂志风、简约风、活力风、复古风、科技感等）
- 配色偏好（可选，如"紫色系"、"暖色调"）

**可选信息：**
- 用户提供的图片（放入 `assets/` 目录）
- 目标平台尺寸（默认 1080×1440，3:4 竖版）
- 是否需要多页卡片（内容较多时自动判断）

### 2. 规划页面结构

根据内容量决定页面数量：

**单页卡片**（内容简短）：
- 适合：一句话金句、单个观点、简单清单

**多页卡片**（5-9 页，内容较丰富）：
- Page 1: 封面（标题 + 副标题）
- Page 2-N: 内容页（每页一个要点）
- Page N+1: 总结/CTA

参考 `references/multi-page-planning.md` 获取详细的页面规划策略。

### 3. 创建项目目录

在 `local-tests/` 下创建项目目录：

```bash
local-tests/<project-name>/
├── assets/          # 用户提供的图片
├── page-01.html     # 封面
├── page-02.html     # 内容页1
├── page-03.html     # 内容页2
└── ...
```

**命名规则：**
- 项目名使用英文小写 + 连字符：`weight-loss-plan`、`travel-chengdu`
- 页面文件按顺序编号：`page-01.html`、`page-02.html`

### 4. 生成 HTML 文件

为每页创建一个独立的 HTML 文件。

**HTML 结构要求：**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=1080">
  <title>页面标题</title>
  
  <!-- 加载字体 -->
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700;900&family=Noto+Sans+SC:wght@400;700&display=swap" rel="stylesheet">
  
  <style>
    /* 设置画布尺寸 */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      width: 1080px;
      height: 1440px; /* 3:4 比例 */
      overflow: hidden;
      font-family: 'Noto Sans SC', sans-serif;
      /* 其他样式... */
    }
    
    /* 排版样式... */
  </style>
</head>
<body>
  <!-- 内容... -->
</body>
</html>
```

**关键 CSS 规则：**

1. **固定画布尺寸**
   ```css
   body {
     width: 1080px;
     height: 1440px;
     overflow: hidden; /* 防止内容溢出 */
   }
   ```

2. **安全边距**
   ```css
   .container {
     padding: 80px 60px; /* 上下80px，左右60px */
   }
   ```

3. **字体层级**
   ```css
   h1 { font-size: 88px; font-weight: 900; }
   h2 { font-size: 64px; font-weight: 700; }
   p { font-size: 36px; line-height: 1.6; }
   .caption { font-size: 28px; color: #666; }
   ```

4. **图片处理**
   ```css
   img {
     max-width: 100%;
     height: auto;
     object-fit: cover;
     border-radius: 16px;
   }
   ```

参考 `references/style-guide.md` 获取完整的排版规范和风格模板。

### 5. 渲染图片

使用 `scripts/render.mjs` 将 HTML 转换为 PNG：

```bash
# 渲染单页
node scripts/render.mjs local-tests/<project-name>/page-01.html

# 渲染多页（批量）
for file in local-tests/<project-name>/page-*.html; do
  node scripts/render.mjs "$file"
done
```

**渲染参数：**
- 视口：1080×1440（3:4）
- 设备像素比：2（2x 分辨率，更清晰）
- 输出格式：PNG
- 输出位置：与 HTML 同目录

### 6. 输出结果

向用户展示：
1. 生成的图片文件路径（绝对路径）
2. 每页内容的简要说明
3. 如何修改（如需调整）

**示例输出：**
```
✅ 已生成 6 张小红书图片：

1. /path/to/local-tests/weight-loss-plan/page-01.png - 封面
2. /path/to/local-tests/weight-loss-plan/page-02.png - 核心原则
3. /path/to/local-tests/weight-loss-plan/page-03.png - 饮食方案
4. /path/to/local-tests/weight-loss-plan/page-04.png - 运动方案
5. /path/to/local-tests/weight-loss-plan/page-05.png - 常见问题
6. /path/to/local-tests/weight-loss-plan/page-06.png - 总结

如需调整，可以：
- 修改对应的 HTML 文件
- 重新运行渲染命令
- 或直接告诉我需要修改的内容
```

## 风格实现指南

### 杂志风格 (Magazine)

**特点：** 衬线字体、大留白、优雅排版

**CSS 要点：**
```css
body {
  font-family: 'Noto Serif SC', serif;
  background: #fafaf8;
  color: #1a1a1a;
}

h1 {
  font-size: 88px;
  font-weight: 900;
  letter-spacing: -0.02em;
}
```

**适用场景：** 深度内容、故事、观点类

### 简约风格 (Minimal)

**特点：** 无衬线字体、大量留白、单色调

**CSS 要点：**
```css
body {
  font-family: 'Noto Sans SC', sans-serif;
  background: #ffffff;
  color: #000000;
}

h1 {
  font-size: 72px;
  font-weight: 700;
}
```

**适用场景：** 产品、教程、清单类

### 活力风格 (Vibrant)

**特点：** 高饱和度、渐变背景、圆角元素

**CSS 要点：**
```css
body {
  font-family: 'Noto Sans SC', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
}

.card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  padding: 48px;
}
```

**适用场景：** 推荐、种草、生活分享

### 复古风格 (Vintage)

**特点：** 暖色调、衬线字体、纹理背景

**CSS 要点：**
```css
body {
  font-family: 'Noto Serif SC', serif;
  background: #f5f0e8;
  color: #3d2817;
}

h1 {
  font-size: 84px;
  font-weight: 700;
  color: #8b4513;
}
```

**适用场景：** 旅行、文化、回忆类

### 科技感风格 (Tech)

**特点：** 深色背景、霓虹色、等宽字体

**CSS 要点：**
```css
body {
  font-family: 'Noto Sans SC', sans-serif;
  background: #0a0a0a;
  color: #e0e0e0;
}

h1 {
  font-size: 76px;
  font-weight: 700;
  color: #00ff88;
  font-family: 'JetBrains Mono', monospace;
}
```

**适用场景：** 科技、数据、教程类

参考 `references/style-guide.md` 获取更详细的风格定义和配色方案。

## 图片处理

### 用户提供的图片

如果用户提供了图片：
1. 将图片放入 `local-tests/<project-name>/assets/` 目录
2. 在 HTML 中引用：`<img src="assets/image.jpg" alt="">`
3. 使用 CSS 控制尺寸和位置

### 图片排版原则

1. **不要拉伸变形**
   ```css
   img {
     object-fit: cover; /* 或 contain */
   }
   ```

2. **保持合理尺寸**
   - 全宽图片：`width: 100%`
   - 半宽图片：`width: 50%`
   - 缩略图：`width: 200-300px`

3. **圆角和阴影**
   ```css
   img {
     border-radius: 16px;
     box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
   }
   ```

### 无图片时的处理

如果用户没有提供图片：
- 使用纯色背景
- 使用渐变背景
- 使用 CSS 图案（网格、点阵等）
- 使用 SVG 图标或装饰元素

## 常见问题处理

### 1. 内容太多，一页放不下

**解决方案：**
- 拆分成多页（参考 `references/multi-page-planning.md`）
- 压缩文案，提取要点
- 使用更小的字体（不小于 28px）
- 调整布局（双栏、网格等）

### 2. 文字看不清

**检查：**
- 字体大小是否 ≥ 32px（正文）
- 对比度是否足够（深色文字 + 浅色背景，或反之）
- 行高是否 ≥ 1.4

### 3. 图片变形

**解决：**
```css
img {
  object-fit: cover; /* 裁剪填充 */
  /* 或 */
  object-fit: contain; /* 完整显示 */
}
```

### 4. 渲染后字体没有加载

**解决：**
- 确保使用了 Google Fonts CDN
- 渲染脚本已等待 500ms 让字体加载
- 可以增加到 1000ms：修改 `scripts/render.mjs`

### 5. 内容超出画布

**解决：**
- 检查 `body { overflow: hidden; }`
- 减少内容或拆分页面
- 调整字体大小和间距
- 使用更紧凑的布局

## 依赖安装

首次使用前，安装依赖：

```bash
cd /path/to/text-to-shx-images
npm install
```

这会安装 Playwright 和浏览器引擎。

## 文件结构

```
text-to-shx-images/
├── SKILL.md                    # 本文件 - 使用说明
├── package.json                # Node.js 依赖配置
├── scripts/
│   └── render.mjs             # HTML 转图片脚本
├── references/
│   ├── style-guide.md         # 排版规范和风格参考
│   └── multi-page-planning.md # 多页卡片规划指南
├── assets/                    # 公共资源（可选）
└── local-tests/               # 生成的项目（gitignore）
    └── <project-name>/
        ├── assets/            # 用户图片
        ├── page-01.html
        ├── page-01.png
        └── ...
```

## 快速示例

### 示例 1：单页金句卡片

**用户输入：**
```
帮我做一张小红书图片
文字："生活不是等待风暴过去，而是学会在雨中跳舞"
风格：简约，蓝色系
```

**执行步骤：**
1. 创建 `local-tests/quote-rain/page-01.html`
2. 使用简约风格，蓝色渐变背景
3. 居中排版，大字体显示金句
4. 渲染：`node scripts/render.mjs local-tests/quote-rain/page-01.html`
5. 输出：`local-tests/quote-rain/page-01.png`

### 示例 2：多页教程卡片

**用户输入：**
```
帮我做一个减脂教程的小红书图文
内容包括：饮食、运动、常见问题
风格：活力风，紫色系
```

**执行步骤：**
1. 规划 6 页：封面 + 核心原则 + 饮食 + 运动 + Q&A + 总结
2. 创建 `local-tests/weight-loss-plan/` 目录
3. 生成 `page-01.html` 到 `page-06.html`
4. 使用活力风格，紫色渐变背景
5. 批量渲染所有页面
6. 输出 6 张 PNG 图片

## 注意事项

1. **画布尺寸固定**：默认 1080×1440（3:4），不要随意修改
2. **字体大小**：正文不小于 32px，标题 64-88px
3. **安全边距**：上下左右至少 60px
4. **图片比例**：使用 `object-fit` 避免变形
5. **内容层级**：每页只讲一个要点，避免信息过载
6. **风格一致**：同一套卡片保持配色和字体一致

## 扩展功能

### 批量渲染脚本

可以创建一个批量渲染脚本：

```javascript
// scripts/render-all.mjs
import { readdir } from 'fs/promises';
import { render } from './render.mjs';

const dir = process.argv[2];
const files = await readdir(dir);
const htmlFiles = files.filter(f => f.endsWith('.html')).sort();

for (const file of htmlFiles) {
  await render(`${dir}/${file}`);
}
```

### 自定义尺寸

修改 `scripts/render.mjs` 中的视口尺寸：

```javascript
const context = await browser.newContext({
  viewport: { width: 1080, height: 1080 }, // 1:1 正方形
  deviceScaleFactor: 2,
});
```

### 添加水印

在 HTML 中添加固定位置的水印：

```html
<div class="watermark">@我的账号</div>

<style>
.watermark {
  position: absolute;
  bottom: 40px;
  right: 60px;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.3);
}
</style>
```

## 总结

这个 skill 的核心流程：

1. **理解需求** → 收集文本、图片、风格
2. **规划页面** → 单页或多页结构
3. **生成 HTML** → 使用 CSS 排版
4. **渲染图片** → Playwright 截图
5. **输出结果** → 返回 PNG 文件路径

关键文件：
- `scripts/render.mjs` - HTML 转图片
- `references/style-guide.md` - 排版规范
- `references/multi-page-planning.md` - 多页规划

开始使用时，先安装依赖：`npm install`
