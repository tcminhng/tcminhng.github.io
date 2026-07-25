import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://tcminhng.github.io',
  integrations: [tailwind()],
});