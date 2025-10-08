// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// Custom domain configuration for motionmetrics.de
	// When using a custom domain with GitHub Pages, the site serves from root (no base path needed)
	site: 'https://motionmetrics.de',
	// No base path needed for custom domains - they serve from root
	integrations: [mdx(), sitemap()],
});
