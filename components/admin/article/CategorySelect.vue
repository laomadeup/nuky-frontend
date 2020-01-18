<template>
  <v-select
    :prepend-inner-icon="mdiFolderOpen"
    :items="this.$store.state.article.categoryList || []"
    :hide-details="hideDetails"
    :outlined="outlined"
    label="Category"
    item-value="id"
    item-text="name"
    :multiple="multiple"
    clearable
    :dense="dense"
    :value="value"
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
    multiple: { type: Boolean, default: false },
    hideDetails: { type: Boolean, default: false },
    outlined: { type: Boolean, default: false },
    value: { type: [Array, Number], default: null }
  },
  data() {
    return { mdiFolderOpen }
  },
  mounted() {
    this.$store.dispatch('article/getCategories')
  },
  methods: {
    select(value) {
      this.$emit('update:value', value)
    }
  }
}
</script>
