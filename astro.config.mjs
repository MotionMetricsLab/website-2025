// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// When deploying to GitHub Pages for the repo `motionmetricslab/website-2025`,
	// the `site` should include the repo path so generated absolute URLs point
	// to the correct location.
	site: 'https://motionmetricslab.github.io/website-2025',
	base: process.env.NODE_ENV === 'production' ? '/website-2025/' : '/',
	integrations: [mdx(), sitemap()],
});
