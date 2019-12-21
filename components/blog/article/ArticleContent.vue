<template>
  <div class="editor-content">
    <!--  eslint-disable-next-line -->
    <div class="ck-content" v-html="content"></div>
  </div>
</template>

<script>
import '@ckeditor/ckeditor5-editor-classic/theme/classiceditor.css'
import Prism from 'prismjs'
import 'prism-themes/themes/prism-darcula.css'

export default {
  name: 'ArticleContent',
  props: {
    content: {
      type: String,
      default: null
    }
  },
  mounted() {
    // add classes for Prism : line-numbers match-braces rainbow-braces
    this.addClassesForElements('code[class*="language-"]', [
      'line-numbers',
      'match-braces',
      'rainbow-braces'
    ])
    Prism.highlightAll()
  },
  methods: {
    addClassesForElements(selecor, classes) {
      const codeEles = document.querySelectorAll(selecor)
      for (const codeEle of codeEles) {
        codeEle.classList.add(...classes)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/style/common/editor-content.scss';
</style>
