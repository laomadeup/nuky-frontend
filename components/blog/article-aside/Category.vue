<template>
  <div>
    <h5>
      <fa-icon class="text-success" :icon="['fas', 'tags']" />
      Categories
    </h5>
    <category-item
      v-for="category in categories"
      :key="category.id"
      :item="category"
      :depth="0"
    >
    </category-item>
  </div>
</template>

<script>
import CategoryItem from '@/components/blog/article-aside/CategoryItem'
export default {
  name: 'Category',
  components: { CategoryItem },
  data() {
    return { categories: this.$store.state.article.categories }
  }
}
</script>

<style scoped></style>
