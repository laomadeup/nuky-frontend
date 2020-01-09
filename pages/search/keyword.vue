<template>
  <div class="content mx-auto">
    <div class="search-field mx-auto">
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
    </div>
    <div v-for="article in articles" :key="article.id">
      <!--  eslint-disable-next-line -->
      <nuxt-link :to="{ name: 'article-id', params: { id: article.id } }"
        v-html="article.title"
      ></nuxt-link>
      <!--  eslint-disable-next-line -->
      <p v-html="article.content"></p>
    </div>
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

export default {
  layout: 'Blog',
  watchQuery: ['pageNumber', 'keyword'],
  data() {
    return {
      overlay: false,
      articles: null,
      pageNumber: 0,
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
      console.log('search by keyword : ' + keyword)
      console.log('pageNumber : ' + pageNumber)
      const { content, totalPages, pageable } = await this.$axios.$post(
        '/api/article-api/articles/search/keyword',
        {
          keyword,
          pageNumber
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
.content {
  max-width: 1000px;
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
</style>
