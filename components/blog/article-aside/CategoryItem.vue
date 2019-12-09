<template>
  <div>
    <div class="category-item pb-1 pt-1" :style="categoryIndent">
      {{ item.name }} ({{ item.amount }})
    </div>
    <category-item
      v-for="subCategory in item.subCategories"
      :key="subCategory.id"
      :item="subCategory"
      :depth="depth + 1"
    >
    </category-item>
  </div>
</template>

<script>
import CategoryItem from '@/components/blog/article-aside/CategoryItem'

export default {
  name: 'CategoryItem',
  components: { CategoryItem },
  props: {
    item: {
      type: Object,
      default: null
    },
    depth: {
      type: Number,
      default: 0
    }
  },
  computed: {
    categoryIndent() {
      return `padding-left:${this.depth * 20}px`
    }
  }
}
</script>

<style scoped lang="scss">
.category-item {
  line-height: 1.4rem;
}
</style>
