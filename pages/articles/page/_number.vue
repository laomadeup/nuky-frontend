<template>
  <b-container>
    <b-row>
      <b-col :lg="12" :xl="8" class="divider">
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
      </b-col>
      <b-col :lg="12" :xl="4">
        <article-aside />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ArticleAside from '@/components/blog/ArticleAside'

export default {
  layout: 'blog',
  comments: {
    articleAside: ArticleAside
  },
  data() {
    return { articles: [] }
  }
}
</script>

<style scoped lang="stylus">
.divider
  border-right 1px solid #cccccc

@media (max-width: 1200px)
  .divider
    border-right none
    border-bottom 1px solid #cccccc
    margin-bottom 20px
</style>
