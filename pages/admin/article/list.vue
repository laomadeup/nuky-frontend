<template>
  <div>
    <v-card class="elevation-1 mx-8 my-8">
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          :append-icon="mdiMagnify"
          label="Search"
          single-line
          hide-details
          style="max-width: 300px;"
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="articles"
        :options.sync="options"
        :server-items-length="total"
        :loading="loading"
      >
        <template v-slot:header.views>
          <v-icon small title="views" v-text="mdiChartBar" />
        </template>
        <template v-slot:header.commentAmount>
          <v-icon small title="comments" v-text="mdiMessageReply" />
        </template>

        <template v-slot:item.tags="{ item }">
          <v-chip
            v-for="(tag, index) in item.tags"
            :key="index"
            class="mr-2"
            x-small
          >
            {{ tag.name }}
          </v-chip>
        </template>
        <template v-slot:item.postDate="{ item }">
          <span :title="$moment(item.postDate).format('YYYY-MM-DD HH:mm:ss')">
            {{ $moment(item.postDate).format('YYYY-MM-DD') }}
          </span>
        </template>
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
  </div>
</template>

<script>
import {
  mdiDelete,
  mdiPencil,
  mdiChartBar,
  mdiMessageReply,
  mdiMagnify
} from '@mdi/js'

export default {
  name: 'List',
  layout: 'Admin',
  data() {
    return {
      mdiPencil,
      mdiDelete,
      mdiChartBar,
      mdiMessageReply,
      mdiMagnify,
      total: 0,
      articles: [],
      loading: true,
      options: {},
      headers: [
        {
          text: 'Actions',
          value: 'action',
          sortable: false,
          width: 80
        },
        { text: 'Title', value: 'title' },
        {
          text: 'Category',
          value: 'category.name',
          sortable: false,
          width: 110
        },
        { text: 'Tags', value: 'tags', sortable: false, width: '20%' },
        { text: 'Views', value: 'views', width: 90 },
        { text: 'Comments', value: 'commentAmount', width: 120 },
        { text: 'Post Date', value: 'postDate', align: 'center', width: 120 }
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
        '/api/article-api/admin/articles',
        {
          params: this.options
        }
      )
      this.articles = content
      this.total = totalElements
      this.loading = false
    },
    getDesserts() {
      return []
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
      title: 'Article List',
      meta: [
        {
          hid: 'Article List',
          name: 'Article List',
          content: 'Article List'
        }
      ]
    }
  }
}
</script>
