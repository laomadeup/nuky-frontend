<template>
  <span>
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
  </span>
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
  name: 'TagBadge',
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
</style>
