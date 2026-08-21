import DefaultTheme from 'vitepress/theme'
import ImageCompare from './ImageCompare.vue'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('ImageCompare', ImageCompare)
  }
}
