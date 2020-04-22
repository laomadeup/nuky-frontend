<template>
  <div>
    <v-chip outlined label>
      <v-icon color="primary" left v-text="mdiFolderOpen" />
      {{ category.name }}
    </v-chip>
    <app-sort class="my-4" :sort.sync="sort" @change="query" />
    <search-post
      v-for="post in posts"
      :id="post.id"
      :key="post.id"
      class="mb-8"
    >
      <template v-slot:title>
        <span v-text="post.title"></span>
      </template>
      <template v-slot:content>
        <section v-text="post.excerpt"></section>
      </template>
      <template v-slot:date>
        {{ $moment(post.publishDate).format('YYYY-MM-DD') }}
      </template>
    </search-post>
    <v-pagination v-model="pageNumber" :length="totalPages" @input="query" />
    <v-overlay :value="overlay">
      <v-progress-circular
        color="primary"
        indeterminate
        size="48"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { mdiFolderOpen } from '@mdi/js'
import Sort from '@/components/blog/search/Sort'
import Post from '@/components/blog/search/Post'

export default {
  layout: 'Blog',
  components: {
    appSort: Sort,
    searchPost: Post,
  },
  async asyncData({ params, $axios }) {
    const category = await $axios.$get(`/api/post-api/category/${params.name}`)
    return { category }
  },
  data() {
    return {
      sort: null,
      category: null,
      overlay: false,
      posts: [],
      pageNumber: 1,
      totalPages: 0,
      mdiFolderOpen,
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    async query() {
      this.overlay = true
      const { content, totalPages, pageNumber } = await this.$axios.$get(
        `/api/post-api/posts/category/${this.category.name}`,
        {
          params: {
            page: this.pageNumber,
            sort: this.sort.field,
            order: this.sort.order,
          },
        }
      )
      this.posts = content
      this.totalPages = totalPages
      this.pageNumber = pageNumber
      this.overlay = false
    },
  },
}
</script>
