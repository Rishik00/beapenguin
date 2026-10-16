import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://notapenguin.vercel.app',
  compressHTML: true,
  // Keep the page free of Astro's dev overlay while previewing.
  devToolbar: { enabled: false },
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    },
  },
});
