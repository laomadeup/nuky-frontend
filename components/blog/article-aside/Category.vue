<template>
  <div>
    <h5>
      <fa-icon class="text-success" :icon="['fas', 'folder-open']" />
      Categories
    </h5>
    <div class="p-2 content-area">
      <category-item
        v-for="category in this.$store.state.article.categories"
        :key="category.id"
        :item="category"
        :depth="0"
      >
      </category-item>
    </div>
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
