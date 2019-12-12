<template>
  <!--  eslint-disable-next-line -->
  <div class="ck-content" v-html="content"></div>
</template>

<script>
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
    // add classes for tables
    this.addClassesForElements('figure.table>table', [
      'table',
      'table-striped',
      'table-bordered',
      'table-hover'
    ])
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
.ck-content::v-deep pre {
  font-size: 0.85rem;
}
</style>
