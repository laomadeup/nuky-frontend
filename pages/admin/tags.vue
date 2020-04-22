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
            <new-tag-btn></new-tag-btn>
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
import NewTagBtn from '@/components/admin/public/NewTagBtn'

export default {
  name: 'Tags',
  layout: 'Admin',
  components: { NewTagBtn },
  async asyncData({ $axios }) {
    return { items: await $axios.$get('/api/post-api/admin/tags') }
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
          width: 80,
        },
        { text: 'Name', value: 'name' },
        { text: 'Slug', value: 'slug' },
        { text: 'Count', value: 'count' },
      ],
    }
  },
  methods: {
    async getData() {
      this.items = await this.$axios.$get('/api/post-api/admin/tags')
    },
    edit(id) {
      console.log(`edit:${id}`)
    },
    deleteItem(id) {
      console.log(`delete:${id}`)
    },
  },
  head() {
    return {
      title: 'Tags',
      meta: [
        {
          hid: 'Tags',
          name: 'Tags',
          content: 'Tags',
        },
      ],
    }
  },
}
</script>

<style scoped lang="scss">
.search-input {
  max-width: 300px;
}
</style>
