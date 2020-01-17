<template>
  <v-select
    :prepend-inner-icon="mdiFolderOpen"
    :items="this.$store.state.article.categoryList || []"
    hide-details
    :outlined="outlined"
    label="Category"
    item-value="id"
    item-text="name"
    clearable
    :dense="dense"
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
    dense: { type: Boolean, default: false },
    outlined: { type: Boolean, default: false },
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
