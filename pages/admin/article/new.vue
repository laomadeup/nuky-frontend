<template>
  <div>
    <article-editor :article.sync="article"></article-editor>
  </div>
</template>

<script>
import ArticleEditor from '@/components/admin/article/ArticleEditor'

export default {
  name: 'New',
  layout: 'Admin',
  components: {
    ArticleEditor
  },
  data() {
    return {
      article: {
        content: null,
        title: null,
        excerpt: null,
        categories: null,
        tags: null
      }
    }
  },
  methods: {
    save() {
      console.log(this.article)
    }
  },
  head() {
    return {
      title: 'Post New Article',
      meta: [
        {
          hid: 'Post New Article',
          name: 'Post New Article',
          content: 'Post New Article'
        }
      ]
    }
  }
}
</script>
