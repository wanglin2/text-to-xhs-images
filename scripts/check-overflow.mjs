#!/usr/bin/env node
/**
 * 排版自检脚本：检查每个 HTML 页面的实际渲染尺寸与溢出情况
 *
 * 用法:
 *   node scripts/check-overflow.mjs <项目目录>
 *
 * 输出：每页的 doc 尺寸（应为 1080x1440）与各区块的位置/高度，
 *      用于发现「内容超出画布」和「图片被 flex 压缩裁切」两类问题。
 */

import { chromium } from 'playwright';
import { readdirSync } from 'fs';
import { resolve } from 'path';

const dir = resolve(process.argv[2] || '.');
const files = readdirSync(dir).filter((f) => f.endsWith('.html')).sort();

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1440 } });

for (const f of files) {
  await page.goto('file://' + dir + '/' + f, { waitUntil: 'load' });
  await page.waitForTimeout(200);
  const r = await page.evaluate(() => {
    const root = document.querySelector('.page') || document.body;
    const kids = [...root.children].map((c) => ({
      c: (c.className || c.tagName).toString().slice(0, 14),
      top: c.offsetTop,
      h: c.offsetHeight,
    }));
    return {
      doc: [document.documentElement.scrollWidth, document.documentElement.scrollHeight],
      kids,
    };
  });
  const bad = r.doc[0] !== 1080 || r.doc[1] !== 1440;
  console.log(f + '  doc=' + JSON.stringify(r.doc) + '  ' + (bad ? 'OVERFLOW' : 'OK'));
  console.log('    ' + r.kids.map((k) => k.c + '[' + k.top + '+' + k.h + ']').join(' '));
}

await browser.close();
