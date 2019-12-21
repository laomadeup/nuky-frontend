<template>
  <div>
    <h3>
      <v-icon class="verticalalign-text-bottom" color="green"
        >mdi-folder-multiple</v-icon
      >
      Categories
    </h3>
    <v-divider class="my-2" />
    <div class="p-2">
      <category-item
        v-for="category in this.$store.state.article.categories"
        :key="category.id"
        :item="category"
        :depth="0"
      >
      </category-item>
    </div>
    <v-divider class="my-2" />
  </div>
</template>

<script>
import CategoryItem from '@/components/blog/article-aside/CategoryItem'
export default {
  name: 'Category',
  components: { CategoryItem },
  data() {
    return {}
  }
}
</script>
