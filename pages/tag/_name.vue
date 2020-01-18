<template>
  <div>
    <v-chip color="primary">
      <v-icon left v-text="mdiTag" />
      {{ tag.name }}
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
        <section v-text="article.excerpt"></section>
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
import { mdiTag } from '@mdi/js'
import Sort from '@/components/blog/search/Sort'
import Article from '@/components/blog/search/Article'

export default {
  layout: 'Blog',
  components: {
    appSort: Sort,
    searchArticle: Article
  },
  async asyncData({ params, $axios }) {
    const tag = await $axios.$get(`/api/article-api/tag/${params.name}`)
    return { tag }
  },
  data() {
    return {
      sort: null,
      tag: null,
      overlay: false,
      articles: [],
      pageNumber: 1,
      totalPages: 0,
      mdiTag
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    async query() {
      this.overlay = true
      const { content, totalPages, pageable } = await this.$axios.$get(
        `/api/article-api/articles/tag/${this.tag.name}`,
        {
          params: {
            page: this.pageNumber,
            sort: this.sort.field,
            order: this.sort.order
          }
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
