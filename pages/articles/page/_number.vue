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
        class="article-page-item mb-4 pb-3"
        :index="index"
      >
        <header>
          <nuxt-link
            class="link-title"
            tag="h3"
            :to="{ name: 'article-id', params: { id: article.id } }"
          >
            {{ article.title }}
          </nuxt-link>
        </header>
        <p class="article-description">
          {{ article.description }}
        </p>
        <footer class="mt-2">
          <span>
            <fa-icon :icon="['fas', 'calendar-alt']" />&nbsp;
            <time>
              {{ $moment(article.postDate).format('YYYY-MM-DD HH:mm') }}
            </time>
          </span>
          <span>
            <fa-icon class="text-info" :icon="['fas', 'eye']" />
            <span>{{ article.views }}</span>
          </span>
          <span>
            <fa-icon class="text-primary" :icon="['far', 'thumbs-up']" />
            <span>{{ article.likes }}</span>
          </span>
          <span>
            <fa-icon class="text-warning" :icon="['fas', 'comment-dots']" />
            <span>{{ article.commentAmount }}</span>
          </span>
        </footer>
      </article>
      <b-pagination-nav
        :number-of-pages="totalPages"
        :link-gen="linkGen"
        :value="pageNumber"
        align="center"
      ></b-pagination-nav>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'AppBlogArticle',
  data() {
    return {
      pageNumber: 0,
      totalPages: 0,
      articles: []
    }
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
}

p.article-description {
  height: 3rem;
  line-height: 1.5rem;
  overflow: hidden;
  color: gray('700');
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  &:hover {
    cursor: pointer;
  }
}

.link-title {
  font-size: 1.25rem;
  @include link(gray('800'));
}

footer * {
  vertical-align: middle;
}

footer span {
  margin-right: 10px;
}
</style>
