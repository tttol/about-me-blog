// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkBreaks from 'remark-breaks';
import { defineConfig } from 'astro/config';
import { remarkMermaid } from './src/plugins/remark-mermaid.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://blog.about-tttol.link',
	integrations: [mdx(), sitemap()],
	markdown: {
		remarkPlugins: [remarkBreaks, remarkMermaid],
	},
});
