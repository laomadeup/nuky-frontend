<template>
  <v-chip-group dark multiple column class="font-weight-medium">
    <v-chip
      v-for="tag in tags"
      :key="tag.id"
      x-small
      :to="{ name: 'search-tag-id', params: { id: tag.id } }"
      :color="getRamdomTagColor() + ' darken-2'"
      link
    >
      {{ tag.name }}
    </v-chip>
  </v-chip-group>
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
