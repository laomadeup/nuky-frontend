<template>
  <v-select
    :prepend-icon="mdiFolderOpen"
    :items="this.$store.state.article.categoryList || []"
    hide-details
    label="Category"
    item-value="id"
    item-text="name"
    clearable
    @input="select"
  >
    <template v-slot:item="{ item }">
      <span :class="`pl-${item.layer * 4}`">{{ item.name }}</span>
    </template>
  </v-select>
</template>

<script>
import { mdiFolderOpen } from '@mdi/js'

export default {
  name: 'CategorySelect',
  props: {
    chosen: { type: Number, default: null }
  },
  data() {
    return { mdiFolderOpen }
  },
  mounted() {
    this.$store.dispatch('article/getCategories')
  },
  methods: {
    select(value) {
      this.$emit('update:chosen', value)
    }
  }
}
</script>
