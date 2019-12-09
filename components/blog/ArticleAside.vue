<template>
  <div>
    <popular />
    <category class="mt-5" />
  </div>
</template>

<script>
import Popular from '@/components/blog/article-aside/Popular'
import Category from '@/components/blog/article-aside/Category'
export default {
  name: 'ArticleAside',
  components: {
    Popular,
    Category
  }
}
</script>

<style scoped></style>
