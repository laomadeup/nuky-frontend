<template>
  <v-chip-group
    multiple
    :column="$vuetify.breakpoint.smAndUp"
    class="app-chips"
  >
    <v-chip
      v-for="tag in tags"
      :key="tag.id"
      small
      :to="{ name: 'search-tag-id', params: { id: tag.id } }"
      :color="getRamdomTagColor() + ' darken-2'"
      link
      class="font-weight-medium"
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

<style scoped lang="scss">
.app-chips.theme--light.v-chip-group .v-chip {
  color: white !important;
}

.v-chip.v-size--small {
  height: 18px;
  line-height: 18px;
}
</style>
