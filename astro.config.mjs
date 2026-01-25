// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkBreaks from 'remark-breaks';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://blog.about-tttol.link',
	integrations: [mdx(), sitemap()],
	markdown: {
		remarkPlugins: [remarkBreaks],
	},
});
