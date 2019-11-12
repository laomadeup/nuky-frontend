<template>
  <div>
    <p v-if="articles.length === 0">Articles Null</p>
    <article v-for="(article, index) in articles" :key="index">
      <header>
        <nuxt-link
          class="article-title"
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
    await store.dispatch('pagination/pagedQuery', {
      queryURL: '/api/article-api/articles/page/' + pageNumber,
      contentAction: 'article/setPageContent'
    })
    return {}
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/styuls/colors"

article
  margin-bottom: 30px
  border-bottom: 1px solid $border-color-gray
  padding-bottom: 20px

.article-title
  cursor pointer
  &:hover
    color $title-hover
</style>
