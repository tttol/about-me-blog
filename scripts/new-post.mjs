import fs from 'fs';

const title = process.argv[2] || 'New Post';
const slug = title.toLowerCase().replace(/\s+/g, '-');
const now = new Date();
const pubDate = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

const content = `---
title: '${title}'
description: ''
pubDate: '${pubDate}'
---

`;

fs.writeFileSync(`src/content/blog/${slug}.md`, content);
console.log(`Created: src/content/blog/${slug}.md`);
