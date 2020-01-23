<template>
  <v-card class="elevation-1 mx-8 my-8">
    <v-card-title>
      <v-container class="py-0" fluid>
        <v-row justify="space-between" class="py-0">
          <v-col cols="3" class="py-0">
            <v-text-field
              v-model="search"
              :prepend-inner-icon="mdiMagnify"
              label="Search"
              hide-details
              clearable
            />
          </v-col>
          <v-col class="py-0" cols="auto" align-self="end">
            <new-category-btn></new-category-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-title>
    <v-divider />
    <v-data-table
      disable-pagination
      hide-default-footer
      :search="search"
      :headers="headers"
      :items="items"
      :loading="loading"
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
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mdiDelete, mdiMagnify, mdiPencil } from '@mdi/js'
import NewCategoryBtn from '@/components/admin/public/NewCategoryBtn'

export default {
  name: 'Category',
  layout: 'Admin',
  components: { NewCategoryBtn },
  async asyncData({ $axios }) {
    return { items: await $axios.$get('/api/post-api/admin/categories') }
  },
  data() {
    return {
      mdiPencil,
      mdiDelete,
      mdiMagnify,
      items: [],
      loading: false,
      search: null,
      headers: [
        {
          text: 'Actions',
          value: 'action',
          sortable: false,
          width: 80
        },
        { text: 'Name', value: 'name' },
        { text: 'Parent', value: 'parent.name' },
        { text: 'Slug', value: 'slug' },
        { text: 'Count', value: 'count' }
      ]
    }
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
