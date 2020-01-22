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
    <v-data-table
      :headers="headers"
      :items="posts"
      :options.sync="options"
      :server-items-length="total"
      :loading="loading"
      show-select
    >
      <template v-slot:item.action="{ item }">
        <v-icon
          small
          class="mr-2"
          title="edit"
          @click="edit(item.id)"
          v-text="mdiPencil"
        />
        <v-icon
          small
          title="delete"
          @click="deleteItem(item.id)"
          v-text="mdiDelete"
        />
      </template> </v-data-table
  ></v-card>
</template>

<script>
import { mdiDelete, mdiPencil, mdiMagnify } from '@mdi/js'

export default {
  name: 'Category',
  layout: 'Admin',
  data() {
    return {
      mdiPencil,
      mdiDelete,
      mdiMagnify,
      menu: false,
      search: { text: null },
      total: 0,
      posts: [],
      loading: true,
      options: {},
      headers: [
        {
          text: 'Actions',
          value: 'action',
          sortable: false,
          width: 80
        },
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'description' },
        { text: 'Slug', value: 'slug' },
        { text: 'Count', value: 'count' }
      ]
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
      this.loading = true
      const { content, totalElements } = await this.$axios.$get(
        '/api/post-api/admin/categories',
        {
          params: this.options
        }
      )
      this.posts = content
      this.total = totalElements
      this.loading = false
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
