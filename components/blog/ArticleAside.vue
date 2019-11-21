<template>
  <div>
    <popular />
    <category class="mt-4" />
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

<style scoped lang="stylus">
@include media-breakpoint-only(xs) {

 }
</style>
