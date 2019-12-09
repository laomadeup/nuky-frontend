<template>
  <div>
    <div :class="categoryItemClass">{{ name }}</div>
    <category-item
      v-for="subCategory in subCategories"
      :key="subCategory.id"
      :sub-categories="subCategory.subCategories"
      :name="subCategory.name"
      :layer="subCategory.layer"
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
    subCategories: {
      type: Array,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    layer: {
      type: Number,
      default: 1
    }
  },
  computed: {
    categoryItemClass() {
      return `pl-${(this.layer - 1) * 2}`
    }
  }
}
</script>

<style scoped></style>
