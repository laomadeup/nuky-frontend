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
            <h3 class="article-title">{{ article.title }}</h3>
          </header>
          <p class="article-description mb-1">{{ article.description }}</p>
        </nuxt-link>
        <article-info :tags="article.tags" :category="article.category" />
        <section class="artcile-footer mt-1">
          <span title="Post Time">
            <v-icon>mdi-calendar</v-icon>
            <time class="middle">
              {{ $moment(article.postDate).format('YYYY-MM-DD HH:mm') }}
            </time>
          </span>
          <span title="Likes">
            <v-icon class="yellow--text text--darken-2">mdi-star</v-icon>
            <span class="middle">{{ article.likes }}</span>
          </span>
          <span title="Views">
            <v-icon>mdi-cursor-default-click-outline</v-icon>
            <span class="middle">{{ article.views }}</span>
          </span>
          <span title="Comments">
            <v-icon>mdi-comment-multiple</v-icon>
            <span class="middle">{{ article.commentAmount }}</span>
          </span>
        </section>
        <v-divider class="mt-4" />
      </article>
      <b-pagination-nav
        :number-of-pages="totalPages"
        :link-gen="linkGen"
        :value="pageNumber"
        align="center"
      />
    </div>
  </div>
</template>

<script>
import ArticleInfo from '@/components/blog/article/ArticleInfo'

export default {
  layout: 'AppBlogArticle',
  components: {
    ArticleInfo
  },
  async asyncData({ params, store, $axios }) {
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
      pageNumber: 0,
      totalPages: 0,
      articles: []
    }
  },
  methods: {
    linkGen(pageNumber) {
      return {
        name: 'articles-page-number',
        params: { number: pageNumber }
      }
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

    .article-title {
      font-size: 1.25rem;
      color: map-get($grey, darken-2);
    }

    &:hover .article-title {
      color: map-get($blue, darken-1);
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

    &:hover .article-description {
      color: map-get($grey, darken-1);
    }
  }

  .artcile-footer span {
    margin-right: 10px;
  }

  .artcile-footer .middle {
    vertical-align: middle;
  }
}
</style>
