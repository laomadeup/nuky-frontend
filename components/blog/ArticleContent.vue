<template>
  <div class="article-content" v-text="content"></div>
</template>

<script>
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

<style scoped lang="scss">
.article-content {
  transition: all 2s;
  overflow: auto !important;
  padding: 5px;

  ::v-deep h1,
  ::v-deep h2,
  ::v-deep h3,
  ::v-deep h4 {
    margin: 10px 0 20px !important;
  }

  ::v-deep blockquote {
    border-left: 0.25em solid #dfe2e5;
    color: #6a737d;
    padding-left: 1em;
    margin: 20px 0 !important;
  }

  ::v-deep code {
    padding: 0 4px !important;
    margin: 0 5px !important;
  }

  ::v-deep pre code {
    padding: 8px !important;
    margin: 0 5px !important;
  }

  ::v-deep code:before,
  ::v-deep code:after {
    content: none !important;
    letter-spacing: initial !important;
  }

  ::v-deep p {
    margin-top: 16px !important;
    margin-bottom: 16px !important;
    min-height: 1rem;
  }
}
</style>
