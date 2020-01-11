<template>
  <!-- eslint-disable vue/no-v-html -->
  <div>
    <section class="search-field mx-auto">
      <v-text-field
        ref="searchInput"
        v-model="keyword"
        outlined
        rounded
        clearable
        dense
        label="Search"
        color="info"
        aria-label="search"
        :error="!searchInputState"
        :error-messages="searchInputState ? '' : 'Require.'"
        @focus="searchInputState = true"
      >
        <template v-slot:append-outer>
          <v-btn rounded depressed color="primary" @click="searchByKeyword()">
            <v-icon>{{ mdiMagnify }}</v-icon>
            search
          </v-btn>
        </template>
      </v-text-field>
    </section>
    <app-sort class="mb-4" :sort.sync="sort" @change="toPage" />
    <search-article
      v-for="article in articles"
      :id="article.id"
      :key="article.id"
      class=" mb-8"
    >
      <template v-slot:title>
        <span v-html="article.title"></span>
      </template>
      <template v-slot:content>
        <section v-html="article.content"></section>
      </template>
      <template v-slot:date>
        {{ $moment(article.postDate).format('YYYY-MM-DD') }}
      </template>
    </search-article>
    <v-pagination v-model="pageNumber" :length="totalPages" @input="toPage" />
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
import { mdiMagnify } from '@mdi/js'
import { required } from 'assets/utils/validation-rules'
import Sort from '@/components/blog/search/Sort'
import Article from '@/components/blog/search/Article'

export default {
  layout: 'Blog',
  watchQuery: ['pageNumber', 'keyword'],
  components: {
    appSort: Sort,
    searchArticle: Article
  },
  data() {
    return {
      sort: null,
      overlay: false,
      articles: null,
      pageNumber: 1,
      totalPages: 0,
      searchInputState: true,
      inputRules: [required],
      mdiMagnify,
      keyword: this.$route.params.keyword
    }
  },
  mounted() {
    this.query(this.$route.params.keyword, 1)
  },
  methods: {
    searchByKeyword() {
      if (required(this.keyword) !== true) {
        this.searchInputState = false
      } else {
        this.query(this.keyword, 1)
      }
    },
    toPage() {
      this.query(this.$route.params.keyword, this.pageNumber)
    },
    async query(keyword, pageNumber) {
      this.overlay = true
      // query by keyword
      const { content, totalPages, pageable } = await this.$axios.$get(
        '/api/article-api/articles/search/keyword',
        {
          params: {
            keyword,
            page: pageNumber,
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

<style scoped lang="scss">
@import '~vuetify/src/styles/styles';

::v-deep mark {
  background: map-get($pink, 'lighten-3');
  font-weight: 500;
  border-radius: 5px;
}

.search-field {
  max-width: 800px;

  &::v-deep {
    .v-input__append-outer {
      margin-top: 2px !important;
      margin-bottom: 2px !important;
    }
  }
}

#sort-text {
  color: map-get($grey, 'darken-3') !important;
}
</style>
