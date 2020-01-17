<template>
  <span>
    <v-chip
      v-for="(tag, index) in tags"
      :key="index"
      x-small
      :to="{ name: 'tag-name', params: { name: tag.name } }"
      link
      class="mr-1"
    >
      {{ tag.name }}
    </v-chip>
  </span>
</template>

<script>
export default {
  name: 'TagBadge',
  props: {
    tags: {
      type: Array,
      default: null
    }
  }
}
</script>
