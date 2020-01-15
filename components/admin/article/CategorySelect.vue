<template>
  <v-select
    :items="this.$store.state.article.categoryList || []"
    hide-details
    label="Category"
    item-value="id"
    item-text="name"
    @input="select"
  >
    <template v-slot:item="{ item }">
      <span :class="`pl-${item.layer * 4}`">{{ item.name }}</span>
    </template>
  </v-select>
</template>

<script>
export default {
  name: 'CategorySelect',
  props: {
    chosen: { type: Number, default: null }
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
