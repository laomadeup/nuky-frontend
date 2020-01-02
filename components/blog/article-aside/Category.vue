<template>
  <div>
    <h3>Categories</h3>
    <v-skeleton-loader
      :loading="!this.$store.state.article.categories"
      type="list-item-three-line,list-item-three-line,list-item-three-line"
    >
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
    </v-skeleton-loader>
  </div>
</template>

<script>
import CategoryItem from '@/components/blog/article-aside/CategoryItem'
export default {
  components: { CategoryItem }
}
</script>
