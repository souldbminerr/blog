import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/blog/',
  markdown: {
    config(md) {
      md.disable('emoji')
    },
  },
  title: 'Soul\'s Blog',
  description: 'Soul\'s blog...',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Posts', link: '/posts/' },
    ],
    socialLinks: [],
    footer: {
      message: '',
    },
  },
  cleanUrls: true,
})
