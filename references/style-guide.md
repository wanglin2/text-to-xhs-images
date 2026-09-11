# 排版规范与风格参考

## 小红书图片尺寸

| 类型 | 尺寸 | 比例 | 说明 |
|------|------|------|------|
| 竖版（推荐） | 1080×1440 | 3:4 | 信息流占比最大，推荐 |
| 正方形 | 1080×1080 | 1:1 | 通用，适合单图 |
| 横版 | 1080×810 | 4:3 | 适合风景/全景 |

**默认使用 3:4 竖版**，除非用户指定其他比例。

## 排版基本原则

### 1. 安全边距
- 上下左右至少留 **60px** 边距
- 内容不要贴边，保持呼吸感

### 2. 字体层级
```
大标题: 72-96px, font-weight: 700-900
副标题: 48-60px, font-weight: 600
正文: 32-40px, font-weight: 400
注释/标签: 24-28px, font-weight: 400
```

### 3. 行高与间距
- 正文行高: `line-height: 1.6-1.8`
- 段落间距: `margin-bottom: 24-32px`
- 标题与正文间距: `margin-bottom: 16-24px`

### 4. 图片处理
- 图片不要拉伸变形，使用 `object-fit: cover`
- 图片圆角: `border-radius: 16-24px`
- 图片与文字间距: `margin: 24-32px`

## 风格定义

### 杂志风格 (Magazine)

**特点:**
- 衬线字体（宋体/明体）用于标题
- 大留白，优雅排版
- 黑白灰为主，点缀色不超过 20%
- 适合：深度内容、故事、观点类

**CSS 示例:**
```css
body {
  font-family: 'Noto Serif SC', 'Source Han Serif SC', serif;
  background: #fafaf8;
  color: #1a1a1a;
}

h1 {
  font-size: 88px;
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.1;
}
```

### 简约风格 (Minimal)

**特点:**
- 无衬线字体（黑体）
- 大量留白
- 单色或双色调
- 适合：产品、教程、清单类

**CSS 示例:**
```css
body {
  font-family: 'Noto Sans SC', 'Source Han Sans SC', sans-serif;
  background: #ffffff;
  color: #000000;
}

h1 {
  font-size: 72px;
  font-weight: 700;
  letter-spacing: -0.01em;
}
```

### 活力风格 (Vibrant)

**特点:**
- 高饱和度配色
- 圆角元素
- 活泼的排版
- 适合：推荐、种草、生活分享

**CSS 示例:**
```css
body {
  font-family: 'Noto Sans SC', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
}

h1 {
  font-size: 80px;
  font-weight: 800;
}

.card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  padding: 48px;
}
```

### 复古风格 (Vintage)

**特点:**
- 暖色调（米黄、棕色）
- 衬线字体
- 纹理背景
- 适合：旅行、文化、回忆类

**CSS 示例:**
```css
body {
  font-family: 'Noto Serif SC', serif;
  background: #f5f0e8;
  color: #3d2817;
  background-image: url('data:image/svg+xml,...'); /* 纸张纹理 */
}

h1 {
  font-size: 84px;
  font-weight: 700;
  color: #8b4513;
}
```

### 科技感风格 (Tech)

**特点:**
- 深色背景
- 霓虹色点缀
- 等宽字体用于数据
- 适合：科技、数据、教程类

**CSS 示例:**
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

.code {
  background: #1a1a1a;
  border-left: 3px solid #00ff88;
  padding: 24px;
  font-family: 'JetBrains Mono', monospace;
}
```

## 配色方案

### 单色方案
- 黑白灰: `#000000` / `#666666` / `#cccccc` / `#ffffff`
- 蓝色系: `#003366` / `#0066cc` / `#66b3ff` / `#e6f2ff`
- 绿色系: `#004d00` / `#009900` / `#66cc66` / `#e6ffe6`

### 双色调方案
- 蓝橙: `#0066cc` + `#ff6600`
- 紫黄: `#6600cc` + `#ffcc00`
- 绿粉: `#00cc66` + `#ff66cc`

### 渐变方案
```css
/* 日落 */
background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);

/* 海洋 */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* 森林 */
background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);

/* 暖调 */
background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
```

## 布局模板

### 封面模板
```html
<div class="cover">
  <div class="cover-content">
    <h1>标题文字</h1>
    <p class="subtitle">副标题或描述</p>
  </div>
  <div class="cover-image">
    <img src="assets/cover.jpg" alt="">
  </div>
</div>
```

### 图文混排模板
```html
<div class="content-page">
  <h2>章节标题</h2>
  <div class="text-block">
    <p>正文内容...</p>
  </div>
  <div class="image-block">
    <img src="assets/image.jpg" alt="">
  </div>
</div>
```

### 清单模板
```html
<div class="checklist">
  <h2>清单标题</h2>
  <ul>
    <li><span class="check">✓</span> 第一项内容</li>
    <li><span class="check">✓</span> 第二项内容</li>
    <li><span class="check">✓</span> 第三项内容</li>
  </ul>
</div>
```

### 引用模板
```html
<div class="quote-block">
  <blockquote>
    <p>引用文字内容</p>
    <cite>— 出处</cite>
  </blockquote>
</div>
```

## 字体推荐

### 中文字体
- **Noto Serif SC** (思源宋体) - 优雅、正式
- **Noto Sans SC** (思源黑体) - 现代、清晰
- **Source Han Serif** (思源宋体) - 同上
- **Source Han Sans** (思源黑体) - 同上

### 英文字体
- **Playfair Display** - 衬线、优雅
- **Inter** - 无衬线、现代
- **JetBrains Mono** - 等宽、代码
- **Montserrat** - 无衬线、几何

### 字体加载
```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700;900&family=Noto+Sans+SC:wght@400;700&display=swap" rel="stylesheet">
```

## 常见排版问题

### ❌ 避免
- 文字贴边（至少 60px 边距）
- 行高太小（< 1.4 会拥挤）
- 字体太小（正文 < 32px 难读）
- 颜色太多（> 3 种主色会乱）
- 图片拉伸变形

### ✅ 推荐
- 大量留白，呼吸感
- 清晰的层级对比
- 统一的配色方案
- 图片保持原始比例
- 对齐方式一致（左对齐或居中）
