<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="articles"
      :options.sync="options"
      :server-items-length="total"
      :loading="loading"
      class="elevation-1 mx-8"
    ></v-data-table>
  </div>
</template>

<script>
export default {
  name: 'List',
  layout: 'Admin',
  data() {
    return {
      total: 0,
      articles: [],
      loading: true,
      options: {},
      headers: [
        { text: 'Title', value: 'name', align: 'left' },
        { text: 'Desctiption', value: 'desctiption', sortable: false },
        { text: 'Category', value: 'category', sortable: false },
        { text: 'Tags', value: 'tags', sortable: false },
        { text: 'Views', value: 'views' },
        { text: 'Comments', value: 'comments' },
        { text: 'Post Date', value: 'postDate' }
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
