<template>
  <div>
    <article-aside />
  </div>
</template>

<script>
import ArticleAside from '@/components/blog/ArticleAside'

export default {
  layout: 'AppBlog',
  components: {
    ArticleAside
  },
  data() {
    return {}
  },
  head() {
    return {
      title: 'About',
      meta: [
        {
          hid: 'About',
          name: 'About',
          content: 'About'
        }
      ]
    }
  }
}
</script>
