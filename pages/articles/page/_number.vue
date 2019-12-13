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
          class="article-description"
          :to="{ name: 'article-id', params: { id: article.id } }"
        >
          <header>
            <h3 class="link-title">{{ article.title }}</h3>
          </header>
          <p class="mb-1">{{ article.description }}</p>
        </nuxt-link>
        <article-info :tags="article.tags" :category="article.category" />
        <section class="artcile-footer mt-1">
          <span title="Post Time">
            <fa-icon :icon="['fas', 'calendar-alt']" />&nbsp;
            <time>
              {{ $moment(article.postDate).format('YYYY-MM-DD HH:mm') }}
            </time>
          </span>
          <span title="Likes">
            <fa-icon class="text-warning" :icon="['fas', 'star']" />
            <span>{{ article.likes }}</span>
          </span>
          <span title="Views">
            <fa-icon class="text-secondary" :icon="['fas', 'book-open']" />
            <span>{{ article.views }}</span>
          </span>
          <span title="Comments">
            <fa-icon class="text-secondary" :icon="['fas', 'comment-dots']" />
            <span>{{ article.commentAmount }}</span>
          </span>
        </section>
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
  }
}
</script>

<style scoped lang="scss">
@import '~assets/style/common/public';

.article-page-item {
  border-bottom: 1px solid gray('400');
  cursor: pointer;

  .article-description {
    .link-title {
      font-size: 1.25rem;
      color: gray('800');
    }

    &:hover .link-title {
      color: $blue;
    }

    p {
      height: 3rem;
      line-height: 1.5rem;
      overflow: hidden;
      color: gray('700');
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  .artcile-footer * {
    vertical-align: middle;
  }

  .artcile-footer span {
    margin-right: 10px;
  }
}
</style>
