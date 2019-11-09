<template>
  <b-container>
    <b-row>
      <b-col :lg="12" :xl="8" class="divider">
        <p v-if="articles.length === 0">Articles Null</p>
        <article v-for="(article, index) in articles" :key="index">
          <header>
            <h4>{{ article.title }}</h4>
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
      </b-col>
      <b-col :lg="12" :xl="4">
        <article-aside />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ArticleAside from '@/components/blog/ArticleAside'
import Pagination from '@/components/blog/Pagination'

export default {
  layout: 'blog',
  components: {
    articleAside: ArticleAside,
    articlePage: Pagination
  },
  data() {
    return { articles: this.$store.state.article.pageContent }
  },
  async asyncData({ $axios, params, store }) {
    const pageNumber = params.number ? params.number : 1
    const data = await $axios.$get(
      '/api/article-api/articles/page/' + pageNumber
    )
    // update page info
    store.dispatch('article/setpageContent', data)
    return {}
  }
}
</script>

<style scoped lang="stylus">
border-color-gray = #cccccc

.divider
  border-right 1px solid border-color-gray

article
  margin-bottom: 30px
  border-bottom: 1px solid border-color-gray
  padding-bottom: 20px

@media (max-width: 1200px)
  .divider
    border-right none
    border-bottom 1px solid border-color-gray
    margin-bottom 20px
</style>
