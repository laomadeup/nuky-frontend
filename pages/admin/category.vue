<template>
  <v-card class="elevation-1 mx-8 my-8">
    <v-card-title>
      <v-container fluid>
        <v-row justify="start">
          <v-col cols="12" sm="6" md="3" xl="2">
            <v-text-field
              v-model="search.text"
              :prepend-inner-icon="mdiMagnify"
              label="Search"
              hide-details
              clearable
            />
          </v-col>
          <v-col cols="12" md="3" lg="2" xl="1" align-self="end">
            <v-btn small @click="query">Search</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-title>
    <v-divider />
    <v-treeview
      :open="open"
      :items="items"
      item-key="name"
      selectable
      selected-color="primary"
      hoverable
      open-all
      selection-type="independent"
    >
      <template v-slot:prepend="{ item, open }">
        <v-icon v-if="!item.file">
          {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
        </v-icon>
        <v-icon v-else>
          {{ files[item.file] }}
        </v-icon>
      </template>
    </v-treeview>
  </v-card>
</template>

<script>
import { mdiMagnify } from '@mdi/js'

export default {
  name: 'Category',
  layout: 'Admin',
  async asyncData({ $axios }) {
    return { items: await $axios.$get('/api/post-api/admin/categories') }
  },
  data() {
    return {
      mdiMagnify,
      items: [],
      search: { text: null }
    }
  },
  watch: {
    options: {
      handler() {
        this.getData()
      },
      deep: true
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      this.items = await this.$axios.$get('/api/post-api/admin/categories')
    },
    edit(id) {
      console.log(`edit:${id}`)
    },
    deleteItem(id) {
      console.log(`delete:${id}`)
    }
  },
  head() {
    return {
      title: 'Category',
      meta: [
        {
          hid: 'Category',
          name: 'Category',
          content: 'Category'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.search-input {
  max-width: 300px;
}
</style>
