<template>
  <section class="mb-1">
    <span class="category mr-3">
      <fa-icon class="text-secondary" :icon="['fas', 'folder-open']" />
      <nuxt-link
        class="category-name ml-1 mr-1"
        tag="span"
        :to="{ name: 'search-category-id', params: { id: category.id } }"
        >{{ category.name }}</nuxt-link
      >
    </span>
    <tag-badge :tags="tags" />
  </section>
</template>

<script>
import TagBadge from '@/components/blog/public/TagBadge'

export default {
  name: 'ArticleTags',
  components: { TagBadge },
  props: {
    tags: {
      type: Array,
      default: null
    },
    category: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped lang="scss">
.category {
  color: #666666;

  .category-name {
    cursor: pointer;
    transition: border-bottom 0.25s;
    border-bottom: 2px solid #ffffff;

    &:hover {
      border-color: #aaaaaa;
    }
  }
}
</style>
