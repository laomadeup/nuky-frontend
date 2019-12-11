<template>
  <section class="mb-1">
    <span class="category mr-3 ">
      <nuxt-link
        class="category-name pl-1 pr-1"
        tag="span"
        :to="{ name: 'search-category-id', params: { id: category.id } }"
        >{{ category.name }}</nuxt-link
      >
    </span>
    <b-badge
      v-for="tag in tags"
      :key="tag.id"
      pill
      :to="{ name: 'search-tag-id', params: { id: tag.id } }"
      :variant="getRamdomTagColor()"
      class="tag mr-1"
    >
      {{ tag.name }}
    </b-badge>
  </section>
</template>

<script>
const tagColors = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'dark'
]

export default {
  name: 'ArticleTags',
  props: {
    tags: {
      type: Array,
      default: null
    },
    category: {
      type: Object,
      default: null
    }
  },
  methods: {
    getRamdomTagColor() {
      return tagColors[Math.floor(Math.random() * tagColors.length)]
    }
  }
}
</script>

<style scoped lang="scss">
.tag {
  font-weight: 600;
}

.category {
  color: #666666;
  border: 1px solid #cccccc;
  border-radius: 5px;

  .category-name {
    cursor: pointer;
    transition: background-color 0.25s;

    &:hover {
      background-color: #aaaaaa;
    }
  }
}
</style>
