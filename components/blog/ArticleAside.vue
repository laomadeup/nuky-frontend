<template>
  <div>
    <popular />
    <category class="mt-4" />
    <tag class="mt-4" />
  </div>
</template>

<script>
import Popular from '@/components/blog/article-aside/Popular'
import Category from '@/components/blog/article-aside/Category'
import Tag from '@/components/blog/article-aside/Tag'
export default {
  name: 'ArticleAside',
  components: {
    Popular,
    Category,
    Tag
  },
  mounted() {
    this.$store.dispatch('article/getPopularArticles')
    this.$store.dispatch('article/getCategories')
    this.$store.dispatch('article/getTags')
  }
}
</script>

<style scoped>
::v-deep .content-area {
  border-bottom: 1px solid #dee2e6;
  border-top: 1px solid #dee2e6;
}
</style>
