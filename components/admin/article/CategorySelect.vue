<template>
  <v-select
    v-model="chosen"
    :items="this.$store.state.article.categoryList || []"
    hide-details
    label="Category"
    item-value="id"
    item-text="name"
  >
    <template v-slot:item="{ item }">
      <span :class="`pl-${item.layer * 4}`">{{ item.name }}</span>
    </template>
  </v-select>
</template>

<script>
export default {
  name: 'CategorySelect',
  data() {
    return {
      chosen: null
    }
  },
  mounted() {
    this.$store.dispatch('article/getCategories')
  },
  methods: {
    save() {
      console.log(this.editorData)
    }
  }
}
</script>
