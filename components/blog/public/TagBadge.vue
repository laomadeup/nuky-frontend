<template>
  <span>
    <v-chip
      v-for="tag in tags"
      :key="tag.id"
      class="ml-1 font-weight-medium"
      x-small
      :to="{ name: 'search-tag-id', params: { id: tag.id } }"
      :color="getRamdomTagColor() + ' darken-1'"
      text-color="white"
      link
    >
      {{ tag.name }}
    </v-chip>
  </span>
</template>

<script>
const tagColors = [
  'pink',
  'purple',
  'indigo',
  'cyan',
  'teal',
  'green',
  'lime',
  'orange',
  'brown'
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
