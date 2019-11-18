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
        class="article-page-item"
      >
        <header>
          <nuxt-link
            class="link-title"
            tag="h4"
            :to="{ name: 'article-id', params: { id: article.id } }"
          >
            {{ article.title }}
          </nuxt-link>
          <p>
            <fa-icon :icon="['fas', 'calendar-alt']" />&nbsp;
            <time>
              {{ $moment(article.postDate).format('YYYY-MM-DD HH:mm') }}
            </time>
          </p>
        </header>
        <div class="article-body">
          {{ article.content }}
        </div>
        <div class="article-show-all link-title">
          <nuxt-link
            tag="span"
            :to="{ name: 'article-id', params: { id: article.id } }"
          >
            --- Show more ---
          </nuxt-link>
        </div>
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

<style scoped lang="stylus">
@import "~assets/style/common/colors"
.article-page-item
  margin-bottom 30px
  border-bottom 1px solid $border-color-gray
  padding-bottom 20px

.article-body
  max-height 12.2rem
  overflow hidden

.article-show-all
  text-align center
  height 2rem
  line-height 2rem
  color $title

.link-title
  cursor pointer
  &:hover
    color $title-hover
</style>
