<template>
  <div>
    <v-chip outlined label>
      <v-icon color="primary" left>{{ mdiFolderOpen }}</v-icon>
      {{ category.name }}
    </v-chip>
    <app-sort class="my-4" :sort.sync="sort" @change="query" />
    <search-article
      v-for="article in articles"
      :id="article.id"
      :key="article.id"
      class=" mb-8"
    >
      <template v-slot:title>
        <span v-text="article.title"></span>
      </template>
      <template v-slot:content>
        <section v-text="article.description"></section>
      </template>
      <template v-slot:date>
        {{ $moment(article.postDate).format('YYYY-MM-DD') }}
      </template>
    </search-article>
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
import Article from '@/components/blog/search/Article'

export default {
  layout: 'Blog',
  components: {
    appSort: Sort,
    searchArticle: Article
  },
  async asyncData({ params, $axios }) {
    const category = await $axios.$get(`/api/article-api/category/${params.id}`)
    return { category }
  },
  data() {
    return {
      sort: null,
      category: null,
      overlay: false,
      articles: [],
      pageNumber: 1,
      totalPages: 0,
      mdiFolderOpen
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    async query() {
      this.overlay = true
      const { content, totalPages, pageable } = await this.$axios.$post(
        `/api/article-api/articles/category/${this.category.id}`,
        {
          pageNumber: this.pageNumber,
          sort: this.sort.field,
          order: this.sort.order
        }
      )
      this.articles = content
      this.totalPages = totalPages
      this.pageNumber = pageable.pageNumber + 1
      this.overlay = false
    }
  }
}
</script>
