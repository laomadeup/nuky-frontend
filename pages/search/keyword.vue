<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="content mx-auto">
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
    <section class="sort mb-4">
      <v-btn
        id="sort-text"
        x-small
        text
        disabled
        color="grey--text text--darken-4"
        >SORT BY :
      </v-btn>
      <v-btn-toggle v-model="sortBy" mandatory>
        <v-btn x-small>
          POST DATE
          <v-icon right small>{{ mdiSortAscending }}</v-icon>
        </v-btn>
        <v-btn x-small>
          POST DATE
          <v-icon right small>{{ mdiSortDescending }}</v-icon>
        </v-btn>
      </v-btn-toggle>
    </section>
    <section
      v-for="article in articles"
      :key="article.id"
      class=" article-body mb-8"
    >
      <nuxt-link
        tag="h4"
        class="title grey--text text--darken-4"
        :to="{ name: 'article-id', params: { id: article.id } }"
        v-html="article.title"
      >
      </nuxt-link>
      <p class="article-description my-2" v-html="article.content"></p>
      <section class="artcile-footer my-2">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <section class="d-inline-block mr-4" v-on="on">
              <v-icon small>{{ mdiCalendarTextOutline }}</v-icon>
              <time class="verticalalign-middle">
                {{ $moment(article.postDate).format('YYYY-MM-DD') }}
              </time>
            </section>
          </template>
          <span>post date</span>
        </v-tooltip>
      </section>
    </section>
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
import {
  mdiCalendarTextOutline,
  mdiMagnify,
  mdiSort,
  mdiSortAscending,
  mdiSortDescending
} from '@mdi/js'
import { required } from 'assets/utils/validation-rules'

export default {
  layout: 'Blog',
  watchQuery: ['pageNumber', 'keyword'],
  data() {
    return {
      sortBy: 0,
      overlay: false,
      mdiCalendarTextOutline,
      mdiSortAscending,
      mdiSortDescending,
      mdiSort,
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
@import '~vuetify/src/styles/styles';

.content {
  max-width: 1000px;
}

.article-body {
  .title {
    cursor: pointer;
    display: inline-block;

    &:hover {
      color: map-get($blue, darken-2) !important;
      text-decoration: underline !important;
    }
  }

  .article-description {
    height: 3rem;
    line-height: 1.5rem;
    overflow: hidden;
    color: map-get($grey, darken-3);
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .artcile-footer {
    font-size: 0.85rem;
  }
}

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
