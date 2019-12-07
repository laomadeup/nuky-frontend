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
    Prism.highlightAll()
  }
}
</script>

<style scoped lang="scss">
.ck-content::v-deep pre {
  font-size: 0.85rem;
}
</style>
