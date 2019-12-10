<template>
  <section class="mb-1">
    <span class="mr-3" style="color: #666666"
      >Category :
      <nuxt-link
        class="category-name"
        tag="span"
        :to="{ name: 'search-category-id', params: { id: 1 } }"
        >Development</nuxt-link
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

.category-name {
  cursor: pointer;
  transition: border-bottom 0.25s;
  border-bottom: 2px solid #ffffff;

  &:hover {
    border-color: #aaaaaa;
  }
}
</style>
