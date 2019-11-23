<template>
  <div class="markdown-body" v-html="content"></div>
</template>

<script>
import 'mavon-editor/dist/markdown/github-markdown.min.css'

export default {
  name: 'ArticleContent',
  props: {
    content: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped></style>
