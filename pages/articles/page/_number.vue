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
        <header>
          <nuxt-link
            class="link-title"
            tag="h3"
            :to="{ name: 'article-id', params: { id: article.id } }"
          >
            {{ article.title }}
          </nuxt-link>
        </header>
        <nuxt-link
          tag="p"
          class="article-description mb-1"
          :to="{ name: 'article-id', params: { id: article.id } }"
        >
          {{ article.description }}
        </nuxt-link>
        <section>
          <b-badge
            v-for="tag in article.tags"
            :key="tag.id"
            pill
            :to="{ name: 'search-tag-id', params: { id: tag.id } }"
            :variant="getRamdomTagColor()"
            class="mr-1"
          >
            {{ tag.name }}
          </b-badge>
        </section>
        <section class="artcile-footer mt-1">
          <span>
            <fa-icon :icon="['fas', 'calendar-alt']" />&nbsp;
            <time>
              {{ $moment(article.postDate).format('YYYY-MM-DD HH:mm') }}
            </time>
          </span>
          <span>
            <fa-icon class="text-primary" :icon="['far', 'thumbs-up']" />
            <span>{{ article.likes }}</span>
          </span>
          <span>
            <fa-icon class="text-secondary" :icon="['fas', 'eye']" />
            <span>{{ article.views }}</span>
          </span>
          <span>
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
export default {
  layout: 'AppBlogArticle',
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
    },
    getRamdomTagColor() {
      const colors = [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'dark'
      ]
      return colors[Math.floor(Math.random() * colors.length)]
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

.artcile-footer * {
  vertical-align: middle;
}

.artcile-footer span {
  margin-right: 10px;
}
</style>
