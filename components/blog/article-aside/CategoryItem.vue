<template>
  <div>
    <div :class="'category-item pb-1 pt-1 pl-' + (depth * 3 + 1)">
      <nuxt-link
        class="category-name pb-1 ml-1"
        tag="span"
        :to="{ name: 'search-category-id', params: { id: item.id } }"
        >{{ item.name }}</nuxt-link
      >
      <span>({{ item.amount }})</span>
    </div>
    <div class="pl-1">
      <category-item
        v-for="subCategory in item.subCategories"
        :key="subCategory.id"
        :item="subCategory"
        :depth="depth + 1"
      >
      </category-item>
    </div>
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
  }
}
</script>

<style scoped lang="scss">
@import '~vuetify/src/styles/styles';

.category-item {
  line-height: 1.4rem;

  .category-name {
    cursor: pointer;
    transition: border-bottom 0.25s;
    border-bottom: 2px solid map-get($grey, lighten-5);

    &:hover {
      border-color: map-get($grey, base);
    }
  }
}
</style>
