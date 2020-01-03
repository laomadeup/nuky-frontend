<template>
  <div>
    <div v-if="articles.length === 0">
      Nothing here...
      <br />
      <nuxt-link :to="{ name: 'index' }">back to home page>></nuxt-link>
    </div>
    <div v-else>
      <article
        v-for="(article, index) in articles"
        :key="index"
        ref="articleBox"
        class="article-page-item mb-4 pb-2"
        :index="index"
      >
        <nuxt-link
          tag="section"
          class="article-body"
          :to="{ name: 'article-id', params: { id: article.id } }"
        >
          <header>
            <h4 class="title grey--text text--darken-4">
              {{ article.title }}
            </h4>
          </header>
          <p class="article-description my-2">{{ article.description }}</p>
        </nuxt-link>
        <article-info :tags="article.tags" :category="article.category" />
        <section class="artcile-footer my-2">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <section class="d-inline-block mr-4" v-on="on">
                <v-icon small>mdi-calendar-text-outline</v-icon>
                <time class="d-inline-flex verticalalign-middle ml-1">
                  {{ $moment(article.postDate).format('YYYY-MM-DD') }}
                </time>
              </section>
            </template>
            <span>post date</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <section class="d-inline-block mr-4" v-on="on">
                <v-icon small>mdi-book-open</v-icon>
                <span class="d-inline-flex verticalalign-middle ml-1">
                  {{ article.views }}
                </span>
              </section>
            </template>
            <span>views</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <section class="d-inline-block mr-4" v-on="on">
                <v-icon small>mdi-comment-multiple</v-icon>
                <span class="d-inline-flex verticalalign-middle ml-1">
                  {{ article.commentAmount }}
                </span>
              </section>
            </template>
            <span>comments</span>
          </v-tooltip>
        </section>
        <v-divider class="mt-4" />
      </article>
      <v-pagination v-model="pageNumber" :length="totalPages" @input="toPage" />
    </div>
  </div>
</template>

<script>
import ArticleInfo from '@/components/blog/article/ArticleInfo'

export default {
  layout: 'BlogAside',
  components: {
    ArticleInfo
  },
  async asyncData({ params, $axios }) {
    // paged query ariticle list
    const pageNumber = params.number ? params.number : 1
    const { content, totalPages, pageable } = await $axios.$get(
      `/api/article-api/articles/page/${pageNumber}`
    )
    for (const item of content) {
      item.showMore = false
    }
    return {
      articles: content,
      totalPages,
      pageNumber: pageable.pageNumber + 1
    }
  },
  data() {
    return {
      pageNumber: 1,
      totalPages: 0,
      articles: []
    }
  },
  methods: {
    toPage() {
      this.$router.push({
        name: 'articles-page-number',
        params: { number: this.pageNumber }
      })
    }
  },
  head() {
    return {
      title: this.pageNumber === 1 ? 'Home' : 'Articles',
      meta: [
        {
          hid: 'Articles',
          name: 'Articles',
          content: 'Articles'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@import '~vuetify/src/styles/styles';

.article-page-item {
  .article-body {
    cursor: pointer;

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

    &:hover {
      .article-description {
        color: map-get($grey, darken-1);
      }

      .title {
        color: map-get($blue, lighten-1) !important;
        text-decoration: underline !important;
      }
    }
  }

  .artcile-footer {
    font-size: 0.85rem;

    span {
      margin-right: 10px;
    }
  }
}
</style>
