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
            <time>{{ new Date(article.postDate).toLocaleString() }}</time>
          </p>
        </header>
        <p>
          {{ article.content }}
        </p>
      </article>
      <article-page />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/blog/Pagination'

export default {
  layout: 'AppBlogArticle',
  components: {
    articlePage: Pagination
  },
  computed: {
    articles() {
      return this.$store.state.article.pageContent
    }
  },
  async asyncData({ params, store }) {
    // paged query ariticle list
    const pageNumber = params.number ? params.number : 1
    await store.dispatch('article/pagedQueryArticles', pageNumber)
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/style/common/colors"
.article-page-item
  margin-bottom 30px
  border-bottom 1px solid $border-color-gray
  padding-bottom 20px

.link-title
  cursor pointer
  &:hover
    color $title-hover
</style>
