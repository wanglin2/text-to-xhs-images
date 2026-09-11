#!/usr/bin/env node
/**
 * HTML 转图片渲染脚本
 * 使用 Playwright 将 HTML 文件截图为 PNG
 *
 * 用法:
 *   node scripts/render.mjs <html文件路径> [输出目录]
 *
 * 示例:
 *   node scripts/render.mjs local-tests/demo/page-01.html
 *   node scripts/render.mjs local-tests/demo/page-01.html output/
 */

import { chromium } from 'playwright';
import { readFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname, basename, extname } from 'path';

async function render(htmlPath, outputDir = null) {
  const absolutePath = resolve(htmlPath);

  if (!existsSync(absolutePath)) {
    console.error(`❌ 文件不存在: ${absolutePath}`);
    process.exit(1);
  }

  // 确定输出目录
  if (!outputDir) {
    outputDir = dirname(absolutePath);
  } else {
    outputDir = resolve(outputDir);
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }
  }

  // 生成输出文件名
  const baseName = basename(htmlPath, extname(htmlPath));
  const outputPath = resolve(outputDir, `${baseName}.png`);

  console.log(`🎨 正在渲染: ${htmlPath}`);
  console.log(`📁 输出路径: ${outputPath}`);

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1080, height: 1440 }, // 3:4 小红书比例
    deviceScaleFactor: 2, // 2x 分辨率，更清晰
  });
  const page = await context.newPage();

  // 加载 HTML 文件
  await page.goto(`file://${absolutePath}`, {
    waitUntil: 'networkidle',
  });

  // 等待字体加载完成
  await page.waitForTimeout(500);

  // 获取页面实际尺寸
  const dimensions = await page.evaluate(() => {
    const body = document.body;
    const html = document.documentElement;
    return {
      width: Math.max(
        body.scrollWidth,
        body.offsetWidth,
        html.clientWidth,
        html.scrollWidth,
        html.offsetWidth
      ),
      height: Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      ),
    };
  });

  // 截图
  await page.screenshot({
    path: outputPath,
    fullPage: true,
    type: 'png',
  });

  await browser.close();

  console.log(`✅ 渲染完成: ${outputPath}`);
  console.log(`📐 尺寸: ${dimensions.width}x${dimensions.height}px`);

  return outputPath;
}

// CLI 入口
const args = process.argv.slice(2);
if (args.length < 1) {
  console.log(`
用法: node scripts/render.mjs <html文件路径> [输出目录]

示例:
  node scripts/render.mjs local-tests/demo/page-01.html
  node scripts/render.mjs local-tests/demo/page-01.html output/
  `);
  process.exit(1);
}

const htmlPath = args[0];
const outputDir = args[1] || null;

render(htmlPath, outputDir).catch((err) => {
  console.error('❌ 渲染失败:', err);
  process.exit(1);
});
