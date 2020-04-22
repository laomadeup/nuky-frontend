<template>
  <v-select
    :prepend-inner-icon="icon ? mdiFolderOpen : ''"
    :items="items"
    :hide-details="hideDetails"
    :outlined="outlined"
    :label="label"
    item-value="id"
    item-text="name"
    :hint="hint"
    :persistent-hint="persistentHint"
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
    hint: { type: String, default: null },
    persistentHint: { type: Boolean, default: false },
    outlined: { type: Boolean, default: false },
    icon: { type: Boolean, default: false },
    value: { type: [Array, Number], default: null },
    label: { type: String, default: 'Category' },
  },
  data() {
    return { mdiFolderOpen }
  },
  computed: {
    items() {
      return this.$store.state.post.categoryList || []
    },
  },
  mounted() {
    this.$store.dispatch('post/getCategories')
  },
  methods: {
    select(value) {
      this.$emit('update:value', value)
    },
  },
}
</script>
