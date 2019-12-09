<template>
  <div>
    <h5>
      <fa-icon class="text-success" :icon="['fas', 'tags']" />
      Categories
    </h5>
    <category-item
      v-for="category in categories"
      :key="category.id"
      :sub-categories="category.subCategories"
      :name="category.name"
      :layer="category.layer"
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
