<template>
  <span>
    <v-chip
      v-for="tag in tags"
      :key="tag.id"
      small
      :to="{ name: 'search-tag-id', params: { id: tag.id } }"
      :color="getRamdomTagColor() + ' darken-2'"
      link
      dark
      class="app-chip ml-1 font-weight-medium"
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
