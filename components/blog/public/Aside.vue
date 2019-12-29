<template>
  <div>
    <intro />
    <popular class="mt-10" />
    <category class="mt-10" />
    <tag class="mt-10" />
  </div>
</template>

<script>
import Intro from '@/components/blog/article-aside/Intro'
import Popular from '@/components/blog/article-aside/Popular'
import Category from '@/components/blog/article-aside/Category'
import Tag from '@/components/blog/article-aside/Tag'
export default {
  name: 'Aside',
  components: {
    Popular,
    Category,
    Tag,
    Intro
  },
  mounted() {
    this.$store.dispatch('article/getPopularArticles')
    this.$store.dispatch('article/getCategories')
    this.$store.dispatch('article/getTags')
  }
}
</script>
