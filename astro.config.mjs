import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  compressHTML: true,
  build: {
    format: 'directory',
  },
  vite: {
    server: {
      allowedHosts: ['ubuntu-16gb-nbg1-1.tail102593.ts.net'],
    },
  },
});
