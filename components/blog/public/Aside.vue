<template>
  <div>
    <info />
    <popular class="mt-10" />
    <category class="mt-10" />
    <tag class="mt-10" />
  </div>
</template>

<script>
import Info from '@/components/blog/article-aside/Info'
import Popular from '@/components/blog/article-aside/Popular'
import Category from '@/components/blog/article-aside/Category'
import Tag from '@/components/blog/article-aside/Tag'
export default {
  name: 'Aside',
  components: {
    Popular,
    Category,
    Tag,
    Info
  },
  mounted() {
    this.$store.dispatch('article/getPopularArticles')
    this.$store.dispatch('article/getCategories')
    this.$store.dispatch('article/getTags')
  }
}
</script>
