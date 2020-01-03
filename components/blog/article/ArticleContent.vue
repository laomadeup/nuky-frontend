<template>
  <div class="editor-content">
    <!--  eslint-disable-next-line -->
    <div class="ck-content" v-html="content"></div>
  </div>
</template>

<script>
import Prism from 'prismjs'
import 'prism-themes/themes/prism-darcula.css'
// import '@ckeditor/ckeditor5-basic-styles/theme/code.css'
import '@ckeditor/ckeditor5-block-quote/theme/blockquote.css'
// import '@ckeditor/ckeditor5-code-block/theme/codeblock.css'
import '@ckeditor/ckeditor5-editor-classic/theme/classiceditor.css'
import '@ckeditor/ckeditor5-engine/theme/placeholder.css'
import '@ckeditor/ckeditor5-font/theme/fontcolor.css'
import '@ckeditor/ckeditor5-font/theme/fontsize.css'
import '@ckeditor/ckeditor5-heading/theme/heading.css'
import '@ckeditor/ckeditor5-highlight/theme/highlight.css'
import '@ckeditor/ckeditor5-image/theme/image.css'
import '@ckeditor/ckeditor5-image/theme/imagecaption.css'
import '@ckeditor/ckeditor5-image/theme/imageresize.css'
import '@ckeditor/ckeditor5-image/theme/imagestyle.css'
import '@ckeditor/ckeditor5-image/theme/imageuploadicon.css'
import '@ckeditor/ckeditor5-image/theme/imageuploadloader.css'
import '@ckeditor/ckeditor5-image/theme/imageuploadprogress.css'
import '@ckeditor/ckeditor5-image/theme/textalternativeform.css'
import '@ckeditor/ckeditor5-link/theme/link.css'
import '@ckeditor/ckeditor5-link/theme/linkactions.css'
import '@ckeditor/ckeditor5-link/theme/linkform.css'
import '@ckeditor/ckeditor5-list/theme/todolist.css'
import '@ckeditor/ckeditor5-table/theme/inserttable.css'
import '@ckeditor/ckeditor5-table/theme/table.css'
import '@ckeditor/ckeditor5-table/theme/tableediting.css'
import '@ckeditor/ckeditor5-theme-lark/theme/theme.css'
import '@ckeditor/ckeditor5-widget/theme/widget.css'
import '@ckeditor/ckeditor5-widget/theme/widgetresize.css'

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
